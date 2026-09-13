"use client";

const transactions = [
  {
    id: "TXN-001234",
    customer: "CUST0012",
    amount: "৳45,000",
    channel: "P2P",
    score: 95,
    status: "HIGH",
    time: "2 min ago",
  },
  {
    id: "TXN-001235",
    customer: "CUST0492",
    amount: "৳18,200",
    channel: "Cash Out",
    score: 87,
    status: "HIGH",
    time: "5 min ago",
  },
  {
    id: "TXN-001236",
    customer: "CUST0781",
    amount: "৳12,500",
    channel: "Cash In",
    score: 76,
    status: "MEDIUM",
    time: "12 min ago",
  },
  {
    id: "TXN-001237",
    customer: "CUST0034",
    amount: "৳8,900",
    channel: "P2P",
    score: 72,
    status: "MEDIUM",
    time: "18 min ago",
  },
  {
    id: "TXN-001238",
    customer: "CUST0567",
    amount: "৳25,000",
    channel: "Bill Payment",
    score: 68,
    status: "MEDIUM",
    time: "24 min ago",
  },
];

export default function RecentHighRisk() {
  return (
    <div className="high-risk-card">
      {/* Header */}
      <div className="high-risk-header">
        <div>
          <h2>Recent High-Risk Transactions</h2>

          <p>Transactions requiring immediate attention or review.</p>
        </div>

        <button className="view-all-button">View All →</button>
      </div>

      {/* Table */}
      <div className="high-risk-table-wrapper">
        <table className="high-risk-table">
          <thead>
            <tr>
              <th>TXN ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Channel</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                {/* Transaction ID */}
                <td className="transaction-id">{transaction.id}</td>

                {/* Customer */}
                <td className="customer-id">{transaction.customer}</td>

                {/* Amount */}
                <td className="transaction-amount">{transaction.amount}</td>

                {/* Channel */}
                <td className="transaction-channel">{transaction.channel}</td>

                {/* Risk Score */}
                <td>
                  <div className="risk-score-wrapper">
                    <div className="risk-score-bar">
                      <span
                        style={{
                          width: `${transaction.score}%`,
                        }}
                      />
                    </div>

                    <span className="risk-score-value">
                      {transaction.score}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`transaction-status status-${transaction.status.toLowerCase()}`}
                  >
                    {transaction.status}
                  </span>
                </td>

                {/* Time */}
                <td className="transaction-time">{transaction.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
