import { motion } from "framer-motion";
import { Bot, BarChart3, MessageSquare, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Auto-Reply",
    description: "Instantly respond to every lead with intelligent, context-aware AI messages.",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description: "Track leads, conversions, and AI performance from a single beautiful dashboard.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Ready",
    description: "Connect WhatsApp Business to capture and engage leads where they already are.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Go live in under 5 minutes. No coding required, no complex integrations.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime. Your data is always safe.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Restaurants, salons, real estate, clinics — any local business can grow.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Grow</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            One platform to capture, engage, and convert leads — powered by artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-xl glow-border bg-card hover:bg-secondary/50 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
