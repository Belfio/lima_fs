import { SSTConfig } from "sst";
import { MainStack } from "./stacks/MainStack";

export default {
  config(_input) {
    return {
      name: "lima-fs",
      region: "us-east-1",
      profile: "default",
    };
  },
  stacks(app) {
    app.stack(MainStack);
  },
} satisfies SSTConfig;
