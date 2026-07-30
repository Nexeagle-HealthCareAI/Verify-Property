"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, ChevronRight, ChevronLeft, Building2, MapPin, Phone, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  propertyType: z.string().min(1, "Select a property type"),
  location: z.string().min(3, "Enter the general location"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
});
type FormData = z.infer<typeof schema>;

const TYPES = ["Residential Plot", "Commercial Plot", "Agricultural Land", "Ready House", "Flat/Apartment"];

export default function SellerForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { propertyType: "", location: "", name: "", phone: "" }
  });

  const propertyType = watch("propertyType");

  const handleNext = async () => {
    let valid = false;
    if (step === 1) valid = await trigger(["propertyType"]);
    if (step === 2) valid = await trigger(["location"]);
    if (valid) setStep(s => s + 1);
  };

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "seller",
          name: data.name,
          phone: data.phone,
          details: `Type: ${data.propertyType}, Location: ${data.location}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: "center", padding: "var(--space-10) var(--space-6)", background: "var(--surface-card)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-lg)" }}>
        <CheckCircle2 size={64} color="var(--color-success)" style={{ marginInline: "auto", marginBottom: "var(--space-4)" }} />
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "var(--space-2)" }}>
          Request Received!
        </h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "1.1rem" }}>
          Our verification team will contact you shortly to verify details and activate your listing.
        </p>
      </motion.div>
    );
  }

  return (
    <div style={{ background: "var(--surface-card)", borderRadius: "var(--radius-xl)", padding: "var(--space-8)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-xl)" }}>
      
      {/* Progress Bar */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "var(--space-8)" }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", background: i <= step ? "var(--color-primary)" : "var(--surface-light)", transition: "background 0.3s ease" }} />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative", minHeight: "300px" }}>
        {status === "error" && (
          <div style={{ padding: "var(--space-3)", background: "hsl(0 100% 95%)", color: "var(--color-danger)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)", marginBottom: "var(--space-4)" }}>
            {errorMessage}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-6)" }}>
                <Building2 size={24} color="var(--color-primary)" />
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700 }}>What are you selling?</h3>
              </div>
              <div style={{ display: "grid", gap: "var(--space-3)" }}>
                {TYPES.map(t => (
                  <button 
                    key={t} type="button" 
                    onClick={() => { setValue("propertyType", t); trigger("propertyType"); }}
                    style={{ 
                      textAlign: "left", padding: "16px 20px", borderRadius: "12px", 
                      border: propertyType === t ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                      background: propertyType === t ? "var(--color-primary-light)" : "transparent",
                      color: propertyType === t ? "white" : "var(--text-primary)",
                      fontWeight: propertyType === t ? 700 : 500,
                      cursor: "pointer", transition: "all 0.2s ease"
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.propertyType && <p style={{ color: "var(--color-danger)", fontSize: "13px", marginTop: 8 }}>{errors.propertyType.message}</p>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-6)" }}>
                <MapPin size={24} color="var(--color-primary)" />
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700 }}>Where is it located?</h3>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: "14px", fontWeight: 600 }}>Locality / Area Name</label>
                <input type="text" className="form-input" placeholder="e.g. Bahadurganj Road, Kishanganj" {...register("location")} style={{ padding: "16px", fontSize: "16px" }} autoFocus />
                {errors.location && <p style={{ color: "var(--color-danger)", fontSize: "13px", marginTop: 8 }}>{errors.location.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "var(--space-6)" }}>
                <User size={24} color="var(--color-primary)" />
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 700 }}>Your Contact Details</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "14px", fontWeight: 600 }}>Full Name</label>
                  <input type="text" className="form-input" placeholder="Enter your full name" {...register("name")} style={{ padding: "16px", fontSize: "16px" }} autoFocus />
                  {errors.name && <p style={{ color: "var(--color-danger)", fontSize: "13px", marginTop: 8 }}>{errors.name.message}</p>}
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "14px", fontWeight: 600 }}>Mobile Number</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", fontWeight: 500 }}>+91</span>
                    <input type="tel" className="form-input" placeholder="10-digit number" {...register("phone")} style={{ padding: "16px 16px 16px 52px", fontSize: "16px" }} />
                  </div>
                  {errors.phone && <p style={{ color: "var(--color-danger)", fontSize: "13px", marginTop: 8 }}>{errors.phone.message}</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "var(--space-8)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--color-border)" }}>
          {step > 1 ? (
            <button type="button" onClick={() => setStep(s => s - 1)} className="btn btn-ghost" style={{ padding: "12px" }}>
              <ChevronLeft size={20} /> Back
            </button>
          ) : <div />}

          {step < 3 ? (
            <button type="button" onClick={handleNext} className="btn btn-primary" style={{ padding: "12px 24px", borderRadius: "100px" }}>
              Next Step <ChevronRight size={18} />
            </button>
          ) : (
            <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ padding: "12px 32px", borderRadius: "100px" }}>
              {status === "submitting" ? "Submitting..." : (
                <>Submit Details <Send size={18} /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
