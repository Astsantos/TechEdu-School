import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: '',              // 👈 linha adicionada
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

export async function testConnection(): Promise<void> {
  let conn: PoolConnection | null = null;
  try {
    conn = await pool.getConnection();
    console.log('✅ Conectado ao MySQL');
  } catch (err) {
    console.error('❌ Erro na conexão:', err);
  } finally {
    if (conn) conn.release();
  }
}