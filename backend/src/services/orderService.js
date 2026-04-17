import {
  createOrderModel,
  getOrderWithStatus,
  updateStatusModel
} from "../models/orderModel.js";

import { validFlow } from "../utils/statusFlow.js";


export const createOrderService = async (data) => {
  console.log("SERVICE DATA:", data);

  if (!data) {
    throw new Error("No data received in service");
  }

  return await createOrderModel(data);
};


export const getOrderService = async (orderId) => {
  return await getOrderWithStatus(orderId);
};


export const updateStatusService = async (orderId, newStatus) => {
  const history = await getOrderTimeline(orderId);

  if (!history.length) {
    throw new Error("Order not found");
  }

  const currentStatus = history[history.length - 1].status;

  if (validFlow[currentStatus] !== newStatus) {
    throw new Error("Invalid status transition");
  }

  return await updateStatusModel(orderId, newStatus);
};