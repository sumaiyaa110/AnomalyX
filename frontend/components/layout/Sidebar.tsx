"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "▦",
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: "≡",
  },
  {
    name: "Fraud Alerts",
    href: "/alerts",
    icon: "⚠",
  },
  {
    name: "Customers",
    href: "/customers",
    icon: "♙",
  },
  {
    name: "Devices",
    href: "/devices",
    icon: "▣",
  },
  {
    name: "Agents",
    href: "/agents",
    icon: "♙",
  },
  {
    name: "Network Analysis",
    href: "/network",
    icon: "⌘",
  },
  {
    name: "Investigations",
    href: "/investigations",
    icon: "◎",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: "▤",
  },
];

const bottomItems = [
  {
    name: "Settings",
    href: "/settings",
    icon: "⚙",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">A</div>

        <div>
          <div className="sidebar-brand-name">
            Anomaly<span>X</span>
          </div>

          <div className="sidebar-brand-subtitle">ADMIN MONITORING</div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-navigation">
        <div className="sidebar-section-title">MONITORING</div>

        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${
                isActive ? "sidebar-item-active" : ""
              }`}
            >
              <span className="sidebar-icon">{item.icon}</span>

              <span>{item.name}</span>
            </Link>
          );
        })}

        <div className="sidebar-section-title bottom-section">SYSTEM</div>

        {bottomItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-item ${
                isActive ? "sidebar-item-active" : ""
              }`}
            >
              <span className="sidebar-icon">{item.icon}</span>

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Admin Status */}
      <div className="sidebar-footer">
        <div className="system-status">
          <span className="status-dot"></span>

          <div>
            <div className="status-title">System Operational</div>

            <div className="status-subtitle">All services running</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
