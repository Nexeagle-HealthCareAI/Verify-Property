import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Lock } from "lucide-react";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");
  
  // If already logged in, go to admin
  if (token?.value === "authenticated") {
    redirect("/admin");
  }

  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password");
    
    if (password === "admin123") {
      const cookieStore = await cookies();
      cookieStore.set("admin_token", "authenticated", { secure: true, httpOnly: true, maxAge: 60 * 60 * 24 });
      redirect("/admin");
    } else {
      // In a real app we'd handle errors better
      redirect("/login?error=1");
    }
  }

  return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-4)", background: "#f8fafc" }}>
      <div className="card" style={{ padding: "var(--space-8)", maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{ background: "var(--color-primary-light)", width: 64, height: 64, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginInline: "auto", marginBottom: "var(--space-6)" }}>
          <Lock size={32} color="white" />
        </div>
        <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "var(--space-2)" }}>Admin Access</h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}>Enter the admin password to continue</p>
        
        <form action={login} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <input 
            type="password" 
            name="password"
            placeholder="Password"
            required
            style={{ padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "var(--text-base)" }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Secure Login
          </button>
        </form>
      </div>
    </div>
  );
}
