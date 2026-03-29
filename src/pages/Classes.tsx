import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const courses = [
  {
    title: "Foundations of a Trades Business",
    description: "Everything you need to go from employee to business owner. Covers licensing, insurance, pricing, and landing your first clients.",
    duration: "8 Modules",
    level: "Beginner",
    price: "$49/mo",
    featured: true,
  },
  {
    title: "Advanced Estimating & Bidding",
    description: "Stop leaving money on the table. Learn professional estimating techniques that win jobs and protect your margins.",
    duration: "6 Modules",
    level: "Intermediate",
    price: "$49/mo",
    featured: false,
  },
  {
    title: "Scaling with Crews",
    description: "Hire, train, and manage crews that deliver quality work without you on every job site.",
    duration: "5 Modules",
    level: "Advanced",
    price: "$49/mo",
    featured: false,
  },
  {
    title: "Marketing for Tradesmen",
    description: "Get a steady flow of leads using Google, social media, and referral systems built for the trades.",
    duration: "7 Modules",
    level: "All Levels",
    price: "$49/mo",
    featured: false,
  },
];

const Classes = () => {
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
                Learn at Your Pace
              </span>
              <div className="h-px w-10 bg-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display mb-4">
              <span className="text-foreground">THE </span>
              <span className="text-primary">CLASSES</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Subscription-based courses built by tradesmen, for tradesmen.
              Cancel anytime — no contracts, no BS.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-xl border p-8 transition-all hover:border-primary/50 ${
                  course.featured
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/30"
                }`}
              >
                {course.featured && (
                  <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-foreground mb-3">{course.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{course.description}</p>
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <PlayCircle className="w-4 h-4 text-primary" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-primary" />
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    Self-Paced
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-foreground">{course.price}</span>
                  <Button variant={course.featured ? "hero" : "heroOutline"} size="default">
                    Enroll Now <ArrowRight className="ml-1 !size-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
            NOT SURE WHERE TO START?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Join the free Forge community and get guidance from tradesmen who've been in your boots.
          </p>
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">
              Join Forge — It's Free <ArrowRight className="ml-2 !size-5" />
            </Button>
          </a>
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

export default Classes;
