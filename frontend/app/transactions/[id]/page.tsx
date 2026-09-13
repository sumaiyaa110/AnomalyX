"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import AdminLayout from "@/components/layout/AdminLayout";
import TransactionBehaviorChart from "@/components/transactions/TransactionBehaviorChart";

const transactionData: Record<
  string,
  {
    id: string;
    type: string;
    amount: string;
    score: number;
    level: string;
    status: string;
    customer: string;
    device: string;
    time: string;
    date: string;
    location: string;
  }
> = {
  "TXN-92831": {
    id: "TXN-92831",
    type: "Cash Out",
    amount: "৳85,000",
    score: 98,
    level: "Critical",
    status: "Investigate",
    customer: "CUST-44521",
    device: "DEV-77891",
    time: "14:32:18",
    date: "September 10, 2026",
    location: "Dhaka",
  },

  "TXN-92784": {
    id: "TXN-92784",
    type: "Transfer",
    amount: "৳42,500",
    score: 94,
    level: "High",
    status: "Review",
    customer: "CUST-11234",
    device: "DEV-66543",
    time: "14:29:47",
    date: "September 10, 2026",
    location: "Chattogram",
  },

  "TXN-92691": {
    id: "TXN-92691",
    type: "Cash Out",
    amount: "৳31,200",
    score: 91,
    level: "High",
    status: "Review",
    customer: "CUST-77821",
    device: "DEV-99211",
    time: "14:24:31",
    date: "September 10, 2026",
    location: "Dhaka",
  },

  "TXN-92577": {
    id: "TXN-92577",
    type: "Payment",
    amount: "৳18,750",
    score: 87,
    level: "High",
    status: "Review",
    customer: "CUST-33412",
    device: "DEV-44321",
    time: "14:21:09",
    date: "September 10, 2026",
    location: "Sylhet",
  },

  "TXN-92463": {
    id: "TXN-92463",
    type: "Transfer",
    amount: "৳12,400",
    score: 84,
    level: "High",
    status: "Monitoring",
    customer: "CUST-98123",
    device: "DEV-77122",
    time: "14:17:52",
    date: "September 10, 2026",
    location: "Dhaka",
  },
};

