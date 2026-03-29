import { motion } from "framer-motion";
import { Bot, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Growth<span className="text-primary">AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Features
          </a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            How It Works
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            Contact
          </a>
          <Button size="sm" className="font-semibold">
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border px-6 pb-6 flex flex-col gap-4"
        >
          <a href="#features" className="text-muted-foreground hover:text-foreground py-2" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground py-2" onClick={() => setIsOpen(false)}>How It Works</a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground py-2" onClick={() => setIsOpen(false)}>Contact</a>
          <Button className="font-semibold w-full">Get Started</Button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
