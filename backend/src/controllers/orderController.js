import { createOrderService } from "../services/orderService.js";

export const createOrder = async (req, res) => {
  try {
    const data = await createOrderService(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};