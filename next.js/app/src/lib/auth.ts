import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';
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

        console.log("aaaaaaaaaa")
        //const response = await axios.post('http://localhost:8000/token', null, {
        //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //    //data: `username=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`,
        //    data: `username=sample_user@example.com&&password=sample_password`,
        //});
        
        const data = { username : "sample_user@example.com", password : "sample_password" }
        const url = await axios.post("http://localhost:8000/token", data)

        //const response = await axios.post('http://localhost:8000/token', `username=sample_user@example.com&password=sample_password`, {
        //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //});
        console.log("bbbbbbb")

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
