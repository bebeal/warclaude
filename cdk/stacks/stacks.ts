import { App } from 'aws-cdk-lib';
import 'dotenv/config';
import { GitHubActionsStack } from './github-actions-stack';
import { StaticStack } from './static-stack';

export const makeStacks = (app: App) => {
  const githubRepo = process.env.GITHUB_REPO || 'bebeal/warclaude';

  const githubActionsStack = new GitHubActionsStack(app, 'warclaude-github', {
    env: {
      region: process.env.AWS_REGION || 'us-west-2',
    },
    githubRepo,
  });

  const staticStack = new StaticStack(app, 'warclaude-static', {
    env: {
      region: process.env.AWS_REGION || 'us-west-2',
    },
    domain: process.env.DOMAIN,
  });

  return [githubActionsStack, staticStack];
};
