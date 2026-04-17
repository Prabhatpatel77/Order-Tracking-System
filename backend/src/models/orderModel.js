import db from "../config/db.js";

export const createOrderModel = async ({ user_id }) => {
  const [result] = await db.execute(
    "INSERT INTO orders (user_id) VALUES (?)",
    [user_id]
  );

  return { orderId: result.insertId };
};