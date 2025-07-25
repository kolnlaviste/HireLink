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

        // Mock users
        const mockUsers = [
          {
            id: '1',
            name: 'Employer User',
            email: 'employer@example.com',
            password: 'password123',
            role: 'employer',
          },
          {
            id: '2',
            name: 'Jobseeker User',
            email: 'jobseeker@example.com',
            password: 'password123',
            role: 'jobseeker',
          },
        ];

        // Find matching user
        const user = mockUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
