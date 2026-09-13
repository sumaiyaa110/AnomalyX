"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

const transactions = [
  {
    id: "T-9",
    amount: 3200,
    riskScore: 18,
    riskLevel: "Low",
    time: "09:14",
  },
  {
    id: "T-8",
    amount: 4500,
    riskScore: 21,
    riskLevel: "Low",
    time: "10:32",
  },
  {
    id: "T-7",
    amount: 2800,
    riskScore: 16,
    riskLevel: "Low",
    time: "11:47",
  },
  {
    id: "T-6",
    amount: 6200,
    riskScore: 34,
    riskLevel: "Medium",
    time: "12:18",
  },
  {
    id: "T-5",
    amount: 5100,
    riskScore: 29,
    riskLevel: "Low",
    time: "13:05",
  },
  {
    id: "T-4",
    amount: 8700,
    riskScore: 48,
    riskLevel: "Medium",
    time: "13:42",
  },
  {
    id: "T-3",
    amount: 5100,
    riskScore: 36,
    riskLevel: "Low",
    time: "13:58",
  },
  {
    id: "T-2",
    amount: 9200,
    riskScore: 52,
    riskLevel: "Medium",
    time: "14:05",
  },
  {
    id: "T-1",
    amount: 12800,
    riskScore: 61,
    riskLevel: "High",
    time: "14:17",
  },
  {
    id: "TXN-92831",
    amount: 85000,
    riskScore: 98,
    riskLevel: "Critical",
    time: "14:32",
  },
];

const currentTransaction = transactions[transactions.length - 1];

const historicalTransactions = transactions.slice(0, -1);

const historicalAverage =
  historicalTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  ) / historicalTransactions.length;

const increase = currentTransaction.amount / historicalAverage;

const transactionIds = transactions.map((transaction) => transaction.id);

const amounts = transactions.map((transaction) => transaction.amount);

const riskColors = transactions.map((transaction) => {
  switch (transaction.riskLevel) {
    case "Critical":
      return "#ef4444";

    case "High":
      return "#f97316";

    case "Medium":
      return "#eab308";

    default:
      return "#22c55e";
  }
});

