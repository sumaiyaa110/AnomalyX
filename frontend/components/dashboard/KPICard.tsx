type KPICardProps = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: string;
  trend: "up" | "down";
  variant: "blue" | "red" | "yellow" | "green";
};

export default function KPICard({
  title,
  value,
  change,
  description,
  icon,
  trend,
  variant,
}: KPICardProps) {
  return (
    <div className={`kpi-card kpi-${variant}`}>
      {/* Top section */}
      <div className="kpi-card-top">
        <div>
          <p className="kpi-title">{title}</p>
          <h2 className="kpi-value">{value}</h2>
        </div>

        <div className="kpi-icon">{icon}</div>
      </div>

      {/* Bottom section */}
      <div className="kpi-card-bottom">
        <span className={`kpi-change kpi-change-${trend}`}>
          {trend === "up" ? "↗" : "↘"} {change}
        </span>

        <span className="kpi-description">{description}</span>
      </div>
    </div>
  );
}
