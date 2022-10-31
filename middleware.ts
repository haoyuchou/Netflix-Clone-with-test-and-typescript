export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/movie", "/tv"],
  pages: {
    signIn: "/login",
  },
}; 

