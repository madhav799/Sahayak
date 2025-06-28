import NextAuth from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from '@/db/connectDb';
import User from '@/models/User';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: { timeout: 10000 }, // ⏱️ Increases timeout to avoid SIGNIN_OAUTH_ERROR
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: { timeout: 10000 }, // ⏱️ Critical for avoiding timeouts
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          email: user.email,
          username: user.email.split('@')[0],
          name: user.name,
        });
      }

      // For Google, verify email if needed
      if (account.provider === "google") {
        return profile.email_verified ?? false;
      }

      return true;
    },

    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.name = dbUser.username; // Use username instead of name
        session.user.id = dbUser._id.toString(); // Optional: attach MongoDB _id
      }

      return session;
    },
  },

  // Optional: Customize pages
  pages: {
    signIn: '/login',
    error: '/login', // Handle errors on same page
  },

  // Optional: Secure session with JWT if needed
  // session: {
  //   strategy: 'jwt'
  // },
});

export { authoptions as GET, authoptions as POST };
