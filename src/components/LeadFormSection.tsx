import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const LeadFormSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", business: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    toast({ title: "🎉 Lead submitted!", description: "We'll get back to you with an AI-powered response shortly." });
    setFormData({ name: "", business: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to <span className="text-gradient">Grow?</span>
            </h2>
            <p className="text-muted-foreground">
              Drop your details and our AI will reach out instantly.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4 p-6 md:p-8 rounded-2xl glow-border bg-card"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Name *</label>
              <Input
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Business Name</label>
              <Input
                placeholder="Your business name"
                value={formData.business}
                onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email *</label>
              <Input
                type="email"
                placeholder="you@business.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <Textarea
                placeholder="Tell us about your business needs..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-secondary border-border min-h-[100px]"
              />
            </div>
            <Button type="submit" className="w-full font-semibold glow-box" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit Lead"}
              {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
