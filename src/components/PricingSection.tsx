import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "₹2,999",
    period: "/month",
    description: "Perfect for solo entrepreneurs getting started.",
    features: [
      "Lead capture form",
      "Up to 100 leads/month",
      "Basic AI auto-reply",
      "Email notifications",
      "Simple dashboard",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "₹6,999",
    period: "/month",
    description: "For growing businesses that want to scale fast.",
    features: [
      "Everything in Starter",
      "Unlimited leads",
      "Smart AI conversations",
      "WhatsApp integration",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large teams & agencies.",
    features: [
      "Everything in Growth",
      "Multi-location support",
      "Custom AI training",
      "Dedicated account manager",
      "API access",
      "White-label option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24 relative">
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Simple, Transparent <span className="text-gradient">Pricing</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Choose the plan that fits your business. Upgrade anytime.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 md:p-8 rounded-2xl flex flex-col ${
              plan.highlighted
                ? "glow-box glow-border bg-card ring-1 ring-primary/30 scale-[1.02]"
                : "glow-border bg-card"
            }`}
          >
            {plan.highlighted && (
              <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 self-start mb-4">
                Most Popular
              </span>
            )}
            <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
            <div className="mt-3 mb-2 flex items-end gap-1">
              <span className="font-display text-4xl font-bold text-foreground">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground text-sm mb-1">{plan.period}</span>}
            </div>
            <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              className={`w-full font-semibold ${plan.highlighted ? "glow-box" : ""}`}
              variant={plan.highlighted ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
