import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const backendResponse = await fetch('http://localhost:5000/myProducts', {
    headers: request.headers,
  });
  return NextResponse.json(await backendResponse.json());
}