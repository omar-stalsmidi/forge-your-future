import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    title: "Forge Snapback Hat",
    description: "Structured snapback with embroidered Forge logo. Built tough like you.",
    price: "$32",
    image: null,
  },
  {
    title: "Blueprint Tee — Black",
    description: "Premium cotton tee with the Forge blueprint graphic. Comfortable on and off the job.",
    price: "$28",
    image: null,
  },
  {
    title: "Forge Work Hoodie",
    description: "Heavyweight hoodie with kangaroo pocket. Keeps you warm on early morning job sites.",
    price: "$55",
    image: null,
  },
  {
    title: "Hard Hat Sticker Pack",
    description: "Set of 6 die-cut vinyl stickers. Slap 'em on your hard hat, toolbox, or truck.",
    price: "$12",
    image: null,
  },
  {
    title: "Forge Insulated Tumbler",
    description: "30oz stainless steel tumbler with the Forge logo. Keeps coffee hot through the whole shift.",
    price: "$24",
    image: null,
  },
  {
    title: "The Boss Tee — Sand",
    description: "Relaxed-fit tee in sand colorway. \"Built Different\" back print.",
    price: "$28",
    image: null,
  },
];

const Merch = () => {
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
                Rep the Brand
              </span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display mb-4">
              <span className="text-foreground">THE </span>
              <span className="text-primary">MERCH</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Gear built for the jobsite and beyond. Wear the brand, live the grind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-secondary/30 overflow-hidden transition-all hover:border-primary/50 group"
              >
                {/* Placeholder image area */}
                <div className="aspect-square bg-muted/30 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground/30 group-hover:text-primary/30 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">{product.price}</span>
                    <Button variant="heroOutline" size="sm">
                      Add to Cart
                    </Button>
                  </div>
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

export default Merch;
