import AdminLayout from "@/components/layout/AdminLayout";
import KPICard from "@/components/dashboard/KPICard";
import TransactionTrend from "@/components/dashboard/TransactionTrend";
import TransactionsByChannel from "@/components/dashboard/TransactionsByChannel";
import FraudByType from "@/components/dashboard/FraudByType";
import RecentHighRisk from "@/components/dashboard/RecentHighRisk";
import AIRiskInsights from "@/components/dashboard/AIRiskInsights";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="dashboard-page">
        {/* Dashboard Header */}
        <div className="dashboard-title">
          <div>
            <h1>Dashboard</h1>
            <p>Real-time overview of your financial monitoring system.</p>
          </div>

          <div className="dashboard-date">September 10, 2026</div>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <KPICard
            title="Total Transactions"
            value="392,386"
            change="12.4%"
            description="vs previous period"
            icon="↗"
            trend="up"
            variant="blue"
          />

          <KPICard
            title="Fraud Alerts"
            value="1,177"
            change="5.8%"
            description="vs previous period"
            icon="⚠"
            trend="up"
            variant="red"
          />

          <KPICard
            title="High Risk Entities"
            value="423"
            change="3.1%"
            description="vs previous period"
            icon="!"
            trend="up"
            variant="yellow"
          />

          <KPICard
            title="Fraud Rate"
            value="0.30%"
            change="0.2%"
            description="vs previous period"
            icon="◉"
            trend="down"
            variant="green"
          />
        </div>

        {/* Analytics Row */}
        <div className="dashboard-analytics-grid">
          <div className="dashboard-main-chart">
            <TransactionTrend />
          </div>

          <div className="dashboard-side-chart">
            <TransactionsByChannel />
          </div>
        </div>

        {/* Investigation Row */}
        <div className="dashboard-investigation-grid">
          <div className="dashboard-main-table">
            <RecentHighRisk />
          </div>

          <div className="dashboard-side-chart">
            <FraudByType />
          </div>
        </div>

        {/* AI Insights */}
        <AIRiskInsights />
      </div>
    </AdminLayout>
  );
}
