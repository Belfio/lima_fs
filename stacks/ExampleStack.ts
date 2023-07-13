import { Api, StackContext, StaticSite, Table, Auth } from "sst/constructs";

export function ExampleStack({ stack, app }: StackContext) {
  const stage = app.stage;

  const tableUser = new Table(stack, "userProfile", {
    fields: {
      counter: "string",
    },
    primaryIndex: { partitionKey: "counter" },
  });

  // Add your first construct
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        // Bind the table name to our API
        bind: [tableUser],
      },
    },
    customDomain: `${stage}.example.com`,
    hostedZone: "example.com",

    routes: {
      "POST /": "packages/functions/src/lambda.handler",
    },
  });

  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildCommand: "npm run build",
    buildOutput: "build",
    environment: {
      REACT_APP_API_URL: api.url,
    },
    customDomain: "www.my-react-app.com",
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
