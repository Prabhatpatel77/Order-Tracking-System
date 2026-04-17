import express from "express";
import {
  createOrder,
  getOrder,
  updateStatus
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getOrder);
router.post("/:id/status", updateStatus);

export default router;