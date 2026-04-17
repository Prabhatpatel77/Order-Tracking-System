import { useState } from "react";
import CreateOrder from "../components/CreateOrder";
import TrackOrder from "../components/TrackOrder";
import UpdateStatus from "../components/UpdateStatus";
import "../styles/App.css";

export default function Home() {
  const [orderId, setOrderId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="container">
      <h1>📦 Order Tracking System</h1>

   
      <div className="card">
        <button
          className="btn-primary"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? "Close" : "Create New Order"}
        </button>

        {showCreate && (
          <CreateOrder setOrderId={setOrderId} />
        )}
      </div>

  
      <div className="card">
        <TrackOrder setOrderId={setOrderId} />
      </div>

     
      {orderId && (
        <div className="card">
          <h3>Update Status (Order #{orderId})</h3>
          <UpdateStatus orderId={orderId} />
        </div>
      )}
    </div>
  );
}