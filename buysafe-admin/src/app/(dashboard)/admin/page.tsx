import { Home, Users, CalendarCheck, Activity, Eye, MousePointerClick, UserPlus } from "lucide-react";
import styles from "../../admin.module.css";
import { AnimatedDiv, AnimatedStaggerContainer, AnimatedStaggerItem } from "../../../components/AnimatedDiv";

// Prevent static generation since this relies on fresh data
export const dynamic = "force-dynamic";

async function getAnalyticsData() {
  try {
    const res = await fetch("http://localhost:8000/api/v1/analytics/dashboard", { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error("Failed to fetch analytics:", e);
    return null;
  }
}

export default async function AdminDashboard() {
  const data = await getAnalyticsData();

  const STATS = [
    { label: "Total Users", value: data?.total_users || 0, icon: <Users size={24} color="#3b82f6" /> },
    { label: "Unique Sessions", value: data?.total_sessions || 0, icon: <Activity size={24} color="#10b981" /> },
    { label: "Page Views", value: data?.total_page_views || 0, icon: <Eye size={24} color="#f59e0b" /> },
    { label: "Recent Actions", value: data?.recent_activity?.length || 0, icon: <MousePointerClick size={24} color="#8b5cf6" /> },
  ];

  return (
    <AnimatedDiv>
      <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "var(--space-6)" }}>Analytics Dashboard</h1>
      
      <AnimatedStaggerContainer style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--space-6)", marginBottom: "var(--space-8)" }}>
        {STATS.map((stat, i) => (
          <AnimatedStaggerItem key={i} className={styles.adminCard} style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--color-text-muted)", fontSize: "var(--text-sm)", fontWeight: 500 }}>{stat.label}</span>
              <div style={{ background: "hsla(0,0%,100%,0.05)", padding: 8, borderRadius: "50%", border: "1px solid hsla(0,0%,100%,0.1)" }}>
                {stat.icon}
              </div>
            </div>
            <div style={{ fontSize: "var(--text-3xl)", fontWeight: 800 }}>{stat.value}</div>
          </AnimatedStaggerItem>
        ))}
      </AnimatedStaggerContainer>

      <AnimatedDiv delay={0.2} className={styles.adminCard}>
        <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginBottom: "var(--space-4)" }}>Recent Activity Log</h3>
        
        {!data || !data.recent_activity || data.recent_activity.length === 0 ? (
          <p style={{ color: "var(--color-text-muted)" }}>No recent activity recorded.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Action</th>
                  <th>Session ID</th>
                  <th>User ID</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_activity.map((log: any) => (
                  <tr key={log.id}>
                    <td style={{ whiteSpace: "nowrap", color: "hsla(0,0%,100%,0.7)" }}>{new Date(log.created_at).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${log.action === "PAGE_VIEW" ? "badge-docs-verified" : "badge-premium"}`}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ fontSize: "12px", fontFamily: "monospace", color: "hsla(0,0%,100%,0.5)" }}>{log.session_id.split('_')[1] || log.session_id}</td>
                    <td style={{ color: "hsla(0,0%,100%,0.9)" }}>{log.user_id ? `User #${log.user_id}` : "Anonymous"}</td>
                    <td style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "hsla(0,0%,100%,0.7)" }}>
                      {log.details ? JSON.stringify(log.details) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AnimatedDiv>
    </AnimatedDiv>
  );
}
