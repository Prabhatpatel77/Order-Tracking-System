import "./Timeline.css";

const steps = ["Placed", "Packed", "Shipped", "Delivered"];

export default function Timeline({ currentStatus }) {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="timeline-container">
      {steps.map((step, index) => {
        let statusClass = "";

        if (index < currentIndex) {
          statusClass = "completed";
        } else if (index === currentIndex) {
          statusClass = "active";
        }

        return (
          <div key={index} className="step">
            <div className={`circle ${statusClass}`}>
              {index < currentIndex ? "✔" : index + 1}
            </div>
            <p>{step}</p>

            {index !== steps.length - 1 && (
              <div className={`line ${index < currentIndex ? "completed" : ""}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}