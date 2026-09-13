"use client";

export default function AIRiskInsights() {
  return (
    <div className="ai-insight-strip">
      <div className="ai-insight-strip-icon">✦</div>

      <div className="ai-insight-strip-label">AI Insight</div>

      <div className="ai-insight-strip-message">
        Suspicious transaction patterns detected in 3 new customer groups.
      </div>

      <button className="ai-insight-investigate">
        Click here to investigate
        <span>→</span>
      </button>

      <div className="ai-insight-system">
        <span className="ai-status-dot" />
        <span>System Online</span>
      </div>

      <div className="ai-insight-time">Sep 10, 2026&nbsp;&nbsp;10:42 AM</div>
    </div>
  );
}
