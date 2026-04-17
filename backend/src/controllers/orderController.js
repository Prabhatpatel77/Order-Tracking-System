import {
  createOrderService,
  getOrderService,
  updateStatusService
} from "../services/orderService.js";


export const createOrder = async (req, res) => {
  try {
    console.log("BODY:", req.body); 

    if (!req.body || !req.body.user_id) {
      return res.status(400).json({ error: "user_id required" });
    }

    const data = await createOrderService(req.body);
    res.status(201).json(data);

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getOrder = async (req, res) => {
  try {
    const data = await getOrderService(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const data = await updateStatusService(
      req.params.id,
      req.body.status
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};