import { Api, StackContext, StaticSite, Table, Auth } from "sst/constructs";
import { LayerVersion } from "@aws-cdk/aws-lambda";
import * as lambda from "aws-cdk-lib/aws-lambda";

export function MainStack({ stack, app }: StackContext) {
  const stage = app.stage;

  const tableUser = new Table(stack, "userProfile", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [tableUser],
      },
    },
    routes: {
      "GET /title": {
        function: {
          handler: "packages/functions/src/lambda.handler",
          timeout: 15,
          // Load Chrome in a Layer
        },
      },
      "GET /": "packages/functions/src/lambda.prova",
    },
  });

  const site = new StaticSite(stack, "web", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/src/auth.handler",
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth", // optional
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}
