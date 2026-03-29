import tradesmanImage from "@/assets/tradesman-2.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench, TrendingUp } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const WhoSection = () => {
  return (
    <section id="who" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display text-center mb-4">
          THIS IS FOR <span className="text-gradient">YOU</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
          Whether you're ready to break free or ready to break through — Forge meets you where you are.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="group border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-500 hover:glow-amber bg-background">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-6">
              <Wrench className="text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display mb-4 text-foreground">
              Stuck Working For Someone Else?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              You've got the skills. You've got the work ethic. But every day you clock in, you're building
              <span className="text-foreground font-medium"> their</span> empire — not yours. You know you're worth more.
              Forge gives you the roadmap to finally go out on your own.
            </p>
            <ul className="space-y-2 text-secondary-foreground text-sm mb-6">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> How to land your first clients</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Pricing, quoting & getting paid</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Building confidence to take the leap</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="group border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-500 hover:glow-amber bg-background">
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-6">
              <TrendingUp className="text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-display mb-4 text-foreground">
              Already Running A Business?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              You took the leap — but now you're drowning in the day-to-day. Revenue is inconsistent. You can't step away.
              Forge helps you build
              <span className="text-foreground font-medium"> systems that scale</span> so your business works even when you don't.
            </p>
            <ul className="space-y-2 text-secondary-foreground text-sm mb-6">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Systemise & automate operations</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Hire, delegate & lead a team</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Increase profit margins consistently</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-16">
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">
              Join The Community <ArrowRight className="ml-2 !size-5" />
            </Button>
          </a>
          <p className="text-muted-foreground text-sm mt-4">100% Free to join. No credit card needed.</p>
        </div>
      </div>
    </section>
  );
};

export default WhoSection;
