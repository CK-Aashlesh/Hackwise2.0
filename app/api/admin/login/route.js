import { NextResponse } from 'next/server';
import { verifyAdminKey, createAdminSession } from '@/lib/auth';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { key } = await request.json();

    if (!await verifyAdminKey(key)) {
      // Log failed attempt
      try {
        await pool.query(
          'INSERT INTO `hw-logs` (level, message, details) VALUES (?, ?, ?)',
          ['AUTH', 'Failed admin login attempt', JSON.stringify({ ip: request.headers.get('x-forwarded-for') || 'unknown' })]
        );
      } catch (e) {
        console.error('Logging failed', e);
      }
      return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    }

    const token = await createAdminSession();
    
    // Log successful login
    try {
      await pool.query(
        'INSERT INTO `hw-logs` (level, message) VALUES (?, ?)',
        ['AUTH', 'Successful admin login']
      );
    } catch (e) {
      console.error('Logging failed', e);
    }

    const response = NextResponse.json({ success: true });
    
    // Set cookie
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

