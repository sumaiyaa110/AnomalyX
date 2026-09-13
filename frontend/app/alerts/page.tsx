"use client";

import { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";

type AlertStatus = "Pending" | "Investigating" | "Resolved";

type Alert = {
  id: string;
  type: string;
  description: string;
  icon: string;
  risk: "Critical" | "High" | "Medium";
  transaction: string;
  customer: string;
  detected: string;
  status: AlertStatus;
};

const initialAlerts: Alert[] = [
  {
    id: "ALT-001",
    type: "Unusual Amount",
    description: "Amount anomaly detected",
    icon: "⚠",
    risk: "Critical",
    transaction: "TXN-92831",
    customer: "CUST-44521",
    detected: "2 min ago",
    status: "Pending",
  },
  {
    id: "ALT-002",
    type: "Device Anomaly",
    description: "Multiple accounts detected",
    icon: "◉",
    risk: "High",
    transaction: "TXN-92784",
    customer: "CUST-11234",
    detected: "8 min ago",
    status: "Investigating",
  },
  {
    id: "ALT-003",
    type: "Velocity Anomaly",
    description: "Rapid transaction activity",
    icon: "↗",
    risk: "High",
    transaction: "TXN-92691",
    customer: "CUST-77821",
    detected: "14 min ago",
    status: "Pending",
  },
  {
    id: "ALT-004",
    type: "Unusual Pattern",
    description: "Behavior deviation detected",
    icon: "◇",
    risk: "Medium",
    transaction: "TXN-92577",
    customer: "CUST-33412",
    detected: "21 min ago",
    status: "Resolved",
  },
  {
    id: "ALT-005",
    type: "Multiple Accounts",
    description: "Shared device activity",
    icon: "◉",
    risk: "Medium",
    transaction: "TXN-92463",
    customer: "CUST-98123",
    detected: "35 min ago",
    status: "Investigating",
  },
];

export default function FraudAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const [search, setSearch] = useState("");

  const [riskFilter, setRiskFilter] = useState("All Risk Levels");

  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // =========================================================
  // DATE PICKER
  // =========================================================

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [startDate, setStartDate] = useState("2026-09-04");

  const [endDate, setEndDate] = useState("2026-09-10");

  const formatDate = (date: string) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================================================
  // FILTER ALERTS
  // =========================================================

  const filteredAlerts = alerts.filter((alert) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      searchValue === "" ||
      alert.id.toLowerCase().includes(searchValue) ||
      alert.type.toLowerCase().includes(searchValue) ||
      alert.transaction.toLowerCase().includes(searchValue) ||
      alert.customer.toLowerCase().includes(searchValue);

    const matchesRisk =
      riskFilter === "All Risk Levels" || alert.risk === riskFilter;

    const matchesStatus =
      statusFilter === "All Statuses" || alert.status === statusFilter;

    return matchesSearch && matchesRisk && matchesStatus;
  });

  // =========================================================
  // MARK ALERT AS RESOLVED
  // =========================================================

  const markAsResolved = (alertId: string) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: "Resolved",
            }
          : alert,
      ),
    );

    setOpenMenu(null);
  };

  return (
    <AdminLayout>
      <div className="fraud-alerts-page">
        {/* =====================================================
            PAGE HEADER
            ===================================================== */}

        <div className="fraud-alerts-page-header">
          <div>
            <h1>Fraud Alerts</h1>

            <p>Potentially fraudulent activities detected by our AI models.</p>
          </div>

          {/* =====================================================
              DATE FILTER
              ===================================================== */}

          <div className="fraud-alert-date-picker">
            <button
              type="button"
              className="fraud-alerts-date-filter"
              onClick={() => setIsDatePickerOpen((current) => !current)}
            >
              <span className="date-filter-icon">□</span>

              <span>
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>

              <span className="date-filter-arrow">⌄</span>
            </button>

            {/* =================================================
                DATE DROPDOWN
                ================================================= */}

            {isDatePickerOpen && (
              <div className="fraud-alert-date-dropdown">
                <div className="date-dropdown-title">
                  <strong>Select Date Range</strong>

                  <span>Choose the period you want to review.</span>
                </div>

                {/* DATE FIELDS */}

                <div className="date-dropdown-fields">
                  <div className="date-dropdown-field">
                    <label htmlFor="start-date">From</label>

                    <input
                      id="start-date"
                      type="date"
                      value={startDate}
                      max={endDate}
                      onChange={(event) => setStartDate(event.target.value)}
                    />
                  </div>

                  <div className="date-dropdown-field">
                    <label htmlFor="end-date">To</label>

                    <input
                      id="end-date"
                      type="date"
                      value={endDate}
                      min={startDate}
                      onChange={(event) => setEndDate(event.target.value)}
                    />
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="date-dropdown-actions">
                  <button
                    type="button"
                    className="date-dropdown-cancel"
                    onClick={() => setIsDatePickerOpen(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="date-dropdown-apply"
                    onClick={() => setIsDatePickerOpen(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            ALERT SUMMARY
            ===================================================== */}

        <div className="fraud-alert-summary">
          {/* TOTAL ALERTS */}

          <div className="fraud-alert-summary-card">
            <div className="fraud-alert-summary-top">
              <span>Total Alerts</span>

              <div className="fraud-alert-summary-icon blue">◉</div>
            </div>

            <strong>1,177</strong>

            <div className="fraud-alert-summary-bottom">
              <span className="summary-positive">↗ 5.8%</span>

              <span>vs previous period</span>
            </div>
          </div>

          {/* CRITICAL */}

          <div className="fraud-alert-summary-card critical">
            <div className="fraud-alert-summary-top">
              <span>Critical</span>

              <div className="fraud-alert-summary-icon red">!</div>
            </div>

            <strong>42</strong>

            <div className="fraud-alert-summary-bottom">
              <span className="summary-negative">↗ 8.2%</span>

              <span>vs previous period</span>
            </div>
          </div>

          {/* HIGH RISK */}

          <div className="fraud-alert-summary-card high">
            <div className="fraud-alert-summary-top">
              <span>High Risk</span>

              <div className="fraud-alert-summary-icon orange">▲</div>
            </div>

            <strong>186</strong>

            <div className="fraud-alert-summary-bottom">
              <span className="summary-negative">↗ 4.1%</span>

              <span>vs previous period</span>
            </div>
          </div>

          {/* PENDING REVIEW */}

          <div className="fraud-alert-summary-card pending">
            <div className="fraud-alert-summary-top">
              <span>Pending Review</span>

              <div className="fraud-alert-summary-icon yellow">◷</div>
            </div>

            <strong>328</strong>

            <div className="fraud-alert-summary-bottom">
              <span className="summary-neutral">27 new</span>

              <span>today</span>
            </div>
          </div>
        </div>

        {/* =====================================================
            ALERT FILTERS
            ===================================================== */}

        <div className="fraud-alert-filters">
          {/* SEARCH */}

          <div className="fraud-alert-search">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search alert, transaction or customer..."
            />
          </div>

          {/* RISK FILTER */}

          <select
            className="fraud-alert-select"
            value={riskFilter}
            onChange={(event) => setRiskFilter(event.target.value)}
          >
            <option>All Risk Levels</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
          </select>

          {/* STATUS FILTER */}

          <select
            className="fraud-alert-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Investigating</option>
            <option>Resolved</option>
          </select>
        </div>

        {/* =====================================================
            ALERTS TABLE
            ===================================================== */}

        <div className="fraud-alert-table-card">
          {/* TABLE HEADER */}

          <div className="fraud-alert-table-header">
            <div>
              <h2>Recent Fraud Alerts</h2>

              <p>
                Review and investigate alerts detected by the monitoring system.
              </p>
            </div>

            <span className="fraud-alert-count">
              {filteredAlerts.length} shown
            </span>
          </div>

          {/* TABLE */}

          <div className="fraud-alert-table-wrapper">
            <table className="fraud-alert-table">
              <thead>
                <tr>
                  <th>ALERT</th>
                  <th>RISK</th>
                  <th>TRANSACTION</th>
                  <th>CUSTOMER</th>
                  <th>DETECTED</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="fraud-alert-empty">
                      No alerts found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredAlerts.map((alert) => (
                    <tr key={alert.id}>
                      {/* =========================================
                          ALERT
                          ========================================= */}

                      <td>
                        <div className="alert-name">
                          <span
                            className={`alert-type-icon ${
                              alert.risk === "Critical"
                                ? "critical"
                                : alert.risk === "High"
                                  ? "high"
                                  : "medium"
                            }`}
                          >
                            {alert.icon}
                          </span>

                          <div>
                            <strong>{alert.type}</strong>

                            <span>{alert.description}</span>
                          </div>
                        </div>
                      </td>

                      {/* =========================================
                          RISK
                          ========================================= */}

                      <td>
                        <span
                          className={`alert-risk ${alert.risk.toLowerCase()}`}
                        >
                          {alert.risk}
                        </span>
                      </td>

                      {/* =========================================
                          TRANSACTION
                          ========================================= */}

                      <td>
                        <Link
                          href={`/transactions/${alert.transaction}`}
                          className="alert-transaction"
                        >
                          {alert.transaction}
                        </Link>
                      </td>

                      {/* =========================================
                          CUSTOMER
                          ========================================= */}

                      <td>
                        <Link
                          href={`/customers?search=${alert.customer}`}
                          className="alert-customer"
                        >
                          {alert.customer}
                        </Link>
                      </td>

                      {/* =========================================
                          DETECTED
                          ========================================= */}

                      <td>
                        <span className="alert-time">{alert.detected}</span>
                      </td>

                      {/* =========================================
                          STATUS
                          ========================================= */}

                      <td>
                        <span
                          className={`alert-status ${
                            alert.status === "Pending"
                              ? "pending"
                              : alert.status === "Investigating"
                                ? "investigating"
                                : "resolved"
                          }`}
                        >
                          {alert.status}
                        </span>
                      </td>

                      {/* =========================================
                          ACTION
                          ========================================= */}

                      <td>
                        <div className="alert-action-wrapper">
                          <button
                            className="alert-action-button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === alert.id ? null : alert.id,
                              )
                            }
                            aria-label={`Actions for ${alert.id}`}
                          >
                            ⋯
                          </button>

                          {openMenu === alert.id && (
                            <div className="alert-action-menu">
                              {/* VIEW TRANSACTION */}

                              <Link
                                href={`/transactions/${alert.transaction}`}
                                className="alert-action-menu-item"
                                onClick={() => setOpenMenu(null)}
                              >
                                <span>↗</span>
                                View Transaction
                              </Link>

                              {/* VIEW CUSTOMER */}

                              <Link
                                href={`/customers?search=${alert.customer}`}
                                className="alert-action-menu-item"
                                onClick={() => setOpenMenu(null)}
                              >
                                <span>○</span>
                                View Customer
                              </Link>

                              {/* INVESTIGATE ALERT */}

                              <Link
                                href={`/investigations?alert=${alert.id}`}
                                className="alert-action-menu-item"
                                onClick={() => setOpenMenu(null)}
                              >
                                <span>⌕</span>
                                Investigate Alert
                              </Link>

                              <div className="alert-action-menu-divider" />

                              {/* RESOLVE */}

                              <button
                                className="alert-action-menu-item resolve"
                                onClick={() => markAsResolved(alert.id)}
                                disabled={alert.status === "Resolved"}
                              >
                                <span>✓</span>

                                {alert.status === "Resolved"
                                  ? "Already Resolved"
                                  : "Mark as Resolved"}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* =====================================================
              PAGINATION
              ===================================================== */}

          <div className="fraud-alert-pagination">
            <span className="fraud-alert-pagination-info">
              Showing{" "}
              <strong>
                {filteredAlerts.length > 0 ? `1–${filteredAlerts.length}` : "0"}
              </strong>{" "}
              of <strong>1,177</strong> alerts
            </span>

            <div className="fraud-alert-pagination-controls">
              <button
                className="fraud-pagination-button pagination-arrow"
                disabled
              >
                ←
              </button>

              <button className="fraud-pagination-button active">1</button>

              <button className="fraud-pagination-button">2</button>

              <button className="fraud-pagination-button">3</button>

              <span className="fraud-pagination-dots">...</span>

              <button className="fraud-pagination-button">236</button>

              <button className="fraud-pagination-button pagination-arrow">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
