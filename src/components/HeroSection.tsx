import { motion } from "framer-motion";
import heroImage from "@/assets/hero-construction.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Star, Zap } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const stats = [
  { icon: Users, value: "500+", label: "Members" },
  { icon: Star, value: "Free", label: "To Join" },
  { icon: Zap, value: "24/7", label: "Community" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Construction site at sunset with cranes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-background/85 backdrop-blur-md rounded-2xl border border-border/50 px-8 py-12 md:px-16 md:py-16 max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary uppercase text-sm font-bold tracking-[0.2em]">
              Free Community
            </span>
            <div className="h-px w-10 bg-primary" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] mb-6"
          >
            <span className="text-foreground block">STOP BUILDING</span>
            <span className="text-foreground block">SOMEONE ELSE'S</span>
            <span className="text-gradient block mt-1">FUTURE.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed"
          >
            The blueprint for tradesmen who are done waiting.
            <span className="text-foreground font-semibold"> Learn to launch, grow, and scale </span>
            a trades business that actually works for you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-14"
          >
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl">
                Join Forge — It's Free <ArrowRight className="ml-2 !size-5" />
              </Button>
            </a>
            <a href="#who">
              <Button variant="heroOutline" size="xl">
                See If It's For You
              </Button>
            </a>
          </motion.div>

          {/* Social proof stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center gap-8 items-center"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-foreground font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
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
