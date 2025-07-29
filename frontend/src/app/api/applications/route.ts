import { NextResponse } from 'next/server';

let applications: any[] = [];

export async function POST(req: Request) {
    const data = await req.json();
    applications.push(data);
    return NextResponse.json({ success: true });
}

export async function GET() {
    return NextResponse.json(applications);
}