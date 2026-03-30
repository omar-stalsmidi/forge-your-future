import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Zap, Rocket, Crown } from "lucide-react";
import { motion } from "framer-motion";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const tiers = [
  {
    name: "STARTER",
    price: "$97",
    period: "/mo",
    description: "Everything you need to get organized and start running your business like a pro.",
    icon: Zap,
    features: [
      "CRM — manage leads & customers",
      "Job management & scheduling",
      "Invoicing & payments",
      "Basic automations",
      "Calendar booking page",
      "Pipeline tracking",
      "Mobile app access",
      "Email & SMS notifications",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "GROWTH",
    price: "$197",
    period: "/mo",
    description: "Scale your operation with marketing tools, advanced automations, and team features.",
    icon: Rocket,
    features: [
      "Everything in STARTER",
      "Reputation management",
      "Google review automation",
      "Website & funnel builder",
      "Advanced workflow automations",
      "Team management & permissions",
      "Reporting & analytics dashboard",
      "Custom forms & surveys",
      "Social media scheduling",
    ],
    highlighted: true,
    cta: "Start Growing",
  },
  {
    name: "EMPIRE",
    price: "$397",
    period: "/mo",
    description: "The full command center for trades businesses ready to dominate their market.",
    icon: Crown,
    features: [
      "Everything in GROWTH",
      "White-label client portal",
      "AI-powered follow-ups",
      "Advanced reporting & forecasting",
      "Multi-location support",
      "Priority support",
      "Custom integrations",
      "Dedicated onboarding session",
      "Ad campaign management",
      "Membership & course hosting",
    ],
    highlighted: false,
    cta: "Build Your Empire",
  },
];

const Systems = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6">
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-primary mb-4">
              Built for the Trades
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Your Business.{" "}
              <span className="text-primary">One System.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              CRM, job management, invoicing, automations, scheduling, pipelines,
              forms, reporting — all in one place, built specifically for
              tradespeople.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-24 px-6">
        <div className="container mx-auto grid gap-8 md:grid-cols-3 max-w-6xl">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                tier.highlighted
                  ? "border-primary bg-primary/5 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.3)]"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <tier.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-black text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground text-sm">{tier.period}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>

              <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  variant={tier.highlighted ? "hero" : "outline"}
                  className="w-full"
                >
                  {tier.cta} <ArrowRight className="ml-2 !size-4" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Systems;
