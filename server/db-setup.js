import pool from './dbinit.js';

async function createTables() {
    console.log("Connecting to the database to create tables...");

    try {
        // 1. Create Users Table first (Independent)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                userid CHAR(36) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password CHAR(60) NOT NULL
            );
        `);
        console.log("✅ 'users' table ready.");

        // 2. Create Chats Table (Relies on users for the admin field)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS chats (
                chatid CHAR(36) PRIMARY KEY,
                chatname VARCHAR(255),
                admin CHAR(36),
                FOREIGN KEY (admin) REFERENCES users(userid) ON DELETE SET NULL
            );
        `);
        console.log("✅ 'chats' table ready.");

        // 3. Create Chat Members Table (Relies on chats and users)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS chat_members (
                chatid CHAR(36) NOT NULL,
                userid CHAR(36) NOT NULL,
                PRIMARY KEY (chatid, userid),
                FOREIGN KEY (chatid) REFERENCES chats(chatid) ON DELETE CASCADE,
                FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
            );
        `);
        console.log("✅ 'chat_members' table ready.");

        // 4. Create Messages Table (Relies on chats and users)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                messageid INT AUTO_INCREMENT PRIMARY KEY,
                userid CHAR(36),
                chatid CHAR(36),
                text TEXT NOT NULL,
                time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE SET NULL,
                FOREIGN KEY (chatid) REFERENCES chats(chatid) ON DELETE CASCADE
            );
        `);
        console.log("✅ 'messages' table ready.");

        console.log("🎉 All tables created successfully to match your schema!");

    } catch (error) {
        console.error("❌ Error creating tables:", error);
    } finally {
        // Close the connection pool so the Node script can finish and exit
        await pool.end();
        process.exit();
    }
}

// Execute the setup
createTables();