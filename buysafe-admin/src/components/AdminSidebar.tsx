"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Home, Users, CalendarCheck, LogOut, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "../app/admin.module.css";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/admin/properties", label: "Properties", icon: <Home size={20} /> },
  { href: "/admin/leads", label: "Leads", icon: <Users size={20} /> },
  { href: "/admin/visits", label: "Site Visits", icon: <CalendarCheck size={20} /> },
  { href: "/admin/knowledge", label: "Knowledge Base", icon: <BookOpen size={20} /> },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ""}`}>
      <div className={styles.sidebarHeader} style={{ justifyContent: isCollapsed ? "center" : "space-between", padding: isCollapsed ? "var(--space-4)" : "var(--space-6)" }}>
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.logo}>
            <span className={styles.logoIcon}>🏡</span> Buy<span className={styles.logoAccent}>Safe</span>
          </motion.div>
        )}
        
        {isCollapsed && (
          <span className={styles.logoIcon} style={{ fontSize: "24px" }}>🏡</span>
        )}

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ 
            background: "hsla(220,15%,88%,0.1)", 
            border: "none", 
            color: "white", 
            cursor: "pointer", 
            borderRadius: "50%", 
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: isCollapsed ? "absolute" : "relative",
            right: isCollapsed ? "-12px" : "auto",
            top: isCollapsed ? "24px" : "auto",
            zIndex: 60
          }}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <nav className={styles.nav}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={styles.navLink}
              style={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                padding: isCollapsed ? "12px" : "12px var(--space-4)",
                background: isActive ? "hsla(220, 85%, 48%, 0.15)" : "transparent",
                color: isActive ? "white" : "hsla(220, 15%, 88%, 0.7)"
              }}
              title={isCollapsed ? link.label : ""}
            >
              {link.icon}
              {!isCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  {link.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter} style={{ padding: isCollapsed ? "var(--space-4) 0" : "var(--space-6)" }}>
        <Link 
          href="/" 
          className={styles.logoutBtn}
          style={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
          title={isCollapsed ? "Exit to Site" : ""}
        >
          <LogOut size={18} /> 
          {!isCollapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Exit
            </motion.span>
          )}
        </Link>
      </div>
    </aside>
  );
}
