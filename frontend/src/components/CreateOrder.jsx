import { useState } from "react";
import API from "../services/api";

export default function CreateOrder({ setOrderId }) {
  const [form, setForm] = useState({
    user_id: "",
    product_name: "",
    quantity: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createOrder = async () => {
    const res = await API.post("/orders", {
      ...form,
      user_id: Number(form.user_id),
      quantity: Number(form.quantity)
    });

    setOrderId(res.data.orderId);
    alert("Order Created: " + res.data.orderId);
  };

  return (
    <div>
      <input name="user_id" placeholder="User ID" onChange={handleChange} />
      <input name="product_name" placeholder="Product" onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />

      <button onClick={createOrder}>Create Order</button>
    </div>
  );
}