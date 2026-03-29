import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Bot, Users, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Tables } from "@/integrations/supabase/types";
import { Link } from "react-router-dom";

type Lead = Tables<"leads">;

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) setLeads(data);
      setLoading(false);
    };
    fetchLeads();

    // Realtime subscription
    const channel = supabase
      .channel("leads-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
        fetchLeads();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const totalLeads = leads.length;
  const repliedLeads = leads.filter((l) => l.status === "replied").length;
  const newLeads = leads.filter((l) => l.status === "new").length;

  const stats = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "text-primary" },
    { label: "AI Replied", value: repliedLeads, icon: MessageSquare, color: "text-accent" },
    { label: "Pending", value: newLeads, icon: Clock, color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border glass sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-primary" />
            <h1 className="font-display text-xl font-bold">
              Growth<span className="text-primary">AI</span>{" "}
              <span className="text-muted-foreground font-normal text-sm">Admin</span>
            </h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to site
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl glow-border bg-card p-5 flex items-center gap-4">
              <s.icon className={`h-8 w-8 ${s.color}`} />
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Leads table */}
        <div className="rounded-xl glow-border bg-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-display text-lg font-semibold">All Leads</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading…</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No leads yet. Submit one from the landing page!</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Business</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">AI Reply</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{lead.business || "—"}</TableCell>
                      <TableCell className="text-sm">{lead.email}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-[200px] truncate">
                        {lead.message || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={lead.status === "replied" ? "default" : "secondary"}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground text-sm max-w-[250px] truncate">
                        {lead.ai_reply || "Pending…"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
