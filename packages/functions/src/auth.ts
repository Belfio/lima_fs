import { AuthHandler, LinkAdapter, Session } from "sst/node/auth";

export const handler = AuthHandler({
  providers: {
    magikLink: LinkAdapter({
      onLink: async (link, claims) => {
        const sendEmail = async (email: string, link: string) => {};

        await sendEmail(claims.email, link);
        /* ------------ To Implement ------------ */
        /* This function receives a link that     */
        /* you can send over email or sms so      */
        /* that the user can login.               */
        /* -------------------------------------- */
      },
      onSuccess: async (claims) => {
        const user = {
          user: "who us this guy?",
        }; /** TODO: create or look up a user from your db **/

        // Redirects to https://example.com?token=xxx
        return Session.parameter({
          redirect: "https://example.com",
          type: "user",
          properties: {
            userID: user.userID,
          },
        });
      },
    }),
  },
});

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
      // For a multi-tenant setup
      // tenantID: string
    };
  }
}
