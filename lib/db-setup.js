import pool from './db';

async function addColumnIfNotExists(connection, table, columnDef) {
  try {
    await connection.query(`ALTER TABLE \`${table}\` ADD COLUMN ${columnDef}`);
    console.log(`Added column to ${table}: ${columnDef.split(' ')[0]}`);
  } catch (error) {
    // Ignore duplicate column error (Code 1060: Duplicate column name)
    if (error.code !== 'ER_DUP_FIELDNAME' && error.errno !== 1060) {
      console.warn(`Warning adding column to ${table}: ${error.message}`);
    }
  }
}

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

    // Teams Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-teams\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_name VARCHAR(255) UNIQUE,
        access_key VARCHAR(64) UNIQUE NOT NULL,
        lead_name VARCHAR(255),
        lead_email VARCHAR(255),
        lead_phone VARCHAR(50),
        lead_college VARCHAR(255),
        lead_branch VARCHAR(100),
        lead_year VARCHAR(20),
        logo_url VARCHAR(500),
        round1_submission_url VARCHAR(500),
        round1_marks INT,
        round1_feedback TEXT,
        payment_status ENUM('PENDING', 'PAID') DEFAULT 'PENDING',
        payment_screenshot_url VARCHAR(500),
        transaction_id VARCHAR(100),
        password_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Team Members Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-team-members\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        college VARCHAR(255),
        branch VARCHAR(100),
        year VARCHAR(20),
        role ENUM('LEAD', 'MEMBER') DEFAULT 'MEMBER',
        details JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (team_id) REFERENCES \`hw-teams\`(id) ON DELETE CASCADE
      )
    `);

    // Announcements Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-announcements\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        target_team_id INT, -- NULL for all
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (target_team_id) REFERENCES \`hw-teams\`(id) ON DELETE SET NULL
      )
    `);

    // Chat Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-chat\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL,
        sender_name VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(20) DEFAULT 'text',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (team_id) REFERENCES \`hw-teams\`(id) ON DELETE CASCADE
      )
    `);

    // Settings Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-settings\` (
        setting_key VARCHAR(50) PRIMARY KEY,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Project Submissions Table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`hw-project-submissions\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        team_id INT NOT NULL UNIQUE,
        description TEXT,
        github_link VARCHAR(500),
        live_link VARCHAR(500),
        ppt_url VARCHAR(500),
        source_code_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (team_id) REFERENCES \`hw-teams\`(id) ON DELETE CASCADE
      )
    `);

    // Apply Migrations for existing tables
    // hw-teams
    await addColumnIfNotExists(connection, 'hw-teams', 'transaction_id VARCHAR(100)');
    await addColumnIfNotExists(connection, 'hw-teams', 'lead_college VARCHAR(255)');
    await addColumnIfNotExists(connection, 'hw-teams', 'lead_branch VARCHAR(100)');
    await addColumnIfNotExists(connection, 'hw-teams', 'lead_year VARCHAR(20)');
    await addColumnIfNotExists(connection, 'hw-teams', 'password_hash VARCHAR(255)');

    // hw-team-members
    await addColumnIfNotExists(connection, 'hw-team-members', 'phone VARCHAR(50)');
    await addColumnIfNotExists(connection, 'hw-team-members', 'college VARCHAR(255)');
    await addColumnIfNotExists(connection, 'hw-team-members', 'branch VARCHAR(100)');
    await addColumnIfNotExists(connection, 'hw-team-members', 'year VARCHAR(20)');

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
