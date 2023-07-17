import { AuthHandler, LinkAdapter, Session } from "sst/node/auth";

export const handler = AuthHandler({
  providers: {
    magicLink: LinkAdapter({
      onLink: async (link, claims) => {
        const sendEmail = async (email, link: string) => {
          console.log("Send email:", email, link);
        };

        await sendEmail(claims, link);
        /* ------------ To Implement ------------ */
        /* This function receives a link that     */
        /* you can send over email or sms so      */
        /* that the user can login.               */
        /* -------------------------------------- */
      },
      onSuccess: async (claims) => {
        console.log("OnSuccess auth claims:", claims);
        const user = {
          userID: "who us this guy?",
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
