import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, TrendingUp } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: 0.2 + i * 0.15, ease: "easeOut" },
  }),
};

const WhoSection = () => {
  return (
    <section id="who" className="py-24 bg-card relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary uppercase text-sm font-bold tracking-[0.2em]">Who This Is For</span>
            <div className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-display mb-4">
            WHICH ONE <span className="text-gradient">ARE YOU?</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're ready to break free or ready to break through — Forge meets you where you are.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-500 bg-background overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Wrench className="text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display mb-4 text-foreground">
                "I'm Stuck Working For Someone Else"
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                You've got the skills and the work ethic. But every day you clock in, you're building
                <span className="text-foreground font-medium"> their</span> empire — not yours. You know you're worth more.
              </p>
              <ul className="space-y-3 text-secondary-foreground text-sm">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> How to land your first clients</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Pricing, quoting & getting paid</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Building confidence to take the leap</li>
              </ul>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-500 bg-background overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display mb-4 text-foreground">
                "I've Got A Business But I'm Stuck"
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                You took the leap — but now you're drowning in the day-to-day. Revenue is inconsistent. You can't step away.
                <span className="text-foreground font-medium"> You need systems.</span>
              </p>
              <ul className="space-y-3 text-secondary-foreground text-sm">
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Systemise & automate operations</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Hire, delegate & lead a team</li>
                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> Increase profit margins consistently</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">
              Join The Community <ArrowRight className="ml-2 !size-5" />
            </Button>
          </a>
          <p className="text-muted-foreground text-sm mt-4">100% Free to join · No credit card needed</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoSection;
