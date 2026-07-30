import { Plus, Search, Filter, MoreVertical } from "lucide-react";
import styles from "../../../admin.module.css";
import { AnimatedDiv, AnimatedStaggerContainer, AnimatedStaggerItem } from "../../../../components/AnimatedDiv";

const PROPERTIES = [
  { id: "PROP-001", title: "3 BHK Apartment", location: "Kishanganj City", price: "₹45L", status: "Published", date: "Oct 24, 2026" },
  { id: "PROP-002", title: "Commercial Plot", location: "Bahadurganj", price: "₹1.2Cr", status: "Draft", date: "Oct 23, 2026" },
  { id: "PROP-003", title: "4 BHK Villa", location: "Thakurganj", price: "₹85L", status: "Published", date: "Oct 20, 2026" },
];

export default function PropertiesAdmin() {
  return (
    <AnimatedDiv>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700 }}>Properties</h1>
        <button style={{ 
          background: "linear-gradient(135deg, var(--color-primary-light), var(--color-primary))", 
          color: "white", 
          border: "none", 
          padding: "8px 16px", 
          borderRadius: "var(--radius-pill)", 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          cursor: "pointer", 
          fontWeight: 500,
          boxShadow: "0 4px 16px hsla(220, 85%, 28%, 0.3)"
        }}>
          <Plus size={18} /> Add Property
        </button>
      </div>

      <AnimatedDiv delay={0.1} className={styles.adminCard} style={{ marginBottom: "var(--space-6)", display: "flex", gap: "var(--space-4)" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "hsla(0,0%,100%,0.5)" }} />
          <input 
            type="text" 
            placeholder="Search properties by ID, title, or location..." 
            style={{ 
              width: "100%", 
              padding: "10px 10px 10px 40px", 
              borderRadius: "var(--radius-md)", 
              border: "1px solid hsla(220,15%,88%,0.2)",
              background: "hsla(220,15%,88%,0.05)",
              color: "white"
            }} 
          />
        </div>
        <button style={{ 
          padding: "10px 16px", 
          borderRadius: "var(--radius-md)", 
          border: "1px solid hsla(220,15%,88%,0.2)", 
          background: "hsla(220,15%,88%,0.05)",
          color: "white",
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          cursor: "pointer" 
        }}>
          <Filter size={18} /> Filters
        </button>
      </AnimatedDiv>

      <AnimatedDiv delay={0.2} className={styles.adminCard}>
        <div style={{ overflowX: "auto" }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Property Details</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Added On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {PROPERTIES.map((prop) => (
                <tr key={prop.id}>
                  <td style={{ color: "hsla(0,0%,100%,0.7)", fontFamily: "monospace", fontSize: "12px" }}>{prop.id}</td>
                  <td style={{ fontWeight: 500 }}>{prop.title}</td>
                  <td style={{ color: "hsla(0,0%,100%,0.7)" }}>{prop.location}</td>
                  <td>{prop.price}</td>
                  <td>
                    <span className={`badge ${prop.status === 'Published' ? 'badge-docs-verified' : 'badge-self-listed'}`}>
                      {prop.status}
                    </span>
                  </td>
                  <td style={{ color: "hsla(0,0%,100%,0.7)" }}>{prop.date}</td>
                  <td>
                    <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "hsla(0,0%,100%,0.5)" }}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedDiv>
    </AnimatedDiv>
  );
}
