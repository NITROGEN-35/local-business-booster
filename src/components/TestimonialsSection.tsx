import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Salon Owner",
    quote: "GrowthAI brought me 3x more bookings in the first month. The AI replies handle enquiries even when I'm busy with clients.",
    stars: 5,
  },
  {
    name: "Rahul Verma",
    role: "Real Estate Agent",
    quote: "I used to lose leads because I couldn't reply fast enough. Now every lead gets an instant, personalised response.",
    stars: 5,
  },
  {
    name: "Ananya Gupta",
    role: "Café & Restaurant",
    quote: "The dashboard lets me see exactly who's interested and what they want. Setup was ridiculously easy.",
    stars: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-24 relative">
    <div className="container px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Loved by <span className="text-gradient">Business Owners</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Real results from real businesses using GrowthAI.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl glow-border bg-card flex flex-col"
          >
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: t.stars }).map((_, s) => (
                <Star key={s} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-secondary-foreground text-sm leading-relaxed flex-1 mb-6">
              "{t.quote}"
            </p>
            <div>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-muted-foreground text-xs">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
