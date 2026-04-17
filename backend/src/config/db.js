import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "prabhat@123",
  database: "order_tracking"
});

export default db;