export default function TransactionBehaviorChart() {
  return (
    <div className="transaction-behavior-card">
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="transaction-behavior-header">
        <div>
          <h2>Transaction Behavior</h2>

          <p>Recent transactions for this customer</p>
        </div>

        <button className="transaction-history-filter">
          Last 10 Transactions
          <span>⌄</span>
        </button>
      </div>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="transaction-behavior-content">
        {/* ===================================================
            LEFT — TRANSACTION GRAPH
            =================================================== */}

        <div className="transaction-behavior-chart">
          <Plot
            data={[
              {
                x: transactionIds,
                y: amounts,
                type: "scatter",
                mode: "lines+markers",
                name: "Transaction Amount",

                line: {
                  color: "#3b82f6",
                  width: 2.5,
                },

                marker: {
                  size: 8,
                  color: riskColors,
                  line: {
                    color: "#0b1728",
                    width: 2,
                  },
                },

                hovertemplate:
                  "<b>%{x}</b><br>" +
                  "Amount: ৳%{y:,.0f}<br>" +
                  "<extra></extra>",
              },

              {
                x: transactionIds,
                y: transactionIds.map(() => historicalAverage),
                type: "scatter",
                mode: "lines",
                name: "Historical Average",

                line: {
                  color: "#64748b",
                  width: 2,
                  dash: "dash",
                },

                hovertemplate:
                  "Historical Average: ৳%{y:,.0f}" + "<extra></extra>",
              },

              {
                x: ["TXN-92831"],
                y: [currentTransaction.amount],
                type: "scatter",
                mode: "markers",
                name: "Current",

                marker: {
                  color: "#ef4444",
                  size: 15,

                  line: {
                    color: "#f8fafc",
                    width: 2,
                  },
                },

                hovertemplate:
                  "<b>TXN-92831</b><br>" +
                  "Amount: ৳85,000<br>" +
                  "Risk Score: 98<br>" +
                  "Risk Level: Critical" +
                  "<extra></extra>",
              },
            ]}
            layout={{
              autosize: true,

              height: 300,

              margin: {
                l: 60,
                r: 15,
                t: 30,
                b: 50,
              },

              paper_bgcolor: "rgba(0,0,0,0)",
              plot_bgcolor: "rgba(0,0,0,0)",

              font: {
                family: "Inter, Arial, sans-serif",
                color: "#718198",
                size: 10,
              },

              xaxis: {
                title: {
                  text: "Transactions (Oldest → Newest)",
                  font: {
                    color: "#718198",
                    size: 10,
                  },
                },

                tickfont: {
                  color: "#718198",
                  size: 9,
                },

                showgrid: false,

                zeroline: false,

                linecolor: "#17273b",

                fixedrange: true,
              },

              yaxis: {
                title: {
                  text: "Amount (BDT)",
                  font: {
                    color: "#718198",
                    size: 10,
                  },
                },

                type: "log",

                tickvals: [3000, 5000, 10000, 20000, 50000, 100000],

                ticktext: ["৳3k", "৳5k", "৳10k", "৳20k", "৳50k", "৳100k"],

                tickfont: {
                  color: "#718198",
                  size: 9,
                },

                gridcolor: "#17273b",
                gridwidth: 1,

                minor: {
                  showgrid: false,
                },

                zeroline: false,
                fixedrange: true,
              },

              legend: {
                orientation: "h",

                x: 0,

                y: 1.12,

                xanchor: "left",

                yanchor: "top",

                font: {
                  color: "#718198",
                  size: 10,
                },

                bgcolor: "rgba(0,0,0,0)",
              },

              annotations: [
                {
                  x: "TXN-92831",
                  y: currentTransaction.amount,

                  xref: "x",
                  yref: "y",

                  text: "<b>TXN-92831</b><br>Amount: ৳85,000<br>Risk Score: 98<br>Risk Level: Critical",

                  showarrow: true,

                  arrowhead: 2,

                  arrowsize: 0.7,

                  arrowwidth: 1,

                  arrowcolor: "#ef4444",

                  ax: -55,

                  ay: 45,

                  bgcolor: "#101d30",

                  bordercolor: "#ef4444",

                  borderwidth: 1,

                  borderpad: 6,

                  font: {
                    color: "#dbe4ef",
                    size: 9,
                  },

                  align: "left",
                },
              ],

              hoverlabel: {
                bgcolor: "#0c1729",

                bordercolor: "#334155",

                font: {
                  color: "#e2e8f0",
                  size: 9,
                },
              },
            }}
            config={{
              responsive: true,
              displayModeBar: false,
              displaylogo: false,
            }}
            style={{
              width: "100%",
              height: "285px",
            }}
          />
        </div>

        {/* ===================================================
            RIGHT — ACCOUNT RISK SUMMARY
            =================================================== */}

        <div className="account-risk-summary">
          {/* Summary Header */}

          <div className="account-risk-header">
            <div className="account-risk-icon">
              <span>●</span>
            </div>

            <div>
              <h3>Account Risk Summary</h3>

              <p>
                This transaction is significantly higher than the customer's
                typical activity.
              </p>
            </div>
          </div>

          {/* Summary Metrics */}

          <div className="account-risk-metrics">
            <div className="account-risk-metric">
              <span>Typical Amount (Avg)</span>

              <strong>
                ৳
                {historicalAverage.toLocaleString("en-BD", {
                  maximumFractionDigits: 0,
                })}
              </strong>
            </div>

            <div className="account-risk-metric">
              <span>Current Amount</span>

              <strong>
                ৳{currentTransaction.amount.toLocaleString("en-BD")}
              </strong>
            </div>

            <div className="account-risk-metric">
              <span>Increase</span>

              <strong className="risk-increase">{Math.round(increase)}×</strong>
            </div>

            <div className="account-risk-metric">
              <span>Risk Score</span>

              <strong>{currentTransaction.riskScore} / 100</strong>
            </div>

            <div className="account-risk-metric">
              <span>Risk Level</span>

              <strong className="risk-level-critical">Critical</strong>
            </div>
          </div>

          {/* AI Insight */}

          <div className="account-risk-insight">
            <div className="account-risk-insight-icon">💡</div>

            <div>
              <strong>AI Insight</strong>

              <p>
                This transaction amount is {Math.round(increase)}× higher than
                the customer's historical average.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
