import heroImage from "@/assets/hero-tradesman.jpg";
import forgeLogo from "@/assets/forge-logo.png";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Tradesman on construction site"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl">
          {/* Logo */}
          <img
            src={forgeLogo}
            alt="Forge logo"
            className="h-16 w-auto mb-8 animate-fade-up"
          />

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">THE TRADES</span>
            <br />
            <span className="text-foreground">BUSINESS</span>
            <br />
            <span className="text-gradient">BLUEPRINT</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            Stop building someone else's dream.
            <span className="text-foreground font-semibold"> Start building your own.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
            <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="xl">
                Join Forge Free <ArrowRight className="ml-2 !size-5" />
              </Button>
            </a>
            <a href="#who">
              <Button variant="heroOutline" size="xl">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
