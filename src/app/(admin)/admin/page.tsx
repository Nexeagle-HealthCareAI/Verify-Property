import { Home, Users, CalendarCheck, Activity } from "lucide-react";
import styles from "../admin.module.css";

const STATS = [
  { label: "Total Properties", value: "24", icon: <Home size={24} color="#3b82f6" />, change: "+3 this week" },
  { label: "Active Leads", value: "12", icon: <Users size={24} color="#10b981" />, change: "+5 this week" },
  { label: "Pending Visits", value: "4", icon: <CalendarCheck size={24} color="#f59e0b" />, change: "Requires action" },
  { label: "Site Views", value: "1,204", icon: <Activity size={24} color="#8b5cf6" />, change: "+12% this week" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "var(--space-6)" }}>Dashboard</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        {STATS.map((stat, i) => (
          <div key={i} className={styles.adminCard} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", fontWeight: 500 }}>{stat.label}</span>
              <div style={{ background: "#f1f5f9", padding: 8, borderRadius: "50%" }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>{stat.value}</div>
            <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div className={styles.adminCard}>
        <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginBottom: "var(--space-4)" }}>Recent Activity</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Action</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Today, 10:30 AM</td>
              <td>New Lead</td>
              <td>Seller Lead (Residential Plot) - Rahul Kumar</td>
              <td><span className="badge badge-premium">New</span></td>
            </tr>
            <tr>
              <td>Yesterday</td>
              <td>Site Visit</td>
              <td>Visit scheduled for Prop-002 by Amit Singh</td>
              <td><span className="badge badge-site-verified">Confirmed</span></td>
            </tr>
            <tr>
              <td>2 days ago</td>
              <td>Property Added</td>
              <td>4 BHK House in Bahadurganj</td>
              <td><span className="badge badge-docs-verified">Published</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
