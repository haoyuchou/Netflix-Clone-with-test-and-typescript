export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/movie"],
  pages: {
    signIn: "/login",
  },
}; 

