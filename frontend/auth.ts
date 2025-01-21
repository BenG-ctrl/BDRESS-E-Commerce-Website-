import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";




export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            throw new Error("Invalid credentials.");
          }

          const token = await response.text();

          // Return a User object with the token and email
          return {
            id: credentials?.email as string, // Use email as the ID (or generate a unique ID)
            email: credentials?.email as string,
            token, // Include the token in the User object
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Return null if authorization fails
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        try {
          const response = await fetch("http://localhost:5000/auth/loginGoogle", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken: profile.access_token,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user data.");
          }

          const token = await response.text();

          // Return a User object with the token and email
          return {
            id: profile.email as string, // Use email as the ID (or generate a unique ID)
            email: profile.email as string,
            token, // Include the token in the User object
          };
        } catch (error) {
          console.error("Google authorization error:", error);
          throw new Error("Google login failed"); // Throw an error instead of returning null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // Initial sign-in: add the token to the JWT
      if (user) {
        token.accessToken = user.token;
        token.id = user._id;
      }

      // Update the token if triggered by the session update route
      if (trigger === "update" && session?.token) {
        token.accessToken = session.token;
      }

      return token;
    },
    async session({ session, token }: any) {
      // Add the token to the session
      session.token = token.accessToken;
      session.user._id = token.id;
      return session;
     
    },
  },
  secret: process.env.AUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      },
    },
  },
});