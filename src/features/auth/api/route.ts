import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Check against .env variables
    const envUser = process.env.USERNAME;
    const envPass = process.env.PASSWORD;
    
    if (username === envUser && password === envPass) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}
