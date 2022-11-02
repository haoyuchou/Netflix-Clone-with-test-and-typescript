import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || "",
      clientSecret: process.env.FACEBOOK_SECRET || "",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token } : {session: any, token: any}) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.id;
      //session.user.token = token;
      return session;
    }}
  // secret: process.env.NEXTAUTH_SECRET
};
export default NextAuth(authOptions);
