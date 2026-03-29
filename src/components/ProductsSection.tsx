import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  return (
    <section className="py-28 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-primary" />
            <span className="text-primary uppercase text-sm font-bold tracking-[0.2em]">
              Level Up
            </span>
            <div className="h-px w-10 bg-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[0.9] mb-5">
            INVEST IN <span className="text-gradient">YOUR TRADE</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you learn best through guided courses or prefer a hands-on playbook you can reference on the job — we've got you covered.
            Pick your path and start building something real.
          </p>
        </motion.div>

        {/* Two paths */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Classes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border/50 bg-secondary/30 p-10 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-display text-foreground mb-3">THE CLASSES</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Subscription-based courses that walk you through every stage of building a trades business — from startup to scaling crews. Learn at your own pace with new content every month.
            </p>
            <Link to="/classes" className="mt-auto">
              <Button variant="hero" size="lg">
                Explore Classes <ArrowRight className="ml-2 !size-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Blueprints */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-border/50 bg-secondary/30 p-10 flex flex-col items-center text-center hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-display text-foreground mb-3">THE BLUEPRINTS</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              One-time purchase guides, templates, and toolkits you keep forever. Grab what you need, download it, and put it to work on your next job.
            </p>
            <Link to="/blueprints" className="mt-auto">
              <Button variant="heroOutline" size="lg">
                Browse Blueprints <ArrowRight className="ml-2 !size-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
