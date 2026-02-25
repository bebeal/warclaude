#!/bin/bash
# Syncs AWS resources (ACM cert validation + CloudFront) to Cloudflare DNS

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

# Load .env if present
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Validate required vars
for var in CLOUDFLARE_API_TOKEN DOMAIN CERT_ARN; do
  if [ -z "${!var}" ]; then
    echo -e "${RED}Error: $var not set${NC}"
    exit 1
  fi
done

CF_API="https://api.cloudflare.com/client/v4"
CF_AUTH="Authorization: Bearer $CLOUDFLARE_API_TOKEN"
ERRORS=0

# Get Cloudflare zone ID
ZONE_ID=$(curl -s "$CF_API/zones?name=$DOMAIN" -H "$CF_AUTH" | jq -r '.result[0].id')
if [ "$ZONE_ID" = "null" ] || [ -z "$ZONE_ID" ]; then
  echo -e "${RED}Error: Could not find zone for $DOMAIN${NC}"
  exit 1
fi
echo "Zone: $DOMAIN ($ZONE_ID)"

# Upsert DNS record
upsert_record() {
  local name="$1" type="$2" content="$3" comment="$4" proxied="${5:-false}"

  if [ -z "$content" ] || [ "$content" = "null" ]; then
    echo -e "  ${YELLOW}$name: skipped (no content)${NC}"
    return 1
  fi

  # Show mapping
  echo -e "  $name -> $content"
  echo -e "    ${YELLOW}($comment)${NC}"

  local existing=$(curl -s "$CF_API/zones/$ZONE_ID/dns_records?name=$name&type=$type" -H "$CF_AUTH")
  local record_id=$(echo "$existing" | jq -r '.result[0].id // empty')
  local current_content=$(echo "$existing" | jq -r '.result[0].content // empty')
  local current_comment=$(echo "$existing" | jq -r '.result[0].comment // empty')

  local data=$(jq -n \
    --arg type "$type" --arg name "$name" --arg content "$content" \
    --arg comment "$comment" --argjson proxied "$proxied" \
    '{type: $type, name: $name, content: $content, comment: $comment, proxied: $proxied, ttl: 1}')

  if [ -n "$record_id" ]; then
    if [ "$current_content" = "$content" ] && [ "$current_comment" = "$comment" ]; then
      echo -e "    ${GREEN}✓ unchanged${NC}"
      return 0
    fi
    local result=$(curl -s -X PUT "$CF_API/zones/$ZONE_ID/dns_records/$record_id" \
      -H "$CF_AUTH" -H "Content-Type: application/json" --data "$data")
  else
    local result=$(curl -s -X POST "$CF_API/zones/$ZONE_ID/dns_records" \
      -H "$CF_AUTH" -H "Content-Type: application/json" --data "$data")
  fi

  if echo "$result" | jq -e '.success' > /dev/null; then
    local action=$([ -n "$record_id" ] && echo "updated" || echo "created")
    echo -e "    ${GREEN}✓ $action${NC}"
    return 0
  else
    local err=$(echo "$result" | jq -r '.errors[0].message')
    echo -e "    ${RED}✗ $err${NC}"
    return 1
  fi
}

echo ""
echo "Records:"

# ACM validation CNAME
ACM_INFO=$(aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT_ARN" \
  --query 'Certificate.DomainValidationOptions[0].ResourceRecord' --output json 2>/dev/null)
if [ $? -eq 0 ]; then
  ACM_NAME=$(echo "$ACM_INFO" | jq -r '.Name' | sed 's/\.$//')
  ACM_VALUE=$(echo "$ACM_INFO" | jq -r '.Value' | sed 's/\.$//')
  upsert_record "$ACM_NAME" "CNAME" "$ACM_VALUE" "$CERT_ARN" || ((ERRORS++))
else
  echo -e "  ${YELLOW}ACM cert: not found, skipping${NC}"
fi

# CloudFront CNAME
CF_DIST=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Aliases.Items[?contains(@,'$DOMAIN')]] | [0]" --output json 2>/dev/null)
CF_DOMAIN=$(echo "$CF_DIST" | jq -r '.DomainName // empty')
CF_ARN=$(echo "$CF_DIST" | jq -r '.ARN // empty')

if [ -n "$CF_DOMAIN" ] && [ "$CF_DOMAIN" != "null" ]; then
  upsert_record "$DOMAIN" "CNAME" "$CF_DOMAIN" "$CF_ARN" || ((ERRORS++))
else
  echo -e "  ${YELLOW}CloudFront: not deployed yet, skipping${NC}"
fi

echo ""
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}Done.${NC}"
  exit 0
else
  echo -e "${RED}Done with $ERRORS error(s).${NC}"
  exit 1
fi
