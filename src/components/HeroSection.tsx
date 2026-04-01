import { motion, AnimatePresence } from "framer-motion";
import heroImage from "@/assets/hero-construction.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ROTATING_WORDS = ["Start", "Build", "Optimise", "Sell", "Hire", "Scale"];

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const HeroSection = () => {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img
          src={heroImage}
          alt="Construction site at sunset with cranes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-background/70 backdrop-blur-xl rounded-2xl border border-border/30 px-5 py-6 md:px-20 md:py-10 max-w-5xl shadow-2xl w-full"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6"
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary uppercase text-xs md:text-sm font-bold tracking-[0.15em] md:tracking-[0.2em]">
              For Every Tradesman
            </span>
            <div className="h-px w-10 bg-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display leading-none mb-4 md:mb-6 inline-flex items-baseline gap-2 whitespace-nowrap"
          >
            <span className="text-foreground">WE HELP YOU</span>
            <span className="relative inline-flex items-baseline h-[1em] overflow-visible">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIndex]}
                  initial={{ y: "0.35em", opacity: 0 }}
                  animate={{ y: "0em", opacity: 1 }}
                  exit={{ y: "-0.35em", opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-gradient inline-block"
                >
                  {ROTATING_WORDS[wordIndex].toUpperCase()}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto mb-6 md:mb-10 leading-relaxed"
          >
            Whether you're an employee ready to go solo, or a business owner
            looking to scale —{" "}
            <span className="text-foreground font-semibold">
              we've got the blueprints, the systems, the tools, and the community
            </span>{" "}
            to get you there.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col items-center gap-4 md:gap-6 mb-8 md:mb-12"
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate("/quiz")}
            >
              Let Us Help You <ArrowRight className="ml-2 !size-5" />
            </Button>
          </motion.div>

          {/* Secondary - Skool community */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="border-t border-border/30 pt-6 md:pt-8"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">
                We're now on Skool! Learn from other business owners in our{" "}
                <span className="text-foreground font-semibold">free community</span>.
              </p>
            </div>
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="heroOutline" size="lg" className="text-xs md:text-sm w-full">
                Join Forge Community — It's Free
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
