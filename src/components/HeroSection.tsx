import { motion } from "framer-motion";
import heroImage from "@/assets/hero-tradesman.jpg";
import forgeLogo from "@/assets/forge-logo.png";
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with cinematic overlay */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          src={heroImage}
          alt="Tradesman on construction site"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Subtle amber glow accent */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          {/* Logo */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            src={forgeLogo}
            alt="Forge logo"
            className="h-14 w-auto mb-10"
          />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary uppercase text-sm font-bold tracking-[0.2em]">
              Free Community
            </span>
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
            <span className="text-gradient block mt-1">EMPIRE.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
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
            className="flex flex-col sm:flex-row gap-4 mb-14"
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
            className="flex gap-8 items-center"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
