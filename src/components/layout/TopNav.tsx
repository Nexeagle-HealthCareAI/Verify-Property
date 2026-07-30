"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Search, BookOpen, Phone, ChevronDown } from "lucide-react";
import styles from "./TopNav.module.css";

const navLinks = [
  { href: "/properties?type=buy",  label: "Buy Property" },
  { href: "/properties?type=rent", label: "Rent Property" },
  { href: "/list",                  label: "Sell Property" },
  { href: "/verify",                label: "Property Verification" },
  { href: "/buyer-agent",           label: "Buyer's Agent" },
  { href: "/home-loan",             label: "Home Loan" },
  { href: "/knowledge",             label: "Knowledge Centre" },
];

export function TopNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} role="banner">
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="BuySafe Property Home">
            <span className={styles.logoIcon}>🏡</span>
            <span className={styles.logoText}>
              Buy<span className={styles.logoAccent}>Safe</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <div 
              className={styles.navDropdown}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                className={styles.navLink} 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
              >
                More <ChevronDown size={14} />
              </button>
              <div className={`${styles.dropdown} ${dropdownOpen ? styles.dropdownOpen : ""}`}>
                {navLinks.slice(5).map((link) => (
                  <Link key={link.href} href={link.href} className={styles.dropdownItem}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Desktop CTAs */}
          <div className={styles.desktopCta}>
            <Link href="/properties?action=looking" className="btn btn-ghost btn-sm">
              I'm Looking for Property
            </Link>
            <Link href="/list" className="btn btn-primary btn-sm">
              List Property
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🏡</span>
            <span className={styles.logoText}>
              Buy<span className={styles.logoAccent}>Safe</span>
            </span>
          </Link>
        </div>
        <div className={styles.mobileMenuLinks}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className={styles.mobileMenuCtas}>
          <Link href="/properties" className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
            I'm Looking for Property
          </Link>
          <Link href="/list" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            List Your Property Free
          </Link>
        </div>
      </nav>
    </>
  );
}
