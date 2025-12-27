import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || '24h'; // 24h, 7d, 30d

  let timeFilter = 'INTERVAL 24 HOUR';
  if (range === '7d') timeFilter = 'INTERVAL 7 DAY';
  if (range === '30d') timeFilter = 'INTERVAL 30 DAY';

  try {
    const stats = {};

    // Page Views
    const [pageViews] = await pool.query(`
      SELECT page_url, COUNT(*) as count 
      FROM \`hw-analytics\` 
      WHERE event_name = 'page_view' AND created_at > NOW() - ${timeFilter}
      GROUP BY page_url 
      ORDER BY count DESC 
      LIMIT 10
    `);
    stats.pageViews = pageViews;

    // Events
    const [events] = await pool.query(`
      SELECT event_name, COUNT(*) as count 
      FROM \`hw-analytics\` 
      WHERE created_at > NOW() - ${timeFilter}
      GROUP BY event_name 
      ORDER BY count DESC 
      LIMIT 10
    `);
    stats.events = events;

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { visitor_id, event_name, page_url, referrer, details } = body;

    if (!visitor_id || !event_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update or Insert Visitor
    await pool.query(
      `INSERT INTO \`hw-visitors\` (visitor_id, first_seen, last_seen, user_agent)
       VALUES (?, NOW(), NOW(), ?)
       ON DUPLICATE KEY UPDATE last_seen = NOW()`,
      [visitor_id, details?.userAgent || 'unknown']
    );

    // Record Event
    // Deduplication logic for page_view: Check if same visitor viewed same page in last 5 seconds
    if (event_name === 'page_view') {
      const [existing] = await pool.query(
        `SELECT id FROM \`hw-analytics\` 
         WHERE visitor_id = ? AND event_name = 'page_view' AND page_url = ? 
         AND created_at > NOW() - INTERVAL 5 SECOND`,
        [visitor_id, page_url]
      );
      
      if (existing.length > 0) {
        return NextResponse.json({ skipped: true });
      }
    }

    await pool.query(
      `INSERT INTO \`hw-analytics\` (visitor_id, event_name, page_url, referrer, details)
       VALUES (?, ?, ?, ?, ?)`,
      [visitor_id, event_name, page_url, referrer, JSON.stringify(details || {})]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

