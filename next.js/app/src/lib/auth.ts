import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const users = [
            { id: "1", name: "TestUser1", email: "testuser1@example.com", password: "strongpassword123" },
            { id: "2", name: "TestUser2", email: "testuser2@example.com", password: "hogehoge" },
          ];
          console.log(credentials.password);
          const user = users.find((user) => user.email === credentials.email) || null;
          if (user && user.password === credentials.password) {
            return user;
          }
          return null;
      },
    }),
  ],
};
