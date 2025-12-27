import { NextResponse } from 'next/server';
import { setupDatabase } from '@/lib/db-setup';

export async function GET() {
  try {
    await setupDatabase();
    return NextResponse.json({ message: 'Database initialized successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

