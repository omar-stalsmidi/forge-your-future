import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const CTASection = () => {
  return (
    <section className="py-32 bg-card relative overflow-hidden">
      {/* Amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display mb-6 leading-[0.9]">
            YOUR FUTURE
            <br />
            WON'T <span className="text-gradient">BUILD ITSELF</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
            Connect with driven tradesmen. Learn from real experience.
            Stop waiting. Start forging.
          </p>
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">
              Join Forge — It's Free <ArrowRight className="ml-2 !size-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
