import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add more providers here
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      if(session.user !== undefined) {
        session.user.id = sessionUser?._id.toString() ;

      }

      return session;
    },

    async signIn({ profile, email, credentials }) {
      console.log({ profile, email, credentials });
      try {
        await connectToDB();
        // Check if user exists in the database
        const userExists = await User.findOne({ email: profile?.email });

        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            name: profile?.name?.replace(" ", ""),
            image: profile?.image,
          });
        }
      } catch (error) {
        console.error(error);
        return false;
      }

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
