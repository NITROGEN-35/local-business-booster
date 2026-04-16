import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Bot, Lock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Login failed", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      toast({ title: "Access denied", description: "You don't have admin privileges.", variant: "destructive" });
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    if (!data.user) {
      toast({ title: "Check your email", description: "Please verify your email address to continue." });
      setLoading(false);
      return;
    }

    // Try to bootstrap as first admin
    const { data: result, error: fnError } = await supabase.functions.invoke("bootstrap-admin", {
      body: { userId: data.user.id },
    });

    if (fnError || result?.error) {
      toast({
        title: "Account created",
        description: result?.error || "Please verify your email. An existing admin must grant you access.",
      });
      setLoading(false);
      return;
    }

    toast({ title: "🎉 Admin account created!", description: "Please verify your email, then log in." });
    setMode("login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="h-8 w-8 text-primary" />
            <h1 className="font-display text-2xl font-bold">
              Growth<span className="text-primary">AI</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">Admin Dashboard</p>
        </div>

        <form
          onSubmit={mode === "login" ? handleLogin : handleSignup}
          className="space-y-4 p-6 rounded-2xl glow-border bg-card"
        >
          <div className="flex gap-2 mb-2">
            <Button
              type="button"
              variant={mode === "login" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setMode("login")}
            >
              <Lock className="h-4 w-4 mr-1" /> Sign In
            </Button>
            <Button
              type="button"
              variant={mode === "signup" ? "default" : "ghost"}
              size="sm"
              className="flex-1"
              onClick={() => setMode("signup")}
            >
              <UserPlus className="h-4 w-4 mr-1" /> Sign Up
            </Button>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <Input
              type="email"
              placeholder="admin@growthai.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-border"
              required
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-secondary border-border"
              required
              minLength={6}
            />
          </div>
          <Button type="submit" className="w-full font-semibold glow-box" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Admin Account"}
          </Button>

          {mode === "signup" && (
            <p className="text-xs text-muted-foreground text-center">
              Only the first signup becomes admin automatically.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
