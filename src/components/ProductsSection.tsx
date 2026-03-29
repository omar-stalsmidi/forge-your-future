import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Zap, BookOpen, FileText, Hammer } from "lucide-react";

const subscriptions = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "For tradesmen ready to launch their own business.",
    icon: Hammer,
    features: [
      "Business launch checklist & templates",
      "Pricing & quoting fundamentals",
      "Monthly live Q&A call",
      "Community access",
    ],
  },
  {
    name: "Growth",
    price: "$79",
    period: "/mo",
    popular: true,
    description: "For owners scaling past the one-man-band stage.",
    icon: Zap,
    features: [
      "Everything in Starter",
      "Hiring & team management playbook",
      "Marketing & lead gen systems",
      "Weekly group coaching calls",
      "Private accountability group",
    ],
  },
  {
    name: "Empire",
    price: "$199",
    period: "/mo",
    description: "For serious operators building a real company.",
    icon: BookOpen,
    features: [
      "Everything in Growth",
      "1-on-1 monthly strategy call",
      "Operations & systems deep-dives",
      "Financial planning & profit maximisation",
      "Priority support & direct access",
    ],
  },
];

const blueprints = [
  {
    name: "The Launch Blueprint",
    price: "$149",
    description: "Step-by-step guide to go from employee to business owner in 90 days.",
    icon: FileText,
  },
  {
    name: "The Hiring Playbook",
    price: "$99",
    description: "Find, hire, and keep reliable tradesmen without losing your mind.",
    icon: FileText,
  },
  {
    name: "The Pricing Masterclass",
    price: "$79",
    description: "Stop leaving money on the table. Price jobs for profit, not just survival.",
    icon: FileText,
  },
  {
    name: "The Marketing Engine",
    price: "$129",
    description: "Generate consistent leads without relying on word-of-mouth alone.",
    icon: FileText,
  },
];

const ProductsSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
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
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Monthly coaching or one-time blueprints — pick what fits your stage and start building something real.
          </p>
        </motion.div>

        {/* Subscriptions */}
        <div className="mb-24">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-3"
          >
            <div className="h-px w-6 bg-muted-foreground/40" />
            Monthly Subscriptions
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-6">
            {subscriptions.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  className={`relative h-full flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                    plan.popular
                      ? "border-primary/50 bg-primary/5 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.2)]"
                      : "border-border/50 bg-card/60 hover:border-primary/30"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <plan.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-display">{plan.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-6">
                      <span className="text-4xl font-display text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-secondary-foreground">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={plan.popular ? "hero" : "heroOutline"}
                      size="lg"
                      className="w-full"
                    >
                      Get Started <ArrowRight className="ml-1 !size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blueprints */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-8 flex items-center gap-3"
          >
            <div className="h-px w-6 bg-muted-foreground/40" />
            One-Time Blueprints
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blueprints.map((bp, i) => (
              <motion.div
                key={bp.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="h-full flex flex-col border border-border/50 bg-card/60 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center mb-3 group-hover:border-primary/30 transition-colors">
                      <bp.icon className="w-4 h-4 text-primary" />
                    </div>
                    <CardTitle className="text-base font-display leading-tight">{bp.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pt-0">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{bp.description}</p>
                    <p className="text-2xl font-display text-foreground">{bp.price}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="heroOutline" size="default" className="w-full">
                      Get Blueprint
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
