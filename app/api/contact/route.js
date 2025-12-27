import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, metadata } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to DB
    const [result] = await pool.query(
      'INSERT INTO `hw-contact` (name, email, subject, message, client_metadata) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject || 'No Subject', message, JSON.stringify(metadata || {})]
    );

    // Log the event (optional, but good for admin visibility in logs)
    // We do this async and don't await to not block response
    pool.query(
      'INSERT INTO `hw-logs` (level, message, details) VALUES (?, ?, ?)',
      ['INFO', 'New Contact Form Submission', JSON.stringify({ id: result.insertId, email })]
    ).catch(console.error);

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

