"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const transactions = [48200, 53100, 49700, 61200, 57400, 68900, 63886];

const suspicious = [142, 176, 151, 213, 194, 238, 217];

export default function TransactionTrend() {
  return (
    <div className="transaction-chart-card">
      {/* Header */}
      <div className="chart-card-header">
        <div>
          <h2>Transaction Activity</h2>

          <p>
            Transaction volume and suspicious activity over the selected period.
          </p>
        </div>

        <select className="chart-filter" defaultValue="7">
          <option value="7">Last 7 Days</option>

          <option value="30">Last 30 Days</option>

          <option value="90">Last 90 Days</option>
        </select>
      </div>

      {/* Chart */}
      <div className="transaction-chart">
        <Plot
          data={[
            /* ==========================================
               TRANSACTIONS
            ========================================== */

            {
              x: days,

              y: transactions,

              type: "scatter",

              mode: "lines+markers",

              name: "Transactions",

              line: {
                shape: "spline",

                width: 2.5,
              },

              marker: {
                size: 6,
              },

              hovertemplate:
                "<b>%{x}</b><br>" + "Transactions: %{y:,}" + "<extra></extra>",

              yaxis: "y",
            },

            /* ==========================================
               SUSPICIOUS TRANSACTIONS
            ========================================== */

            {
              x: days,

              y: suspicious,

              type: "scatter",

              mode: "lines+markers",

              name: "Suspicious",

              line: {
                shape: "spline",

                width: 2.5,

                dash: "dot",
              },

              marker: {
                size: 6,
              },

              hovertemplate:
                "<b>%{x}</b><br>" + "Suspicious: %{y}" + "<extra></extra>",

              yaxis: "y2",
            },
          ]}
          layout={{
            autosize: true,

            margin: {
              l: 55,
              r: 55,
              t: 25,
              b: 40,
            },

            paper_bgcolor: "rgba(0,0,0,0)",

            plot_bgcolor: "rgba(0,0,0,0)",

            font: {
              color: "#718198",

              family: "Arial, sans-serif",

              size: 10,
            },

            /* ==========================================
               LEFT AXIS
            ========================================== */

            yaxis: {
              title: {
                text: "Transactions",

                font: {
                  size: 10,

                  color: "#718198",
                },
              },

              showgrid: true,

              gridcolor: "#152338",

              zeroline: false,

              tickfont: {
                color: "#718198",

                size: 10,
              },

              separatethousands: true,

              linecolor: "#1b2c42",
            },

            /* ==========================================
               RIGHT AXIS
            ========================================== */

            yaxis2: {
              title: {
                text: "Suspicious",

                font: {
                  size: 10,

                  color: "#718198",
                },
              },

              overlaying: "y",

              side: "right",

              showgrid: false,

              zeroline: false,

              tickfont: {
                color: "#718198",

                size: 10,
              },

              linecolor: "#1b2c42",
            },

            /* ==========================================
               X AXIS
            ========================================== */

            xaxis: {
              showgrid: false,

              zeroline: false,

              tickfont: {
                color: "#718198",

                size: 11,
              },

              linecolor: "#1b2c42",
            },

            /* ==========================================
               LEGEND
            ========================================== */

            legend: {
              orientation: "h",

              x: 0,

              y: 1.12,

              xanchor: "left",

              yanchor: "top",

              font: {
                color: "#94a3b8",

                size: 10,
              },

              bgcolor: "rgba(0,0,0,0)",
            },

            /* ==========================================
               HOVER
            ========================================== */

            hoverlabel: {
              bgcolor: "#0c1729",

              bordercolor: "#334155",

              font: {
                color: "#e2e8f0",

                size: 11,
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

            height: "230px",
          }}
        />
      </div>
    </div>
  );
}
