import pool from './db';

export async function setupDatabase() {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Contact Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-contact\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        client_metadata JSON,
        is_resolved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Visitors Table (Anonymous)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-visitors\` (
        visitor_id VARCHAR(64) PRIMARY KEY,
        first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        user_agent TEXT
      )
    `);

    // Analytics Events Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-analytics\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        visitor_id VARCHAR(64) NOT NULL,
        event_name VARCHAR(100) NOT NULL,
        page_url VARCHAR(255),
        referrer VARCHAR(255),
        details JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_visitor (visitor_id),
        INDEX idx_event (event_name),
        INDEX idx_created_at (created_at)
      )
    `);

    // Logs Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-logs\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        level VARCHAR(20) NOT NULL, -- INFO, WARN, ERROR, AUTH
        message TEXT NOT NULL,
        details JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // FAQ Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-faq\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.commit();
    console.log('Database tables setup successfully');
  } catch (error) {
    await connection.rollback();
    console.error('Error setting up database:', error);
    throw error;
  } finally {
    connection.release();
  }
}

