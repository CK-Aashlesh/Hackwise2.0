import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { question, answer, display_order } = await request.json();
    if (!question || !answer) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    
    await pool.query(
      'INSERT INTO `hw-faq` (question, answer, display_order) VALUES (?, ?, ?)',
      [question, answer, display_order || 0]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, question, answer, display_order } = await request.json();
    
    await pool.query(
      'UPDATE `hw-faq` SET question = ?, answer = ?, display_order = ? WHERE id = ?',
      [question, answer, display_order, id]
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await pool.query('DELETE FROM `hw-faq` WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

