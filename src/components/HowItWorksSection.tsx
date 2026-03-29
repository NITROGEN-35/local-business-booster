import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Embed the Form", desc: "Add our lead capture form to your website or share the link directly." },
  { num: "02", title: "AI Replies Instantly", desc: "Every lead gets an intelligent, personalized response in seconds." },
  { num: "03", title: "Track & Close", desc: "View all leads in your dashboard and convert them into paying customers." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-card/50">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Three simple steps to transform your lead generation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="font-mono text-5xl font-bold text-primary/20 mb-4">{step.num}</div>
              <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
