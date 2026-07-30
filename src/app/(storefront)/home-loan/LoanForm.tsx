"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  loanAmount: z.string().min(1, "Enter an estimated loan amount"),
  employment: z.string().min(1, "Select your employment type"),
});

type FormData = z.infer<typeof schema>;

export default function LoanForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "loan",
          name: data.name,
          phone: data.phone,
          details: `Amount: ₹${data.loanAmount}, Employment: ${data.employment}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "var(--space-8)", background: "var(--surface-light)", borderRadius: "var(--radius-lg)" }}>
        <CheckCircle2 size={48} color="var(--color-success)" style={{ marginInline: "auto", marginBottom: "var(--space-4)" }} />
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-xl)", marginBottom: "var(--space-2)" }}>
          Application Received!
        </h3>
        <p style={{ color: "var(--color-text-muted)" }}>
          Our loan specialist will call you shortly to discuss your options and required documents.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      {status === "error" && (
        <div style={{ padding: "var(--space-3)", background: "hsl(0 100% 95%)", color: "var(--color-danger)", borderRadius: "var(--radius-md)", fontSize: "var(--text-sm)" }}>
          {errorMessage}
        </div>
      )}

      <div>
        <label className="form-label" htmlFor="name">Full Name</label>
        <input id="name" type="text" className="form-input" placeholder="Enter your name" {...register("name")} />
        {errors.name && <p style={{ color: "var(--color-danger)", fontSize: "var(--text-xs)", marginTop: 4 }}>{errors.name.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="phone">Mobile Number</label>
        <input id="phone" type="tel" className="form-input" placeholder="10-digit mobile number" {...register("phone")} />
        {errors.phone && <p style={{ color: "var(--color-danger)", fontSize: "var(--text-xs)", marginTop: 4 }}>{errors.phone.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="loanAmount">Estimated Loan Amount</label>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }}>₹</span>
          <input id="loanAmount" type="number" className="form-input" placeholder="e.g. 2500000" style={{ paddingLeft: 32 }} {...register("loanAmount")} />
        </div>
        {errors.loanAmount && <p style={{ color: "var(--color-danger)", fontSize: "var(--text-xs)", marginTop: 4 }}>{errors.loanAmount.message}</p>}
      </div>

      <div>
        <label className="form-label" htmlFor="employment">Employment Type</label>
        <select id="employment" className="form-input" {...register("employment")}>
          <option value="">Select type</option>
          <option value="Salaried">Salaried Employee</option>
          <option value="Self-Employed Business">Self-Employed (Business)</option>
          <option value="Self-Employed Professional">Self-Employed (Professional)</option>
          <option value="NRI">NRI</option>
        </select>
        {errors.employment && <p style={{ color: "var(--color-danger)", fontSize: "var(--text-xs)", marginTop: 4 }}>{errors.employment.message}</p>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ marginTop: "var(--space-2)" }}>
        {status === "submitting" ? "Submitting..." : (
          <>Apply Now <Send size={16} /></>
        )}
      </button>
      <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textAlign: "center", marginTop: "var(--space-2)" }}>
        We compare rates across 15+ banks for you.
      </p>
    </form>
  );
}
