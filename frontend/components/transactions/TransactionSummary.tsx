"use client";

const summaryItems = [
  {
    title: "Total Transactions",
    value: "392,386",
    description: "Total Transactions",
    icon: "▤",
    type: "blue",
  },
  {
    title: "High Risk Transactions",
    value: "1,177",
    description: "High Risk Transactions",
    icon: "⚠",
    type: "red",
  },
  {
    title: "Fraud Rate",
    value: "0.30%",
    description: "Fraud Rate",
    icon: "↗",
    type: "purple",
  },
  {
    title: "Total Amount",
    value: "৳ 48.2M",
    description: "Total Amount",
    icon: "◉",
    type: "green",
  },
];

export default function TransactionSummary() {
  return (
    <div className="transaction-summary-grid">
      {summaryItems.map((item) => (
        <div
          className={`transaction-summary-card summary-${item.type}`}
          key={item.title}
        >
          <div className="transaction-summary-icon">{item.icon}</div>

          <div className="transaction-summary-content">
            <h3>{item.value}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
