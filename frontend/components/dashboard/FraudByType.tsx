"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

export default function FraudByType() {
  return (
    <div className="fraud-type-card">
      <div className="fraud-type-header">
        <div>
          <h2>Fraud Alerts by Type</h2>
          <p>Distribution of detected fraud alerts by category.</p>
        </div>
      </div>

      <div className="fraud-type-chart">
        <Plot
          data={[
            {
              type: "bar",

              x: [
                "Account<br>Takeover",
                "Suspicious<br>Transfer",
                "Multiple<br>Accounts",
                "Unusual<br>Location",
              ],

              y: [524, 312, 198, 143],

              text: ["524", "312", "198", "143"],

              textposition: "outside",

              // Increased bar value text
              textfont: {
                color: "#f1f5f9",
                size: 11,
              },

              marker: {
                color: ["#ef476f", "#8b5cf6", "#3b82f6", "#22d3ee"],

                line: {
                  width: 0,
                },
              },

              hovertemplate:
                "<b>%{x}</b><br>" + "Alerts: %{y}" + "<extra></extra>",
            },
          ]}
          layout={{
            autosize: true,

            height: 235,

            margin: {
              l: 35,
              r: 10,
              t: 25,
              b: 45,
            },

            paper_bgcolor: "rgba(0,0,0,0)",

            plot_bgcolor: "rgba(0,0,0,0)",

            bargap: 0.38,

            showlegend: false,

            yaxis: {
              range: [0, 600],

              showgrid: true,

              gridcolor: "#17263a",

              zeroline: false,

              // Increased Y-axis text
              tickfont: {
                color: "#718198",
                size: 10,
              },

              tickvals: [0, 200, 400, 600],

              title: {
                text: "",
              },

              linecolor: "#1b2c42",
            },

            xaxis: {
              showgrid: false,

              zeroline: false,

              // Increased category labels
              tickfont: {
                color: "#718198",
                size: 10,
              },

              linecolor: "#1b2c42",
            },

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
