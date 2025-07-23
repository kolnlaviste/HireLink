import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Temporary mock user
        const user = {
          id: '1',
          name: 'Test User',
          email: credentials.email,
        };

        // In real usage, validate credentials from your DB here
        if (
          credentials.email === 'test@example.com' &&
          credentials.password === 'password123'
        ) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login', // Optional: custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
