import HeroSection from "@/components/HeroSection";
import WhoSection from "@/components/WhoSection";
import ProductsSection from "@/components/ProductsSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen">
      <HeroSection />
      <WhoSection />
      <ProductsSection />
      <CTASection />
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Forge — The Trades Business Blueprint
          </p>
          <a
            href="https://www.skool.com/forge-the-trades-blueprint-8794/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Join the Community
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Index;
