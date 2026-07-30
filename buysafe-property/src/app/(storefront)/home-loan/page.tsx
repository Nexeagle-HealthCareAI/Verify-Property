"use client";

import { motion } from "framer-motion";
import { Landmark, FileSpreadsheet, Percent, Timer, Calculator, ChevronRight } from "lucide-react";
import LoanForm from "./LoanForm";
import { useState } from "react";

const FEATURES = [
  {
    icon: <Percent size={24} color="var(--color-accent-light)" />,
    title: "Lowest Interest Rates",
    desc: "We negotiate with our partner banks to get you the most competitive rates.",
  },
  {
    icon: <FileSpreadsheet size={24} color="var(--color-accent-light)" />,
    title: "Zero Paperwork Hassle",
    desc: "Our team collects your documents and handles all bank follow-ups.",
  },
  {
    icon: <Timer size={24} color="var(--color-accent-light)" />,
    title: "Fast Disbursal",
    desc: "Pre-verified properties process loans up to 40% faster.",
  },
];

const BANKS = ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "LIC HFL", "Bank of Baroda"];

// Stagger variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function HomeLoanPage() {
  const [loanAmt, setLoanAmt] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // EMI Calculation: P x R x (1+R)^N / [(1+R)^N-1]
  const calculateEmi = () => {
    const P = loanAmt;
    const R = (interestRate / 12) / 100;
    const N = tenureYears * 12;
    if (R === 0) return P / N;
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return Math.round(emi);
  };

  const emi = calculateEmi();
  const totalPayment = emi * (tenureYears * 12);
  const totalInterest = totalPayment - loanAmt;

  return (
    <div style={{ paddingTop: "var(--nav-height-mobile)", background: "var(--background)", minHeight: "100vh" }}>
      
      {/* ── Hero Fintech Style ── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(180deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)",
        color: "white",
        padding: "calc(var(--space-12) + var(--space-4)) var(--space-4) var(--space-16)",
        overflow: "hidden",
      }}>
        {/* Abstract glowing rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", top: "-50%", right: "-20%", width: "80vw", height: "80vw",
            border: "1px solid hsl(0 0% 100% / 0.1)", borderRadius: "50%",
            boxShadow: "inset 0 0 40px hsl(38 96% 56% / 0.1)"
          }}
        />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div style={{ 
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "hsl(0 0% 100% / 0.1)", backdropFilter: "blur(8px)",
              padding: "6px 16px", borderRadius: "100px", fontSize: "12px",
              fontWeight: 600, color: "var(--color-accent-light)", marginBottom: "var(--space-6)"
            }}>
              <Landmark size={14} /> Official Banking Partners
            </div>
            
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: "var(--space-4)" }}>
              Finance your dream,<br />
              <span style={{ color: "var(--color-accent)" }}>without the friction.</span>
            </h1>
            
            <p style={{ color: "hsl(0 0% 100% / 0.7)", maxWidth: 500, margin: "0 auto", fontSize: "1.1rem", lineHeight: 1.6 }}>
              Compare rates from 15+ top banks. Zero paperwork fees. Approval in as little as 48 hours.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container" style={{ marginTop: "-var(--space-10)", position: "relative", zIndex: 10, paddingBottom: "var(--space-16)" }}>
        
        {/* ── Interactive EMI Calculator (Glassmorphic) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          style={{
            background: "var(--surface-card)",
            borderRadius: "var(--radius-xl)",
            padding: "var(--space-6)",
            boxShadow: "var(--shadow-xl)",
            border: "1px solid var(--color-border)",
            marginBottom: "var(--space-12)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-6)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--space-4)" }}>
            <div style={{ background: "var(--color-primary)", padding: "10px", borderRadius: "12px" }}>
              <Calculator size={20} color="white" />
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700 }}>Smart EMI Calculator</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-8)" }}>
            {/* Sliders */}
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)" }}>Loan Amount</label>
                  <span style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>₹{loanAmt.toLocaleString('en-IN')}</span>
                </div>
                <input type="range" min={500000} max={10000000} step={100000} value={loanAmt} onChange={e => setLoanAmt(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--color-primary)" }} />
              </div>
              
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)" }}>Interest Rate</label>
                  <span style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{interestRate}% p.a.</span>
                </div>
                <input type="range" min={7.0} max={12.0} step={0.1} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--color-primary)" }} />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-2)" }}>
                  <label style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)" }}>Tenure</label>
                  <span style={{ fontWeight: 700, fontFamily: "var(--font-heading)" }}>{tenureYears} Years</span>
                </div>
                <input type="range" min={5} max={30} step={1} value={tenureYears} onChange={e => setTenureYears(Number(e.target.value))} style={{ width: "100%", accentColor: "var(--color-primary)" }} />
              </div>
            </div>

            {/* Results */}
            <div style={{ background: "hsl(220 30% 98%)", borderRadius: "var(--radius-lg)", padding: "var(--space-6)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "4px" }}>Your Monthly EMI</p>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: "3rem", fontWeight: 800, color: "var(--color-primary)", lineHeight: 1 }}>
                ₹{emi.toLocaleString('en-IN')}
              </p>
              
              <div style={{ marginTop: "var(--space-6)", paddingTop: "var(--space-6)", borderTop: "1px dashed var(--color-border)", display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Principal Amount</p>
                  <p style={{ fontWeight: 600, fontSize: "14px" }}>₹{loanAmt.toLocaleString('en-IN')}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Total Interest</p>
                  <p style={{ fontWeight: 600, fontSize: "14px" }}>₹{totalInterest.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Main Layout: Apply Form & Features ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-10)" }}>
          
          {/* Left: Application Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ background: "var(--surface-card)", padding: "var(--space-6)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "var(--space-2)" }}>
                Apply in 2 minutes
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "14px", marginBottom: "var(--space-6)" }}>
                No credit check required for preliminary assessment.
              </p>
              <LoanForm />
            </div>
          </motion.div>

          {/* Right: Features & Partners */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)", paddingTop: "var(--space-4)" }}
          >
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700 }}>
              The BuySafe Advantage
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
              {FEATURES.map((f, i) => (
                <motion.div key={i} variants={itemVariants} style={{ display: "flex", gap: "var(--space-4)" }}>
                  <div style={{ 
                    flexShrink: 0, background: "var(--color-primary-dark)", 
                    width: 48, height: 48, borderRadius: "12px", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 16px hsl(220 80% 20% / 0.15)"
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 600, marginBottom: "4px" }}>{f.title}</h4>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.5 }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} style={{ marginTop: "var(--space-4)", padding: "var(--space-5)", background: "hsl(38 90% 95%)", borderRadius: "var(--radius-lg)", border: "1px solid hsl(38 80% 85%)" }}>
              <h4 style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--color-primary-dark)", marginBottom: "var(--space-3)" }}>
                <Landmark size={18} /> Our Banking Partners
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {BANKS.map(bank => (
                  <span key={bank} style={{ background: "white", padding: "4px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)", border: "1px solid hsl(38 30% 85%)" }}>
                    {bank}
                  </span>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
