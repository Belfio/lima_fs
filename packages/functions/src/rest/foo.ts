import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";

export const needsAuthHandler = ApiHandler(async (event) => {
  const session = useSession();

  return {
    statusCode: 200,
    body: session.properties.userID,
  };
});
