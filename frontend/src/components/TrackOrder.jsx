import { useState } from "react";
import API from "../services/api";

export default function TrackOrder({ setOrderId }) {
  const [orderId, setLocalOrderId] = useState("");
  const [data, setData] = useState(null);

  const fetchOrder = async () => {
    const res = await API.get(`/orders/${orderId}`);
    setData(res.data);
    setOrderId(orderId);
  };

  return (
    <div>
      <h2>Track Order</h2>

      <input
        placeholder="Enter Order ID"
        onChange={(e) => setLocalOrderId(e.target.value)}
      />

      <button className="btn-secondary" onClick={fetchOrder}>
        Track
      </button>

      {data && (
        <div className="status">
          <p>User: {data.name}</p>
          <p>Status: {data.status}</p>
        </div>
      )}
    </div>
  );
}