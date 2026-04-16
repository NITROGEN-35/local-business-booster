import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Bot, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // Check if user is admin
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
          <p className="text-muted-foreground text-sm">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 p-6 rounded-2xl glow-border bg-card">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
            <Input
              type="email"
              placeholder="admin@growthAI.com"
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
            />
          </div>
          <Button type="submit" className="w-full font-semibold glow-box" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <Lock className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
