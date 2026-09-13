"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

export default function TransactionsByChannel() {
  return (
    <div className="channel-chart-card">
      <div className="channel-chart-header">
        <div>
          <h2>Transactions by Channel</h2>
          <p>Distribution of transaction activity across channels.</p>
        </div>
      </div>

      <div className="channel-chart">
        <Plot
          data={[
            {
              type: "pie",

              labels: ["P2P", "Cash In", "Cash Out", "Bill Payment", "Others"],

              values: [42, 24, 18, 10, 6],

              hole: 0.62,

              sort: false,

              // Keep the donut inside the left portion
              // of the card so the legend has its own space.
              domain: {
                x: [0.02, 0.6],
                y: [0.1, 0.9],
              },

              textinfo: "percent",

              textposition: "inside",

              // Increased percentage text
              textfont: {
                color: "#e2e8f0",
                size: 11,
              },

              marker: {
                colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#22d3ee", "#94a3b8"],

                line: {
                  color: "#0b1728",
                  width: 2,
                },
              },

              hovertemplate:
                "<b>%{label}</b><br>" +
                "%{value}% of transactions" +
                "<extra></extra>",
            },
          ]}
          layout={{
            autosize: true,

            height: 235,

            margin: {
              l: 0,
              r: 0,
              t: 0,
              b: 0,
            },

            paper_bgcolor: "rgba(0,0,0,0)",

            plot_bgcolor: "rgba(0,0,0,0)",

            showlegend: true,

            legend: {
              orientation: "v",

              x: 0.64,
              y: 0.5,

              xanchor: "left",
              yanchor: "middle",

              // Increased legend text
              font: {
                color: "#94a3b8",
                size: 10,
              },

              bgcolor: "rgba(0,0,0,0)",

              tracegroupgap: 5,
            },

            annotations: [
              {
                text: "<b>392K</b>",

                x: 0.31,
                y: 0.5,

                xref: "paper",
                yref: "paper",

                showarrow: false,

                font: {
                  color: "#f8fafc",
                  size: 18,
                },
              },

              {
                text: "Total",

                x: 0.31,
                y: 0.4,

                xref: "paper",
                yref: "paper",

                showarrow: false,

                // Increased Total text
                font: {
                  color: "#718198",
                  size: 10,
                },
              },
            ],

            hoverlabel: {
              bgcolor: "#0c1729",

              bordercolor: "#334155",

              font: {
                color: "#e2e8f0",
                size: 10,
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
            height: "235px",
          }}
        />
      </div>
    </div>
  );
}
