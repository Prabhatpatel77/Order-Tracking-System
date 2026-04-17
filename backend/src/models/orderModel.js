import db from "../config/db.js";


export const createOrderModel = async (data) => {
  const { user_id, product_name, quantity, address } = data;

  if (!user_id || !product_name || !quantity || !address) {
    throw new Error("All fields required");
  }

  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();

 
    const [orderResult] = await conn.execute(
      `INSERT INTO orders (user_id, product_name, quantity, address)
       VALUES (?, ?, ?, ?)`,
      [user_id, product_name, quantity, address]
    );

    const orderId = orderResult.insertId;

  
    await conn.execute(
      `INSERT INTO order_status_history (order_id, status)
       VALUES (?, ?)`,
      [orderId, "Placed"]
    );

    await conn.commit();

    return { orderId, status: "Placed" };

  } catch (err) {
    await conn.rollback();
    console.error("DB ERROR:", err);
    throw err;
  } finally {
    conn.release();
  }
};




export const getOrderWithStatus = async (orderId) => {
  const [rows] = await db.execute(
    `SELECT 
        o.id AS order_id,
        u.name,
        o.product_name,
        o.quantity,
        o.address,
        osh.status,
        osh.timestamp
     FROM orders o
     JOIN users u ON o.user_id = u.id
     JOIN order_status_history osh ON o.id = osh.order_id
     WHERE osh.timestamp = (
        SELECT MAX(timestamp)
        FROM order_status_history
        WHERE order_id = o.id
     )
     AND o.id = ?`,
    [orderId]
  );

  if (!rows.length) {
    throw new Error("Order not found");
  }

  return rows[0];
};



export const getOrderTimeline = async (orderId) => {
  const [rows] = await db.execute(
    `SELECT status, timestamp
     FROM order_status_history
     WHERE order_id = ?
     ORDER BY timestamp`,
    [orderId]
  );

  return rows;
};




export const updateStatusModel = async (orderId, status) => {
  await db.execute(
    `INSERT INTO order_status_history (order_id, status)
     VALUES (?, ?)`,
    [orderId, status]
  );

  return { orderId, status };
};