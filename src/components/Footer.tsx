import { Bot } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-foreground">
            Growth<span className="text-primary">AI</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} GrowthAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
