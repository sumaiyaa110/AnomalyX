"use client";

import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  }

  return (
    <header className="admin-header">
      {/* Search */}
      <div className="header-search">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Search transactions, customers, devices..."
        />

        <span className="search-shortcut">/</span>
      </div>

      {/* Right Side */}
      <div className="header-actions">
        {/* System Status */}
        <div className="header-status">
          <span className="status-dot"></span>

          <span>System Online</span>
        </div>

        {/* Notifications */}
        <button className="header-icon-button" aria-label="Notifications">
          ♢<span className="notification-badge">3</span>
        </button>

        {/* Admin Profile */}
        <button
          className="admin-profile"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="admin-avatar">A</div>

          <div className="admin-info">
            <span className="admin-name">Administrator</span>

            <span className="admin-role">System Admin</span>
          </div>

          <span className="profile-arrow">▾</span>
        </button>

        {/* Dropdown */}
        {showMenu && (
          <div className="profile-menu">
            <button>My Profile</button>

            <button>Settings</button>

            <div className="profile-divider"></div>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
