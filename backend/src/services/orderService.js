import { createOrderModel } from "../models/orderModel.js";

export const createOrderService = async (data) => {
  return await createOrderModel(data);
};