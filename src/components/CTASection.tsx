import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-background" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display mb-6">
          YOUR FUTURE WON'T
          <br />
          <span className="text-gradient">BUILD ITSELF</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
          Connect with driven tradesmen. Learn from real experience.
          Stop waiting. Start forging.
        </p>
        <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="hero" size="xl">
            Join Forge — It's Free <ArrowRight className="ml-2 !size-5" />
          </Button>
        </a>
      </div>
    </section>
  );
};

export default CTASection;
