// app/api/jobs/route.ts
export const dynamic = 'force-dynamic'; // prevent caching

import { NextResponse } from 'next/server';
import { jobs as staticJobs } from '@/lib/jobs';

let dynamicJobs: any[] = []; // in-memory only (resets on restart)

export async function GET() {
  // Ensure staticJobs always returns something
  if (!staticJobs || staticJobs.length === 0) {
    console.error('Static jobs not loaded');
  }

  return NextResponse.json([...(staticJobs || []), ...dynamicJobs]);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newJob = {
    id: Date.now().toString(), // store as string
    tags: [],
    about: '',
    apply: body.applyLink ? `Apply here: ${body.applyLink}` : 'No application link provided',
    ...body,
  };

  dynamicJobs.push(newJob);

  return NextResponse.json({ message: 'Job posted successfully', job: newJob }, { status: 201 });
}