export default function TransactionDetailsPage() {
  const params = useParams();

  const transactionId = params.id as string;

  const transaction =
    transactionData[transactionId] ?? transactionData["TXN-92831"];

  /* =====================================================
     ACTION STATE
     ===================================================== */

  const [currentStatus, setCurrentStatus] = useState(transaction.status);

  const [actionStatus, setActionStatus] = useState("");

  /* =====================================================
     ACTION HANDLER
     ===================================================== */

  const handleAction = (message: string, status: string) => {
    setCurrentStatus(status);
    setActionStatus(message);

    setTimeout(() => {
      setActionStatus("");
    }, 3000);
  };

  /* =====================================================
     STATUS MESSAGE
     ===================================================== */

  const statusMessage =
    currentStatus === "Reviewed"
      ? "Transaction has been reviewed."
      : currentStatus === "Escalated"
        ? "Investigation has been escalated."
        : currentStatus === "Blocked"
          ? "Transaction has been blocked."
          : "Immediate admin attention recommended.";

  return (
    <AdminLayout>
      <div className="transaction-details-page">
        {/* =====================================================
            BACK TO TRANSACTIONS
            ===================================================== */}

        <Link href="/transactions" className="transaction-back-button">
          ← Back to Transactions
        </Link>

        {/* =====================================================
            PAGE HEADER
            ===================================================== */}

        <div className="transaction-details-header">
          <div>
            <div className="transaction-details-id-row">
              <h1>{transaction.id}</h1>

              <span
                className={`transaction-details-level ${transaction.level.toLowerCase()}`}
              >
                {transaction.level}
              </span>
            </div>

            <p>Detailed transaction risk assessment and investigation.</p>
          </div>

          <div className="transaction-details-actions">
            <button
              className="transaction-secondary-button"
              onClick={() =>
                handleAction("Transaction marked as reviewed", "Reviewed")
              }
            >
              Mark as Reviewed
            </button>

            <button
              className="transaction-primary-button"
              onClick={() =>
                handleAction(
                  "Investigation escalated successfully",
                  "Escalated",
                )
              }
            >
              Escalate Case
            </button>
          </div>
        </div>

        {/* =====================================================
            RISK OVERVIEW
            ===================================================== */}

        <div className="transaction-risk-overview">
          {/* Risk Score */}

          <div className="transaction-risk-main">
            <div className="transaction-risk-heading">
              <div>
                <span>RISK SCORE</span>

                <h2>
                  {transaction.score}
                  <small>/100</small>
                </h2>
              </div>

              <div className="transaction-risk-circle">{transaction.score}</div>
            </div>

            <div className="transaction-large-risk-bar">
              <span
                style={{
                  width: `${transaction.score}%`,
                }}
              />
            </div>

            <div className="transaction-risk-footer">
              <span>Model Risk Assessment</span>

              <strong>Very High Risk</strong>
            </div>
          </div>

          {/* Current Status */}

          <div className="transaction-risk-status">
            <div className="risk-status-icon">⚠</div>

            <div>
              <span>Current Status</span>

              <h3>{currentStatus}</h3>

              <p>{statusMessage}</p>
            </div>
          </div>
        </div>

        {/* =====================================================
            TRANSACTION + CUSTOMER
            ===================================================== */}

        <div className="transaction-details-grid">
          {/* Transaction Details */}

          <div className="transaction-info-card">
            <div className="transaction-info-header">
              <h2>Transaction Details</h2>

              <span>TRANSACTION</span>
            </div>

            <div className="transaction-info-grid">
              <div>
                <label>Transaction ID</label>

                <strong>{transaction.id}</strong>
              </div>

              <div>
                <label>Transaction Type</label>

                <strong>{transaction.type}</strong>
              </div>

              <div>
                <label>Amount</label>

                <strong className="detail-amount">{transaction.amount}</strong>
              </div>

              <div>
                <label>Transaction Time</label>

                <strong>{transaction.time}</strong>
              </div>

              <div>
                <label>Date</label>

                <strong>{transaction.date}</strong>
              </div>

              <div>
                <label>Location</label>

                <strong>{transaction.location}</strong>
              </div>
            </div>
          </div>

          {/* Customer Information */}

          <div className="transaction-info-card">
            <div className="transaction-info-header">
              <h2>Customer Information</h2>

              <span>CUSTOMER</span>
            </div>

            <div className="entity-profile">
              <div className="entity-avatar">C</div>

              <div>
                <strong>{transaction.customer}</strong>

                <span>Customer Account</span>
              </div>
            </div>

            <div className="entity-details">
              <div>
                <label>Customer ID</label>

                <strong>{transaction.customer}</strong>
              </div>

              <div>
                <label>Account Status</label>

                <strong className="status-active">Active</strong>
              </div>
            </div>

            <Link
              href={`/customers/${transaction.customer}`}
              className="entity-view-link"
            >
              View Customer →
            </Link>
          </div>
        </div>

        {/* =====================================================
            DEVICE INFORMATION
            ===================================================== */}

        <div className="transaction-info-card transaction-device-card">
          <div className="transaction-info-header">
            <div>
              <h2>Device Information</h2>

              <p>Device associated with this transaction.</p>
            </div>

            <span>DEVICE</span>
          </div>

          <div className="device-detail-layout">
            <div className="device-icon">◉</div>

            <div className="device-main-info">
              <strong>{transaction.device}</strong>

              <span>Registered transaction device</span>
            </div>

            <div className="device-stat">
              <label>Device Risk</label>

              <strong className="device-risk-high">High</strong>
            </div>

            <div className="device-stat">
              <label>Associated Accounts</label>

              <strong>4</strong>
            </div>

            <div className="device-stat">
              <label>Recent Activity</label>

              <strong>23 Transactions</strong>
            </div>
          </div>
        </div>

        {/* =====================================================
            TRANSACTION BEHAVIOR / ANOMALY CHART
            ===================================================== */}

        <TransactionBehaviorChart />

        {/* =====================================================
            AI RISK EXPLANATION
            ===================================================== */}

        <div className="transaction-ai-card">
          {/* AI HEADER */}

          <div className="transaction-ai-header">
            <div className="transaction-ai-title">
              <div className="transaction-ai-icon">✦</div>

              <div>
                <h2>AI Risk Explanation</h2>

                <p>Explainable signals contributing to the risk score.</p>
              </div>
            </div>

            <div className="transaction-ai-status">
              <span></span>
              Model Active
            </div>
          </div>

          {/* AI SIGNALS */}

          <div className="transaction-ai-grid">
            {/* Signal 1 */}

            <div className="transaction-ai-item critical">
              <div className="transaction-ai-item-icon">⚠</div>

              <div className="transaction-ai-item-content">
                <h3>Unusual Transaction Pattern</h3>

                <p>
                  Transaction amount is significantly higher than the customer's
                  historical average.
                </p>
              </div>

              <span className="transaction-ai-impact">High Impact</span>
            </div>

            {/* Signal 2 */}

            <div className="transaction-ai-item">
              <div className="transaction-ai-item-icon">◉</div>

              <div className="transaction-ai-item-content">
                <h3>Device Anomaly</h3>

                <p>
                  The device has recently been associated with multiple customer
                  accounts.
                </p>
              </div>

              <span className="transaction-ai-impact">Medium Impact</span>
            </div>

            {/* Signal 3 */}

            <div className="transaction-ai-item">
              <div className="transaction-ai-item-icon">↗</div>

              <div className="transaction-ai-item-content">
                <h3>Velocity Anomaly</h3>

                <p>
                  Multiple transactions were detected within an unusually short
                  time window.
                </p>
              </div>

              <span className="transaction-ai-impact">High Impact</span>
            </div>
          </div>

          {/* MODEL CONFIDENCE */}

          <div className="transaction-ai-confidence">
            <div className="transaction-ai-confidence-label">
              <span>Model Confidence</span>

              <strong>94.7%</strong>
            </div>

            <div className="transaction-ai-confidence-bar">
              <div
                style={{
                  width: "94.7%",
                }}
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            INVESTIGATION ACTIONS
            ===================================================== */}

        <div className="transaction-investigation-card">
          <div className="investigation-content">
            <div>
              <h2>Investigation Actions</h2>

              <p>
                Take action on this transaction based on the risk assessment.
              </p>
            </div>

            {/* Action confirmation */}

            {actionStatus && (
              <div className="investigation-success">✓ {actionStatus}</div>
            )}
          </div>

          <div className="investigation-buttons">
            <button
              className="investigation-review"
              onClick={() =>
                handleAction("Transaction marked as reviewed", "Reviewed")
              }
            >
              ✓ Mark Reviewed
            </button>

            <button
              className="investigation-escalate"
              onClick={() =>
                handleAction(
                  "Investigation escalated successfully",
                  "Escalated",
                )
              }
            >
              ⚠ Escalate Investigation
            </button>

            <button
              className="investigation-block"
              onClick={() =>
                handleAction("Transaction has been blocked", "Blocked")
              }
            >
              Block Transaction
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
