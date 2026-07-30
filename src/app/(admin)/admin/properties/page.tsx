import { Plus, Edit, Trash2 } from "lucide-react";
import styles from "../../admin.module.css";

const MOCK_PROPERTIES = [
  {
    id: "prop-001",
    title: "3 Bigha Residential Plot in Khagra — 20ft Road Access",
    type: "Residential",
    verificationLevel: "premium",
    priceDisplay: "₹1.2 Cr",
    locationDisplay: "Khagra, Kishanganj",
  },
  {
    id: "prop-002",
    title: "Commercial Shop Space Near NH-27 — High Footfall Area",
    type: "Commercial",
    verificationLevel: "site_verified",
    priceDisplay: "₹45 L",
    locationDisplay: "Near NH-27, Kishanganj",
  },
  {
    id: "prop-003",
    title: "5 Bigha Agricultural Land — Riverfront — Terhagachh",
    type: "Agricultural",
    verificationLevel: "docs_verified",
    priceDisplay: "₹30 L",
    locationDisplay: "Terhagachh, Kishanganj",
  },
];

export default function AdminProperties() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Manage Properties</h1>
        <button className="btn btn-primary" style={{ padding: "8px 16px" }}>
          <Plus size={18} /> Add Property
        </button>
      </div>

      <div className={styles.adminCard}>
        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Price</th>
                <th>Verification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PROPERTIES.map((prop) => (
                <tr key={prop.id}>
                  <td style={{ fontWeight: 500 }}>{prop.id}</td>
                  <td>{prop.title}</td>
                  <td>{prop.type}</td>
                  <td>{prop.locationDisplay}</td>
                  <td>{prop.priceDisplay}</td>
                  <td>
                    <span className={`badge badge-${prop.verificationLevel.replace("_", "-")}`}>
                      {prop.verificationLevel.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "var(--space-2)" }}>
                      <button style={{ background: "none", border: "none", color: "var(--color-primary)", cursor: "pointer", padding: 4 }}>
                        <Edit size={16} />
                      </button>
                      <button style={{ background: "none", border: "none", color: "var(--color-danger)", cursor: "pointer", padding: 4 }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
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
