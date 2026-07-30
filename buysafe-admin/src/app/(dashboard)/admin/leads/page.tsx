import styles from "../../../admin.module.css";
import { Download } from "lucide-react";

const MOCK_LEADS = [
  { id: "L-101", date: "2026-07-30", type: "Seller", name: "Rahul Kumar", phone: "+91 98765 43210", details: "Residential Plot, 1200 sqft", status: "New" },
  { id: "L-102", date: "2026-07-29", type: "Home Loan", name: "Amit Singh", phone: "+91 87654 32109", details: "Employed, ₹5L Income", status: "Contacted" },
  { id: "L-103", date: "2026-07-28", type: "Seller", name: "Neha Sharma", phone: "+91 76543 21098", details: "Agriculture Land, 2 Acres", status: "Converted" },
];

export default function AdminLeads() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Lead Inquiries</h1>
        <button className="btn btn-outline" style={{ padding: "8px 16px", background: "white" }}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className={styles.adminCard}>
        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADS.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.date}</td>
                  <td>
                    <span style={{ 
                      background: lead.type === "Seller" ? "hsl(220 85% 95%)" : "hsl(30 85% 95%)",
                      color: lead.type === "Seller" ? "var(--color-primary)" : "var(--color-accent)",
                      padding: "4px 8px", borderRadius: 4, fontSize: 12, fontWeight: 600
                    }}>
                      {lead.type}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{lead.name}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.details}</td>
                  <td>
                    <select 
                      defaultValue={lead.status}
                      style={{ padding: "4px 8px", borderRadius: 4, border: "1px solid var(--color-border)" }}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Junk">Junk</option>
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
