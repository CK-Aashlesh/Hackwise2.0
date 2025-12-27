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

    // Browsers (from User Agent in visitors table or details in analytics)
    // Simplified: just grouping by details->>'$.browser' if I stored it parsed, 
    // but I store raw UA usually or parsed. I'll assume client sends parsed browser in details.
    
    // For now, let's just count total events over time (buckets)
    // This is hard in pure SQL without complex grouping, I'll skip the chart data for now 
    // and just provide summary lists.

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

