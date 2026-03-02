require('dotenv').config();
const mysql = require('mysql2/promise');

async function migrate() {
    try {
        const dbPool = mysql.createPool({
            uri: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        const connection = await dbPool.getConnection();
        console.log('Connected to DB');

        try {
            await connection.query('ALTER TABLE users ADD COLUMN phone VARCHAR(255) NOT NULL DEFAULT ""');
            console.log('Added phone column successfully');
        } catch (err) {
            console.log('Column might already exist or error:', err.message);
        }

        connection.release();
        process.exit(0);
    } catch (err) {
        console.error('Migration error:', err);
        process.exit(1);
    }
}

migrate();
