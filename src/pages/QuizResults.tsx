import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  CheckCircle,
  Rocket,
  Target,
  Wrench,
  Users,
  BookOpen,
  Palette,
  Globe,
  Settings,
  BarChart3,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

type QuizData = {
  firstName: string;
  currentStatus: string;
  feeling: string;
  biggestChallenge: string;
  goals: string;
  annualRevenue: string;
  marketingCurrent: string;
};

const getPersonalizedFAQ = (data: QuizData) => {
  const faqs: { q: string; a: string }[] = [];

  if (data.currentStatus === "employee") {
    faqs.push(
      {
        q: "How do I start a trades business with no clients?",
        a: "Every successful trades business started with zero clients. The key is to build a professional presence from day one — logo, website, and a simple system to track leads. Start by telling everyone you know, and set up a Google Business profile. Our 'Made for You' package handles all the setup so you can focus on landing that first job.",
      },
      {
        q: "Do I need a lot of money saved up?",
        a: "Not as much as you think. Many tradesmen start with basic tools they already own. Your biggest investments will be insurance, a vehicle (if you don't have one), and setting up your business properly. We help you plan the financial side so there are no surprises.",
      },
      {
        q: "What if I fail?",
        a: "The trades industry has one of the highest success rates for small businesses because there's always demand. With the right systems and guidance from people who've done it before, your odds are stacked in your favor. The biggest risk? Staying where you are and wondering 'what if.'",
      },
      {
        q: "How long until I can replace my current income?",
        a: "Most tradesmen in our community start matching their employee income within 3-6 months. Some do it faster. It depends on your trade, area, and how aggressively you pursue it. We'll help you build a realistic timeline based on your situation.",
      }
    );
  } else {
    if (data.biggestChallenge === "getting_clients" || data.marketingCurrent === "word_of_mouth") {
      faqs.push({
        q: "How do I get more clients beyond word of mouth?",
        a: "Word of mouth is powerful but unpredictable. You need a marketing system that works while you work. This means a professional website with SEO, a Google Business profile with reviews, and a simple follow-up system. Our blueprints walk you through setting all of this up step by step.",
      });
    }
    if (data.biggestChallenge === "scaling") {
      faqs.push({
        q: "How do I scale without sacrificing quality?",
        a: "Scaling isn't about doing more work — it's about building systems that let your team deliver the same quality you would. Standard operating procedures, quality checklists, and a good job management system are the foundations. Our blueprint covers exactly how to set these up.",
      });
    }
    if (data.biggestChallenge === "streamlining" || data.biggestChallenge === "systems") {
      faqs.push({
        q: "What systems do I actually need?",
        a: "At minimum: a CRM to track leads, a job management tool to schedule work, and an invoicing system to get paid fast. Ideally, these are connected so nothing falls through the cracks. We recommend and set up integrated platforms that handle all three.",
      });
    }
    if (data.biggestChallenge === "hiring") {
      faqs.push({
        q: "How do I find and keep good workers?",
        a: "Good people want to work for good businesses. That means competitive pay, clear expectations, and a professional operation. Start by making your business attractive — branded trucks, organized job sites, and a culture of respect. Our community is full of owners who've cracked this code.",
      });
    }
    if (data.biggestChallenge === "pricing") {
      faqs.push({
        q: "How do I know if I'm charging enough?",
        a: "Most tradesmen undercharge. The formula is simple: know your true costs (materials, labor, overhead, insurance), add your desired profit margin, and price accordingly. Stop competing on price — compete on professionalism and reliability. Our blueprints include pricing frameworks specific to trades businesses.",
      });
    }
    faqs.push(
      {
        q: "Can I really grow my business while still doing the work?",
        a: "Yes, but it requires a shift in thinking. You need to carve out time for business development — even if it's just 30 minutes a day. Our resources are designed for busy tradesmen who can't afford to stop working to learn. Small, consistent steps compound into massive results.",
      },
      {
        q: "What makes Forge different from other business programs?",
        a: "We're tradesmen who built trades businesses. No generic business advice from people who've never held a tool. Everything we teach is specific to the trades industry, battle-tested, and built for people who'd rather be on a job site than behind a desk.",
      }
    );
  }

  return faqs;
};

const QuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData as QuizData | undefined;

  if (!quizData) {
    return <Navigate to="/quiz" replace />;
  }

  const isEmployee = quizData.currentStatus === "employee";
  const isSideHustle = quizData.currentStatus === "side_hustle";
  const faqs = getPersonalizedFAQ(quizData);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* Hero greeting */}
      <section className="container mx-auto px-6 pt-28 pb-16 max-w-3xl text-center">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-wider">
              Quiz Complete
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-foreground mb-4">
            HERE'S YOUR PLAN,{" "}
            <span className="text-gradient">{quizData.firstName.toUpperCase()}.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Based on your answers, here's what we recommend to help you{" "}
            {isEmployee
              ? "launch your own trades business"
              : isSideHustle
              ? "turn your side hustle into a full-time operation"
              : "take your business to the next level"}
            .
          </p>
        </motion.div>
      </section>

      {/* Personalized FAQ */}
      <section className="container mx-auto px-6 pb-16 max-w-3xl">
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-2 text-center">
            QUESTIONS YOU MIGHT HAVE
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            We've answered the ones most relevant to your situation.
          </p>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card/60 border border-border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-foreground text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* Recommendations */}
      <section className="container mx-auto px-6 pb-16 max-w-4xl">
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-3xl md:text-4xl font-display text-foreground mb-2 text-center">
            WHAT WE RECOMMEND FOR YOU
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            {isEmployee
              ? "Everything you need to go from employee to business owner."
              : "The resources that will make the biggest impact for your business right now."}
          </p>

          <div className="space-y-6">
            {/* Made for You - for employees and side hustlers */}
            {(isEmployee || isSideHustle) && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-2xl p-8 md:p-10"
              >
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Recommended
                </div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display text-foreground">
                      MADE FOR YOU PACKAGE
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Your complete business launch — done for you.
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Palette, text: "Custom logo & brand identity" },
                    { icon: Globe, text: "Professional website — ready to go" },
                    { icon: Settings, text: "Full CRM platform setup" },
                    { icon: BarChart3, text: "Job management system" },
                    { icon: Target, text: "Marketing starter kit" },
                    { icon: BookOpen, text: "Business setup guidance" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm mb-6">
                  Stop spending months figuring out logos, websites, and systems.
                  We build it all for you so you can focus on what you do best —
                  <span className="text-foreground font-semibold"> the work</span>.
                </p>

                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => navigate("/blueprints")}
                >
                  Learn More About This Package <ArrowRight className="ml-2 !size-5" />
                </Button>
              </motion.div>
            )}

            {/* Blueprints - for business owners */}
            {(quizData.currentStatus === "business_owner" || isSideHustle) && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.35 }}
                className={`bg-card/60 border rounded-2xl p-8 md:p-10 ${
                  quizData.currentStatus === "business_owner"
                    ? "border-primary/30 border-2"
                    : "border-border"
                }`}
              >
                {quizData.currentStatus === "business_owner" && (
                  <div className="inline-block bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    Recommended
                  </div>
                )}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-display text-foreground">
                      THE BLUEPRINTS
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      Step-by-step guides built for trades businesses.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  {quizData.biggestChallenge === "getting_clients"
                    ? "Our marketing blueprint will show you exactly how to build a lead generation machine — from Google Business optimization to a referral system that runs on autopilot."
                    : quizData.biggestChallenge === "scaling"
                    ? "Our scaling blueprint covers hiring, systems, and delegation strategies that let you grow without being on every job site."
                    : quizData.biggestChallenge === "streamlining" || quizData.biggestChallenge === "systems"
                    ? "Our operations blueprint walks you through setting up CRM, job scheduling, invoicing, and automated follow-ups — everything you need to run a tight ship."
                    : "Our blueprints cover marketing, operations, scaling, and finances — each one tailored specifically to trades businesses like yours."}
                </p>
                <Button
                  variant={quizData.currentStatus === "business_owner" ? "hero" : "heroOutline"}
                  size="lg"
                  onClick={() => navigate("/blueprints")}
                >
                  Explore The Blueprints <ArrowRight className="ml-2 !size-4" />
                </Button>
              </motion.div>
            )}

            {/* Classes */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card/60 border border-border rounded-2xl p-8 md:p-10"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display text-foreground">
                    THE CLASSES
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Live and recorded sessions from real business owners.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Learn directly from tradesmen who've built successful businesses. Practical,
                no-fluff lessons you can apply immediately — from pricing jobs to managing crews.
              </p>
              <Button variant="heroOutline" size="lg" onClick={() => navigate("/classes")}>
                Browse Classes <ArrowRight className="ml-2 !size-4" />
              </Button>
            </motion.div>

            {/* Community */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="bg-card/60 border border-border rounded-2xl p-8 md:p-10"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-display text-foreground">
                    JOIN THE COMMUNITY
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Free to join — connect with other tradesmen on Skool.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                Ask questions, share wins, and learn from a network of tradesmen who get it.
                No cost, no catch — just a community of people building something better.
              </p>
              <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="heroOutline" size="lg">
                  Join Forge on Skool — Free <ArrowRight className="ml-2 !size-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-6 pb-20 max-w-3xl text-center">
        <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.5 }}>
          <div className="bg-card/80 border border-border rounded-2xl p-10">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
              READY TO MAKE A MOVE?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You've got the skills. You've got the drive. Now get the roadmap.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {(isEmployee || isSideHustle) ? (
                <Button variant="hero" size="xl" onClick={() => navigate("/blueprints")}>
                  Get The Made For You Package <ArrowRight className="ml-2 !size-5" />
                </Button>
              ) : (
                <Button variant="hero" size="xl" onClick={() => navigate("/blueprints")}>
                  Explore The Blueprints <ArrowRight className="ml-2 !size-5" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default QuizResults;
