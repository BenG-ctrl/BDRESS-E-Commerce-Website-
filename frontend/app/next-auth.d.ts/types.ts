import "next-auth";

declare module "next-auth" {
  interface User {
    token?: string; // Add the `token` property
  }

  interface Session {
    token?: string; // Add the `token` property to the session
  }
}