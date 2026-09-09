import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// UI-only: there is no backend, so this simply lets you through to /admin.
export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Sign in — Admin";
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    toast.success(mode === "signin" ? "Welcome back." : "Account created.");
    navigate("/admin", { replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-5 flex justify-between items-baseline border-b border-foreground">
        <Link to="/" className="font-mono text-[10px] uppercase tracking-widest hover:text-accent">
          ← Back
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-widest">/ Admin Access</span>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-12 bg-foreground text-background">
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
            Editorial CMS
          </span>
          <h1 className="font-display text-7xl uppercase leading-none">
            Edit
            <br />
            the
            <br />
            <span className="text-accent">archive.</span>
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 max-w-[40ch]">
            Sign in to edit copy, palette and typography across the live site.
          </p>
        </div>

        <div className="flex items-center justify-center p-8">
          <form onSubmit={submit} className="w-full max-w-sm space-y-6">
            <div>
              <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest mb-8">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={
                    mode === "signin"
                      ? "text-foreground underline underline-offset-4"
                      : "text-muted-foreground"
                  }
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={
                    mode === "signup"
                      ? "text-foreground underline underline-offset-4"
                      : "text-muted-foreground"
                  }
                >
                  Create account
                </button>
              </div>
              <h2 className="font-display text-5xl uppercase leading-none">
                {mode === "signin" ? "Welcome" : "New Account"}
              </h2>
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-foreground bg-transparent py-2 focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-foreground bg-transparent py-2 focus:outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-foreground text-background font-mono text-[10px] uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
