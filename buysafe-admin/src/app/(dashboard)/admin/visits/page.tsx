import styles from "../../../admin.module.css";
import { Calendar } from "lucide-react";

const MOCK_VISITS = [
  { id: "V-201", requestDate: "2026-07-30", propId: "prop-001", clientName: "Vikram Das", phone: "+91 91234 56789", prefDate: "2026-08-02", status: "Pending" },
  { id: "V-202", requestDate: "2026-07-29", propId: "prop-003", clientName: "Pooja Roy", phone: "+91 82345 67890", prefDate: "2026-08-01", status: "Confirmed" },
];

export default function AdminVisits() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Site Visits</h1>
        <button className="btn btn-outline" style={{ padding: "8px 16px", background: "white" }}>
          <Calendar size={18} /> Google Calendar Sync
        </button>
      </div>

      <div className={styles.adminCard}>
        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Request Date</th>
                <th>Client</th>
                <th>Property ID</th>
                <th>Preferred Visit Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_VISITS.map((visit) => (
                <tr key={visit.id}>
                  <td>{visit.requestDate}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{visit.clientName}</div>
                    <div style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{visit.phone}</div>
                  </td>
                  <td><span style={{ fontFamily: "monospace", background: "#f1f5f9", padding: 4 }}>{visit.propId}</span></td>
                  <td style={{ fontWeight: 500, color: "var(--color-primary)" }}>{visit.prefDate}</td>
                  <td>
                    <span className={`badge ${visit.status === "Pending" ? "badge-self-listed" : "badge-site-verified"}`}>
                      {visit.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      defaultValue={visit.status}
                      style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid var(--color-border)" }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
