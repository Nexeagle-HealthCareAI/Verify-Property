import AdminSidebar from "../../components/AdminSidebar";
import styles from "../admin.module.css";
import PageTransition from "../../components/PageTransition";

export const metadata = {
  title: "Admin Dashboard — BuySafe Property",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />

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
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
