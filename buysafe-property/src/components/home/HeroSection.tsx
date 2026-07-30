"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, ShieldCheck, Home } from "lucide-react";
import styles from "./HeroSection.module.css";

const PROPERTY_TYPES = ["Buy", "Rent", "Agricultural"];
const LOCATIONS = [
  "Kishanganj", "Kochadhaman", "Bahadurganj", "Thakurganj",
  "Pothia", "Dighalbank", "Terhagachh",
];

const TRUST_BADGES = [
  { icon: ShieldCheck, text: "Buyer Representation Only" },
  { icon: ShieldCheck, text: "Verified Listings" },
  { icon: TrendingUp,  text: "BuySafe Score™" },
  { icon: Home,        text: "Registry Guidance" },
];

export function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      type: PROPERTY_TYPES[activeTab].toLowerCase(),
      ...(location     && { location }),
      ...(propertyType && { category: propertyType }),
    });
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className={styles.hero} aria-label="Hero — Find your next property">
      {/* Background gradient mesh */}
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.gradientOrb1} />
        <div className={styles.gradientOrb2} />
        <div className={styles.gridPattern} />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Tagline */}
        <div className={styles.tagline} role="text">
          <span>🏡</span>
          <span>Kishanganj&apos;s Buyer-Focused Property Platform</span>
        </div>

        {/* Headline */}
        <h1 className={`heading-1 ${styles.headline}`}>
          Find Your Next Property{" "}
          <span className={styles.headlineAccent}>with Confidence.</span>
        </h1>

        <p className={styles.subheadline}>
          Expert buyer&apos;s agent services, verified listings, and end-to-end assistance
          from search to registry — all in Kishanganj.
        </p>

        {/* Search Card */}
        <div className={styles.searchCard}>
          {/* Tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Property transaction type">
            {PROPERTY_TYPES.map((tab, i) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === i}
                id={`hero-tab-${i}`}
                aria-controls={`hero-panel-${i}`}
                className={`${styles.tab} ${activeTab === i ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form
            className={styles.searchForm}
            onSubmit={handleSearch}
            role="tabpanel"
            id={`hero-panel-${activeTab}`}
            aria-labelledby={`hero-tab-${activeTab}`}
          >
            {/* Location */}
            <div className={styles.searchField}>
              <label htmlFor="hero-location" className="sr-only">Select location</label>
              <select
                id="hero-location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.searchSelect}
              >
                <option value="">📍 All Locations</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className={styles.searchField}>
              <label htmlFor="hero-prop-type" className="sr-only">Property type</label>
              <select
                id="hero-prop-type"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className={styles.searchSelect}
              >
                <option value="">🏠 All Types</option>
                <option value="residential">Residential</option>
                <option value="agricultural">Agricultural</option>
                <option value="commercial">Commercial</option>
                <option value="shop">Shop</option>
                <option value="godown">Godown</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className={`btn btn-accent ${styles.searchBtn}`}
              id="hero-search-btn"
            >
              <Search size={18} />
              Search
            </button>
          </form>
        </div>

        {/* CTA Buttons */}
        <div className={styles.ctaRow}>
          <a href="/properties?action=looking" className={`btn btn-outline ${styles.ctaBtn}`}
             style={{ color: "white", borderColor: "hsl(0 0% 100% / 0.5)" }}>
            🔍 I'm Looking for Property
          </a>
          <a href="/list" className={`btn btn-accent ${styles.ctaBtn}`}>
            📋 List Your Property
          </a>
          <a href="/knowledge" className={`btn btn-ghost ${styles.ctaBtn}`}
             style={{ color: "white", borderColor: "hsl(0 0% 100% / 0.3)" }}>
            📚 Knowledge Centre
          </a>
        </div>

        {/* Trust Badges */}
        <div className={styles.trustBadges} aria-label="Trust indicators" role="list">
          {TRUST_BADGES.map(({ icon: Icon, text }) => (
            <div key={text} className={styles.trustBadge} role="listitem">
              <Icon size={14} aria-hidden="true" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={styles.stats} aria-label="Platform statistics">
          {[
            { label: "Verified Properties", value: "150+" },
            { label: "Happy Buyers",        value: "80+"  },
            { label: "BuySafe Score™",      value: "100"  },
          ].map(({ label, value }) => (
            <div key={label} className={styles.statItem}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
