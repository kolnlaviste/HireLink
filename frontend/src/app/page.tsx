// app/page.tsx (server component)
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <HomeClient session={session} />;
}
