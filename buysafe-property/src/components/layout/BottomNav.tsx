"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, CalendarCheck, User } from "lucide-react";
import styles from "./BottomNav.module.css";

const tabs = [
  { href: "/",            icon: Home,          label: "Home"    },
  { href: "/properties",  icon: Search,        label: "Search"  },
  { href: "/favourites",  icon: Heart,         label: "Saved"   },
  { href: "/visits",      icon: CalendarCheck, label: "Visits"  },
  { href: "/profile",     icon: User,          label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Bottom navigation" role="navigation">
      {tabs.map(({ href, icon: Icon, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
          >
            <span className={styles.iconWrap}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              {isActive && <span className={styles.activeDot} aria-hidden="true" />}
            </span>
            <span className={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
