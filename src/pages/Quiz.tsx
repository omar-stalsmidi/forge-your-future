import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, Shield, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

type QuizData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  currentStatus: string;
  feeling: string;
  businessType: string;
  yearsInBusiness: string;
  annualRevenue: string;
  biggestChallenge: string;
  teamSize: string;
  tradeExperience: string;
  timelineToStart: string;
  savingsReady: string;
  marketingCurrent: string;
  goals: string;
  termsAccepted: boolean;
};

const initialData: QuizData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  currentStatus: "",
  feeling: "",
  businessType: "",
  yearsInBusiness: "",
  annualRevenue: "",
  biggestChallenge: "",
  teamSize: "",
  tradeExperience: "",
  timelineToStart: "",
  savingsReady: "",
  marketingCurrent: "",
  goals: "",
  termsAccepted: false,
};

const TRADES = [
  "Electrician",
  "Plumber",
  "HVAC",
  "General Contractor",
  "Carpenter",
  "Roofer",
  "Painter",
  "Landscaper",
  "Welder",
  "Mason / Concrete",
  "Other",
];

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof QuizData, value: string | boolean) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const totalSteps = data.currentStatus === "employee" ? 7 : 7;

  const canContinue = (): boolean => {
    switch (step) {
      case 0:
        return data.termsAccepted;
      case 1:
        return !!(data.firstName && data.lastName && data.email && data.country && data.state);
      case 2:
        return !!data.currentStatus;
      case 3:
        return !!data.feeling;
      case 4:
        if (data.currentStatus === "employee") {
          return !!(data.businessType && data.tradeExperience);
        }
        return !!(data.businessType && data.yearsInBusiness);
      case 5:
        if (data.currentStatus === "employee") {
          return !!(data.timelineToStart && data.savingsReady);
        }
        return !!(data.annualRevenue && data.biggestChallenge);
      case 6:
        return !!(data.marketingCurrent && data.goals);
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("quiz_leads").insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        country: data.country,
        state: data.state,
        current_status: data.currentStatus,
        feeling: data.feeling,
        business_type: data.businessType || null,
        years_in_business: data.yearsInBusiness || null,
        annual_revenue: data.annualRevenue || null,
        biggest_challenge: data.biggestChallenge || null,
        team_size: data.teamSize || null,
        trade_experience: data.tradeExperience || null,
        timeline_to_start: data.timelineToStart || null,
        savings_ready: data.savingsReady === "yes" ? true : data.savingsReady === "no" ? false : null,
        marketing_current: data.marketingCurrent || null,
        goals: data.goals || null,
        terms_accepted: data.termsAccepted,
        terms_accepted_at: new Date().toISOString(),
      });

      if (error) throw error;

      navigate("/quiz/results", { state: { quizData: data } });
    } catch (err) {
      console.error("Quiz submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const progress = ((step + 1) / (totalSteps + 1)) * 100;

  const slideVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  const renderRadioOption = (field: keyof QuizData, value: string, label: string, desc?: string) => (
    <label
      key={value}
      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
        data[field] === value
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/40 bg-card/50"
      }`}
    >
      <RadioGroupItem value={value} className="mt-0.5" />
      <div>
        <p className="text-foreground font-medium">{label}</p>
        {desc && <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>}
      </div>
    </label>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                BEFORE WE START
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We need to collect some information to give you personalized recommendations.
                Your data is kept secure and will only be used to help you.
              </p>
            </div>
            <div className="bg-card/80 border border-border rounded-xl p-6 text-sm text-muted-foreground space-y-3">
              <p>
                By proceeding, you agree that Forge may collect and store the personal
                information you provide in this quiz. This includes your name, email,
                location, and business details.
              </p>
              <p>
                We will use this data solely to provide you with tailored recommendations
                and may contact you with relevant offers. We will never sell your data to
                third parties.
              </p>
              <p>
                You may request deletion of your data at any time by contacting us.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={data.termsAccepted}
                onCheckedChange={(checked) => update("termsAccepted", !!checked)}
              />
              <Label htmlFor="terms" className="text-foreground cursor-pointer">
                I agree to the terms of data collection and usage described above
              </Label>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                TELL US ABOUT YOURSELF
              </h2>
              <p className="text-muted-foreground">Let's start with the basics.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">First Name *</Label>
                <Input
                  value={data.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="John"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label className="text-foreground">Last Name *</Label>
                <Input
                  value={data.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Smith"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label className="text-foreground">Email *</Label>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="john@example.com"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label className="text-foreground">Phone (optional)</Label>
              <Input
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="mt-1.5"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Country *</Label>
                <Input
                  value={data.country}
                  onChange={(e) => update("country", e.target.value)}
                  placeholder="United States"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label className="text-foreground">State / Province *</Label>
                <Input
                  value={data.state}
                  onChange={(e) => update("state", e.target.value)}
                  placeholder="Texas"
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                WHERE ARE YOU RIGHT NOW?
              </h2>
              <p className="text-muted-foreground">No wrong answers — just helps us point you in the right direction.</p>
            </div>
            <RadioGroup
              value={data.currentStatus}
              onValueChange={(val) => update("currentStatus", val)}
              className="space-y-3"
            >
              {renderRadioOption("currentStatus", "employee", "I'm an Employee", "Working for someone else but thinking about going out on my own")}
              {renderRadioOption("currentStatus", "side_hustle", "Side Hustle", "I've started picking up jobs on the side but haven't gone full-time yet")}
              {renderRadioOption("currentStatus", "business_owner", "Business Owner", "I already run my own trades business")}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                HOW ARE YOU FEELING?
              </h2>
              <p className="text-muted-foreground">Be honest — we've all been there.</p>
            </div>
            <RadioGroup
              value={data.feeling}
              onValueChange={(val) => update("feeling", val)}
              className="space-y-3"
            >
              {renderRadioOption("feeling", "stuck", "Stuck & Frustrated", "I know I can do more but I don't know where to start or what to do next")}
              {renderRadioOption("feeling", "accelerate", "Ready to Accelerate", "Things are moving but I want to grow faster and smarter")}
              {renderRadioOption("feeling", "starting_fresh", "Starting Fresh", "I'm at the beginning and need a roadmap to get going")}
              {renderRadioOption("feeling", "overwhelmed", "Overwhelmed", "I'm doing everything myself and it's burning me out")}
            </RadioGroup>
          </div>
        );

      case 4:
        if (data.currentStatus === "employee") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                  YOUR TRADE & EXPERIENCE
                </h2>
                <p className="text-muted-foreground">Tell us about your skillset.</p>
              </div>
              <div>
                <Label className="text-foreground">What's your trade? *</Label>
                <RadioGroup
                  value={data.businessType}
                  onValueChange={(val) => update("businessType", val)}
                  className="grid grid-cols-2 gap-2 mt-2"
                >
                  {TRADES.map((trade) => (
                    <label
                      key={trade}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm transition-all ${
                        data.businessType === trade
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/40 bg-card/50"
                      }`}
                    >
                      <RadioGroupItem value={trade} />
                      <span className="text-foreground">{trade}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label className="text-foreground">Years of experience in your trade *</Label>
                <RadioGroup
                  value={data.tradeExperience}
                  onValueChange={(val) => update("tradeExperience", val)}
                  className="space-y-2 mt-2"
                >
                  {renderRadioOption("tradeExperience", "0-2", "0 – 2 years")}
                  {renderRadioOption("tradeExperience", "3-5", "3 – 5 years")}
                  {renderRadioOption("tradeExperience", "5-10", "5 – 10 years")}
                  {renderRadioOption("tradeExperience", "10+", "10+ years")}
                </RadioGroup>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                YOUR BUSINESS
              </h2>
              <p className="text-muted-foreground">Help us understand where your business is at.</p>
            </div>
            <div>
              <Label className="text-foreground">What type of trade? *</Label>
              <RadioGroup
                value={data.businessType}
                onValueChange={(val) => update("businessType", val)}
                className="grid grid-cols-2 gap-2 mt-2"
              >
                {TRADES.map((trade) => (
                  <label
                    key={trade}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm transition-all ${
                      data.businessType === trade
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40 bg-card/50"
                    }`}
                  >
                    <RadioGroupItem value={trade} />
                    <span className="text-foreground">{trade}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label className="text-foreground">How long have you been in business? *</Label>
              <RadioGroup
                value={data.yearsInBusiness}
                onValueChange={(val) => update("yearsInBusiness", val)}
                className="space-y-2 mt-2"
              >
                {renderRadioOption("yearsInBusiness", "0-1", "Less than 1 year")}
                {renderRadioOption("yearsInBusiness", "1-3", "1 – 3 years")}
                {renderRadioOption("yearsInBusiness", "3-5", "3 – 5 years")}
                {renderRadioOption("yearsInBusiness", "5-10", "5 – 10 years")}
                {renderRadioOption("yearsInBusiness", "10+", "10+ years")}
              </RadioGroup>
            </div>
            <div>
              <Label className="text-foreground">Team size</Label>
              <RadioGroup
                value={data.teamSize}
                onValueChange={(val) => update("teamSize", val)}
                className="space-y-2 mt-2"
              >
                {renderRadioOption("teamSize", "just_me", "Just me")}
                {renderRadioOption("teamSize", "2-5", "2 – 5 people")}
                {renderRadioOption("teamSize", "6-15", "6 – 15 people")}
                {renderRadioOption("teamSize", "15+", "15+ people")}
              </RadioGroup>
            </div>
          </div>
        );

      case 5:
        if (data.currentStatus === "employee") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                  YOUR PLAN TO GO SOLO
                </h2>
                <p className="text-muted-foreground">Let's see how ready you are.</p>
              </div>
              <div>
                <Label className="text-foreground">When do you want to start your own business? *</Label>
                <RadioGroup
                  value={data.timelineToStart}
                  onValueChange={(val) => update("timelineToStart", val)}
                  className="space-y-2 mt-2"
                >
                  {renderRadioOption("timelineToStart", "asap", "As soon as possible", "I'm ready to make the jump")}
                  {renderRadioOption("timelineToStart", "3-6months", "Within 3 – 6 months", "Planning my exit strategy")}
                  {renderRadioOption("timelineToStart", "6-12months", "6 – 12 months", "Still building up resources")}
                  {renderRadioOption("timelineToStart", "not_sure", "Not sure yet", "Exploring my options")}
                </RadioGroup>
              </div>
              <div>
                <Label className="text-foreground">Do you have savings set aside to start? *</Label>
                <RadioGroup
                  value={data.savingsReady}
                  onValueChange={(val) => update("savingsReady", val)}
                  className="space-y-2 mt-2"
                >
                  {renderRadioOption("savingsReady", "yes", "Yes", "I've been putting money away")}
                  {renderRadioOption("savingsReady", "some", "Some, but not enough", "I need to save more")}
                  {renderRadioOption("savingsReady", "no", "Not really", "I need help figuring out the financial side")}
                </RadioGroup>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                REVENUE & CHALLENGES
              </h2>
              <p className="text-muted-foreground">This helps us recommend the right resources.</p>
            </div>
            <div>
              <Label className="text-foreground">Annual revenue (approx.) *</Label>
              <RadioGroup
                value={data.annualRevenue}
                onValueChange={(val) => update("annualRevenue", val)}
                className="space-y-2 mt-2"
              >
                {renderRadioOption("annualRevenue", "under_50k", "Under $50K")}
                {renderRadioOption("annualRevenue", "50k_100k", "$50K – $100K")}
                {renderRadioOption("annualRevenue", "100k_250k", "$100K – $250K")}
                {renderRadioOption("annualRevenue", "250k_500k", "$250K – $500K")}
                {renderRadioOption("annualRevenue", "500k_1m", "$500K – $1M")}
                {renderRadioOption("annualRevenue", "1m_plus", "$1M+")}
              </RadioGroup>
            </div>
            <div>
              <Label className="text-foreground">What's your biggest challenge right now? *</Label>
              <RadioGroup
                value={data.biggestChallenge}
                onValueChange={(val) => update("biggestChallenge", val)}
                className="space-y-2 mt-2"
              >
                {renderRadioOption("biggestChallenge", "getting_clients", "Getting more clients", "Marketing and lead generation")}
                {renderRadioOption("biggestChallenge", "scaling", "Scaling up", "Growing without losing quality")}
                {renderRadioOption("biggestChallenge", "streamlining", "Streamlining operations", "Too much admin, not enough building")}
                {renderRadioOption("biggestChallenge", "hiring", "Finding & keeping good people", "Hiring and retention")}
                {renderRadioOption("biggestChallenge", "systems", "Setting up systems", "CRM, scheduling, job management")}
                {renderRadioOption("biggestChallenge", "pricing", "Pricing & profitability", "Not sure if I'm charging enough")}
              </RadioGroup>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                ALMOST DONE
              </h2>
              <p className="text-muted-foreground">A couple more things and we'll build your personalized plan.</p>
            </div>
            <div>
              <Label className="text-foreground">How do you currently get clients? *</Label>
              <RadioGroup
                value={data.marketingCurrent}
                onValueChange={(val) => update("marketingCurrent", val)}
                className="space-y-2 mt-2"
              >
                {renderRadioOption("marketingCurrent", "word_of_mouth", "Word of mouth only")}
                {renderRadioOption("marketingCurrent", "social_media", "Social media")}
                {renderRadioOption("marketingCurrent", "google_ads", "Google / Paid ads")}
                {renderRadioOption("marketingCurrent", "website_seo", "Website & SEO")}
                {renderRadioOption("marketingCurrent", "referral_network", "Referral network / partnerships")}
                {renderRadioOption("marketingCurrent", "none_yet", "I don't have clients yet")}
              </RadioGroup>
            </div>
            <div>
              <Label className="text-foreground">What's your #1 goal in the next 12 months? *</Label>
              <RadioGroup
                value={data.goals}
                onValueChange={(val) => update("goals", val)}
                className="space-y-2 mt-2"
              >
                {renderRadioOption("goals", "start_business", "Start my own business")}
                {renderRadioOption("goals", "double_revenue", "Double my revenue")}
                {renderRadioOption("goals", "hire_team", "Build a team")}
                {renderRadioOption("goals", "systemize", "Systemize & automate")}
                {renderRadioOption("goals", "work_life", "Better work-life balance")}
                {renderRadioOption("goals", "exit_strategy", "Build something I can sell one day")}
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-20 max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {step + 1} of {totalSteps + 1}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <Button
            variant="heroOutline"
            size="lg"
            onClick={back}
            disabled={step === 0}
            className={step === 0 ? "invisible" : ""}
          >
            <ArrowLeft className="mr-2 !size-4" /> Back
          </Button>

          {step < totalSteps ? (
            <Button
              variant="hero"
              size="lg"
              onClick={next}
              disabled={!canContinue()}
            >
              Continue <ArrowRight className="ml-2 !size-4" />
            </Button>
          ) : (
            <Button
              variant="hero"
              size="lg"
              onClick={handleSubmit}
              disabled={!canContinue() || submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 !size-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  See My Recommendations <ArrowRight className="ml-2 !size-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Quiz;
