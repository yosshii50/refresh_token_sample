import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function authenticateUser(email: string, password: string) {
    const response = await fetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'username=' + email + '&password=' + password
    });
    const data = await response.json();
    return data.access_token;
}

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
        const token = await authenticateUser(credentials.email, credentials.password);
        if (token) {
            return { id: "userId", name: "User Name", email: credentials.email, token };
        }
        return null;
      },
    }),
  ],
};
