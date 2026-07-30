import Link from "next/link";
import { LayoutDashboard, Home, Users, CalendarCheck, LogOut } from "lucide-react";
import styles from "./admin.module.css";

export const metadata = {
  title: "Admin Dashboard — BuySafe Property",
};

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/admin/properties", label: "Properties", icon: <Home size={20} /> },
  { href: "/admin/leads", label: "Leads", icon: <Users size={20} /> },
  { href: "/admin/visits", label: "Site Visits", icon: <CalendarCheck size={20} /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🏡</span> Buy<span className={styles.logoAccent}>Safe</span>
          </div>
          <span className={styles.badge}>ADMIN</span>
        </div>
        
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.logoutBtn}>
            <LogOut size={18} /> Exit to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainWrapper}>
        <header className={styles.topHeader}>
          <h2 style={{ fontSize: "var(--text-lg)", fontWeight: 600 }}>Overview</h2>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>A</div>
            <span>Admin User</span>
          </div>
        </header>

        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}
