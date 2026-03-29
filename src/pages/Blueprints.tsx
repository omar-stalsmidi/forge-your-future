import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Download, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const blueprints = [
  {
    title: "The Startup Blueprint",
    description: "Step-by-step guide to launching your trades business from scratch. Includes checklists, templates, and a 90-day action plan.",
    price: "$29",
    includes: ["90-Day Launch Plan", "Pricing Calculator", "Client Contract Template", "Insurance Checklist"],
    featured: true,
  },
  {
    title: "The Estimating Playbook",
    description: "Never underbid again. A complete system for accurate job estimates that protect your profit margins.",
    price: "$19",
    includes: ["Estimate Template", "Material Cost Tracker", "Markup Guide", "Scope of Work Template"],
    featured: false,
  },
  {
    title: "The Marketing Toolkit",
    description: "Everything you need to get leads without spending a fortune. From Google Business to yard signs that actually work.",
    price: "$24",
    includes: ["Google Business Setup Guide", "Social Media Templates", "Review Request Scripts", "Yard Sign Designs"],
    featured: false,
  },
  {
    title: "The Hiring Handbook",
    description: "Find, vet, and keep reliable workers. Includes interview questions, onboarding checklists, and pay structure guides.",
    price: "$19",
    includes: ["Job Posting Templates", "Interview Question Bank", "Onboarding Checklist", "Pay Structure Guide"],
    featured: false,
  },
  {
    title: "The Complete Bundle",
    description: "All four blueprints at a massive discount. Everything you need to start, grow, and scale.",
    price: "$59",
    includes: ["All 4 Blueprints", "Future Updates Free", "Bonus: Cash Flow Template", "Bonus: Vehicle Wrap Design Guide"],
    featured: true,
  },
];

const Blueprints = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-card">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary uppercase text-sm font-bold tracking-[0.2em]">
                One-Time Purchase
              </span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display mb-4">
              <span className="text-foreground">THE </span>
              <span className="text-primary">BLUEPRINTS</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Downloadable guides, templates, and toolkits you keep forever.
              Buy once — no subscriptions needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blueprints Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blueprints.map((bp, i) => (
              <motion.div
                key={bp.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-xl border p-8 flex flex-col transition-all hover:border-primary/50 ${
                  bp.featured
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/30"
                }`}
              >
                {bp.featured && (
                  <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Best Value
                  </span>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{bp.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">{bp.description}</p>
                <ul className="space-y-2 mb-6">
                  {bp.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-3xl font-bold text-foreground">{bp.price}</span>
                  <Button variant={bp.featured ? "hero" : "heroOutline"} size="default">
                    <Download className="mr-1 !size-4" /> Get It Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border bg-card">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Forge — The Trades Business Blueprint
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Blueprints;
