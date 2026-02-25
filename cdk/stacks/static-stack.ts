import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { AllowedMethods, CachePolicy, CfnDistribution, Distribution, GeoRestriction, PriceClass, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, CacheControl, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path from 'path';

interface StaticStackProps extends StackProps {
  domain?: string;
}

const attachCertificate = (scope: Construct, distribution: Distribution) => {
  const certArn = process.env.CERT_ARN;
  const alias = process.env.DOMAIN;
  if (!certArn) return;

  const cert = Certificate.fromCertificateArn(scope, 'ExistingCert', certArn);
  const cfn = distribution.node.defaultChild as CfnDistribution;

  cfn.addOverride('Properties.DistributionConfig.ViewerCertificate', {
    AcmCertificateArn: cert.certificateArn,
  });

  if (alias) {
    cfn.addOverride('Properties.DistributionConfig.Aliases', [alias]);
  }
};

export class StaticStack extends Stack {
  constructor(scope: Construct, id: string, props?: StaticStackProps) {
    super(scope, id, props);

    // Create S3 bucket for static files
    const bucket = new Bucket(this, 'warclaude-bucket', {
      bucketName: `warclaude-bucket-${this.account}`,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: false,
    });

    // Create a single S3 origin
    const s3Origin = S3BucketOrigin.withOriginAccessControl(bucket);

    let certificate;
    let domainNames;

    if (props?.domain) {
      // Create SSL certificate for the domain if provided
      certificate = new Certificate(this, 'Certificate', {
        domainName: props.domain,
        validation: CertificateValidation.fromDns(),
      });
      domainNames = [props.domain];
    }

    // Create assets cache policy
    const assetsCachePolicy = new CachePolicy(this, 'warclaude-assets-cache-policy', {
      minTtl: Duration.days(365),
      maxTtl: Duration.days(365),
      defaultTtl: Duration.days(365),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });

    const behaviors: Record<string, any> = {
      '/*.md': {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: CachePolicy.CACHING_DISABLED,
      },
      '/*.mdx': {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: CachePolicy.CACHING_DISABLED,
      },
      // Cache static assets longer
      '/assets/*': {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: assetsCachePolicy,
      },
      '/*.css': {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: assetsCachePolicy,
      },
      '/*.js': {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: assetsCachePolicy,
      },
    };

    // Block hackerman countries
    const restrictedCountries = [
      'RU', // Russia
      'CN', // China
      'KP', // North Korea
      'IR', // Iran
      'BY', // Belarus
    ];

    // Create CloudFront distribution
    const distribution = new Distribution(this, 'warclaude-distribution', {
      ...(certificate && domainNames ? { domainNames, certificate } : {}),
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachePolicy: new CachePolicy(this, 'warclaude-cache-policy', {
          minTtl: Duration.seconds(0),
          maxTtl: Duration.days(365),
          defaultTtl: Duration.days(1),
          enableAcceptEncodingGzip: true,
          enableAcceptEncodingBrotli: true,
        }),
      },
      additionalBehaviors: behaviors,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(0),
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: Duration.minutes(0),
        },
      ],
      // USA, Canada, Europe, & Israel
      priceClass: PriceClass.PRICE_CLASS_100,
      geoRestriction: GeoRestriction.denylist(...restrictedCountries),
    });

    // Attach certificate to distribution
    attachCertificate(this, distribution);

    // Deploy static files to S3 with proper caching
    new BucketDeployment(this, 'warclaude-deployment', {
      sources: [Source.asset(path.resolve('dist/client'))],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
      cacheControl: [CacheControl.setPublic(), CacheControl.maxAge(Duration.days(365)), CacheControl.fromString('immutable')],
      prune: true,
    });

    // Output the CloudFront URL
    new CfnOutput(this, 'warclaude-url', {
      value: distribution.distributionDomainName,
      description: 'warclaude cloudfront distribution URL',
    });
  }
}
