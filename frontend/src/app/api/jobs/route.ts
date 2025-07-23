import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // TODO: validate & store in DB
  console.log('New Job:', body);

  return NextResponse.json({ message: 'Job posted successfully' }, { status: 201 });
}
