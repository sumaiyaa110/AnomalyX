"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import TransactionSummary from "@/components/transactions/TransactionSummary";

const transactions = [
  {
    id: "TXN-92831",
    type: "Cash Out",
    amount: "৳85,000",
    score: 98,
    level: "Critical",
    status: "Investigate",
    customer: "CUST-44521",
    device: "DEV-77891",
    time: "14:32:18",
  },
  {
    id: "TXN-92784",
    type: "Transfer",
    amount: "৳42,500",
    score: 94,
    level: "High",
    status: "Review",
    customer: "CUST-11234",
    device: "DEV-66543",
    time: "14:29:47",
  },
  {
    id: "TXN-92691",
    type: "Cash Out",
    amount: "৳31,200",
    score: 91,
    level: "High",
    status: "Review",
    customer: "CUST-77821",
    device: "DEV-99211",
    time: "14:24:31",
  },
  {
    id: "TXN-92577",
    type: "Payment",
    amount: "৳18,750",
    score: 87,
    level: "High",
    status: "Review",
    customer: "CUST-33412",
    device: "DEV-44321",
    time: "14:21:09",
  },
  {
    id: "TXN-92463",
    type: "Transfer",
    amount: "৳12,400",
    score: 84,
    level: "High",
    status: "Monitoring",
    customer: "CUST-98123",
    device: "DEV-77122",
    time: "14:17:52",
  },
  {
    id: "TXN-92318",
    type: "Cash In",
    amount: "৳9,800",
    score: 72,
    level: "Medium",
    status: "Monitoring",
    customer: "CUST-66543",
    device: "DEV-33411",
    time: "14:12:36",
  },
  {
    id: "TXN-92211",
    type: "Payment",
    amount: "৳4,250",
    score: 68,
    level: "Medium",
    status: "Monitoring",
    customer: "CUST-22345",
    device: "DEV-88776",
    time: "14:08:14",
  },
  {
    id: "TXN-92109",
    type: "Transfer",
    amount: "৳2,100",
    score: 41,
    level: "Low",
    status: "Normal",
    customer: "CUST-99871",
    device: "DEV-10022",
    time: "14:02:58",
  },
  {
    id: "TXN-92088",
    type: "Payment",
    amount: "৳1,850",
    score: 36,
    level: "Low",
    status: "Normal",
    customer: "CUST-44321",
    device: "DEV-55110",
    time: "13:58:21",
  },
  {
    id: "TXN-91922",
    type: "Cash Out",
    amount: "৳950",
    score: 28,
    level: "Low",
    status: "Normal",
    customer: "CUST-77654",
    device: "DEV-33221",
    time: "13:51:09",
  },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [riskLevel, setRiskLevel] = useState("all");
  const [transactionType, setTransactionType] = useState("all");
  const [dateRange, setDateRange] = useState("7");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  /*
   * =========================================================
   * FILTER TRANSACTIONS
   * =========================================================
   */

  const filteredTransactions = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return transactions.filter((transaction) => {
      const matchesSearch =
        searchValue === "" ||
        transaction.id.toLowerCase().includes(searchValue) ||
        transaction.customer.toLowerCase().includes(searchValue) ||
        transaction.device.toLowerCase().includes(searchValue);

      const matchesRisk =
        riskLevel === "all" || transaction.level.toLowerCase() === riskLevel;

      const matchesType =
        transactionType === "all" ||
        transaction.type.toLowerCase().replace(" ", "-") === transactionType;

      return matchesSearch && matchesRisk && matchesType;
    });
  }, [search, riskLevel, transactionType]);

  /*
   * =========================================================
   * PAGINATION
   * =========================================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / rowsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * rowsPerPage;

  const visibleTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  /*
   * =========================================================
   * RESET PAGE WHEN FILTER CHANGES
   * =========================================================
   */

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleRiskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRiskLevel(event.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(event.target.value);
    setCurrentPage(1);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value);
    setCurrentPage(1);
  };

  return (
    <AdminLayout>
      <div className="transactions-page">
        {/* =====================================================
            PAGE HEADER
            ===================================================== */}

        <div className="transactions-page-header">
          <div>
            <h1>Transactions</h1>

            <p>
              Monitor and investigate transaction activity across the platform.
            </p>
          </div>

          <button className="transactions-export-button">
            ↓ &nbsp; Export Data
          </button>
        </div>

        {/* =====================================================
            FILTERS
            ===================================================== */}

        <div className="transactions-filter-card">
          <div className="transactions-search">
            <span>⌕</span>

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search transaction ID, customer, device..."
            />
          </div>

          <select value={riskLevel} onChange={handleRiskChange}>
            <option value="all">All Risk Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select value={transactionType} onChange={handleTypeChange}>
            <option value="all">All Types</option>
            <option value="cash-out">Cash Out</option>
            <option value="transfer">Transfer</option>
            <option value="payment">Payment</option>
            <option value="cash-in">Cash In</option>
          </select>

          <select value={dateRange} onChange={handleDateChange}>
            <option value="1">Today</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>

        {/* =====================================================
            TRANSACTION SUMMARY
            ===================================================== */}

        <TransactionSummary />

        {/* =====================================================
            TRANSACTION TABLE
            ===================================================== */}

        <div className="transactions-table-card">
          <div className="transactions-table-header">
            <div>
              <h2>Transaction Records</h2>

              <p>Recent transaction activity and risk assessments.</p>
            </div>

            <span className="transaction-count">
              {filteredTransactions.length} Results
            </span>
          </div>

          {/* ===================================================
              TABLE
              =================================================== */}

          <div className="transactions-table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input type="checkbox" />
                  </th>

                  <th>Transaction ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Risk Score</th>
                  <th>Risk Level</th>
                  <th>Status</th>
                  <th>Customer ID</th>
                  <th>Device ID</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleTransactions.length > 0 ? (
                  visibleTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="checkbox-column">
                        <input type="checkbox" />
                      </td>

                      <td className="transaction-id">{transaction.id}</td>

                      <td>{transaction.type}</td>

                      <td className="transaction-amount">
                        {transaction.amount}
                      </td>

                      {/* Risk Score */}

                      <td>
                        <div className="transaction-risk">
                          <div className="transaction-risk-bar">
                            <span
                              style={{
                                width: `${transaction.score}%`,
                              }}
                            />
                          </div>

                          <strong>{transaction.score}</strong>
                        </div>
                      </td>

                      {/* Risk Level */}

                      <td>
                        <span
                          className={`transaction-risk-badge ${transaction.level.toLowerCase()}`}
                        >
                          {transaction.level}
                        </span>
                      </td>

                      {/* Status */}

                      <td>
                        <span className="transaction-status">
                          <span
                            className={`transaction-status-dot ${transaction.status
                              .toLowerCase()
                              .replace(" ", "-")}`}
                          />

                          {transaction.status}
                        </span>
                      </td>

                      <td>{transaction.customer}</td>

                      <td>{transaction.device}</td>

                      <td>{transaction.time}</td>

                      {/* Actions */}

                      <td>
                        <Link
                          href={`/transactions/${transaction.id}`}
                          className="transaction-action-button"
                          title={`View ${transaction.id}`}
                        >
                          •••
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="transactions-empty-state">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ===================================================
              PAGINATION
              =================================================== */}

          <div className="transactions-pagination">
            <span>
              Showing{" "}
              <strong>
                {filteredTransactions.length === 0 ? 0 : startIndex + 1}–
                {Math.min(
                  startIndex + rowsPerPage,
                  filteredTransactions.length,
                )}
              </strong>{" "}
              of <strong>{filteredTransactions.length}</strong> transactions
            </span>

            <div className="pagination-buttons">
              <button
                disabled={safeCurrentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={safeCurrentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                disabled={safeCurrentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
