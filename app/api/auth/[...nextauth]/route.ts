import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/app/lib/connection";
import { User } from "@/app/lib/user.model";
connectDB();
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
        email: { label: "email", type: "email", placeholder: "" },
      },
      async authorize(credentials: any) {
        const findUser = await User.findOne({ email: credentials.email });
        const user = findUser;
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
