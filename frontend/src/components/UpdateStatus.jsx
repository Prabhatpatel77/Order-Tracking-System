import API from "../services/api";

const nextStep = {
  Placed: "Packed",
  Packed: "Shipped",
  Shipped: "Delivered"
};

export default function UpdateStatus({ orderId, currentStatus }) {
  const update = async (status) => {
    try {
      await API.post(`/orders/${orderId}/status`, { status });
      alert("Updated");
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  const next = nextStep[currentStatus];

  return (
    <div>
      {next ? (
        <button onClick={() => update(next)}>
          {next}
        </button>
      ) : (
        <p>Order Completed ✅</p>
      )}
    </div>
  );
}