import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, ArrowLeft, Shield, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

/* ─── Data ─── */

type QuizData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  trade: string;
  tradeOther: string;
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
  businessStart: string;
  termsAccepted: boolean;
};

const initialData: QuizData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneCountryCode: "+1",
  phone: "",
  country: "",
  city: "",
  state: "",
  trade: "",
  tradeOther: "",
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
  businessStart: "",
  termsAccepted: false,
};

const TRADES = [
  "Electrician",
  "Plumber",
  "HVAC Technician",
  "General Contractor",
  "Carpenter",
  "Roofer",
  "Painter",
  "Landscaper / Lawn Care",
  "Welder",
  "Mason / Concrete",
  "Flooring Installer",
  "Tile Setter",
  "Drywall / Plasterer",
  "Insulation Installer",
  "Fence Installer",
  "Pool Builder / Technician",
  "Pest Control",
  "Locksmith",
  "Glazier / Window Installer",
  "Septic / Excavation",
  "Fire Protection / Sprinkler",
  "Solar Installer",
  "Demolition",
  "Handyman",
  "Other",
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "New Zealand",
  "Ireland",
  "South Africa",
  "Germany",
  "France",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Spain",
  "Portugal",
  "Italy",
  "Mexico",
  "Brazil",
  "Argentina",
  "Colombia",
  "Chile",
  "India",
  "Philippines",
  "Japan",
  "South Korea",
  "Singapore",
  "United Arab Emirates",
  "Saudi Arabia",
  "Israel",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Egypt",
];

const PHONE_CODES = [
  { code: "+1", label: "US / CA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+61", label: "AU (+61)" },
  { code: "+64", label: "NZ (+64)" },
  { code: "+353", label: "IE (+353)" },
  { code: "+27", label: "ZA (+27)" },
  { code: "+49", label: "DE (+49)" },
  { code: "+33", label: "FR (+33)" },
  { code: "+31", label: "NL (+31)" },
  { code: "+32", label: "BE (+32)" },
  { code: "+46", label: "SE (+46)" },
  { code: "+47", label: "NO (+47)" },
  { code: "+45", label: "DK (+45)" },
  { code: "+358", label: "FI (+358)" },
  { code: "+41", label: "CH (+41)" },
  { code: "+43", label: "AT (+43)" },
  { code: "+34", label: "ES (+34)" },
  { code: "+351", label: "PT (+351)" },
  { code: "+39", label: "IT (+39)" },
  { code: "+52", label: "MX (+52)" },
  { code: "+55", label: "BR (+55)" },
  { code: "+54", label: "AR (+54)" },
  { code: "+57", label: "CO (+57)" },
  { code: "+56", label: "CL (+56)" },
  { code: "+91", label: "IN (+91)" },
  { code: "+63", label: "PH (+63)" },
  { code: "+81", label: "JP (+81)" },
  { code: "+82", label: "KR (+82)" },
  { code: "+65", label: "SG (+65)" },
  { code: "+971", label: "AE (+971)" },
  { code: "+966", label: "SA (+966)" },
  { code: "+972", label: "IL (+972)" },
  { code: "+234", label: "NG (+234)" },
  { code: "+254", label: "KE (+254)" },
  { code: "+233", label: "GH (+233)" },
  { code: "+20", label: "EG (+20)" },
];

const US_STATES: Record<string, string> = {
  "new york": "New York",
  "los angeles": "California",
  "chicago": "Illinois",
  "houston": "Texas",
  "phoenix": "Arizona",
  "philadelphia": "Pennsylvania",
  "san antonio": "Texas",
  "san diego": "California",
  "dallas": "Texas",
  "san jose": "California",
  "austin": "Texas",
  "jacksonville": "Florida",
  "fort worth": "Texas",
  "columbus": "Ohio",
  "charlotte": "North Carolina",
  "indianapolis": "Indiana",
  "san francisco": "California",
  "seattle": "Washington",
  "denver": "Colorado",
  "nashville": "Tennessee",
  "oklahoma city": "Oklahoma",
  "el paso": "Texas",
  "boston": "Massachusetts",
  "portland": "Oregon",
  "las vegas": "Nevada",
  "memphis": "Tennessee",
  "louisville": "Kentucky",
  "baltimore": "Maryland",
  "milwaukee": "Wisconsin",
  "albuquerque": "New Mexico",
  "tucson": "Arizona",
  "fresno": "California",
  "mesa": "Arizona",
  "sacramento": "California",
  "atlanta": "Georgia",
  "kansas city": "Missouri",
  "colorado springs": "Colorado",
  "omaha": "Nebraska",
  "raleigh": "North Carolina",
  "miami": "Florida",
  "tampa": "Florida",
  "orlando": "Florida",
  "cleveland": "Ohio",
  "pittsburgh": "Pennsylvania",
  "detroit": "Michigan",
  "minneapolis": "Minnesota",
  "st. louis": "Missouri",
  "salt lake city": "Utah",
  "richmond": "Virginia",
  "boise": "Idaho",
  "des moines": "Iowa",
  "birmingham": "Alabama",
  "honolulu": "Hawaii",
  "anchorage": "Alaska",
  "little rock": "Arkansas",
  "hartford": "Connecticut",
  "wilmington": "Delaware",
  "charleston": "South Carolina",
  "columbia": "South Carolina",
  "savannah": "Georgia",
  "jackson": "Mississippi",
  "billings": "Montana",
  "fargo": "North Dakota",
  "sioux falls": "South Dakota",
  "burlington": "Vermont",
  "cheyenne": "Wyoming",
  "providence": "Rhode Island",
  "manchester": "New Hampshire",
  "portland me": "Maine",
  "charleston wv": "West Virginia",
};

/* ─── Component ─── */

const Quiz = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");

  const update = (field: keyof QuizData, value: string | boolean) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const updateCity = (city: string) => {
    setData((prev) => {
      const newData = { ...prev, city };
      if (prev.country === "United States") {
        const match = US_STATES[city.toLowerCase().trim()];
        newData.state = match || "";
      }
      return newData;
    });
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const totalSteps = 7;

  const filteredPhoneCodes = useMemo(
    () =>
      phoneCodeSearch
        ? PHONE_CODES.filter((p) =>
            p.label.toLowerCase().includes(phoneCodeSearch.toLowerCase())
          )
        : PHONE_CODES,
    [phoneCodeSearch]
  );

  const filteredCountries = useMemo(
    () =>
      countrySearch
        ? COUNTRIES.filter((c) =>
            c.toLowerCase().includes(countrySearch.toLowerCase())
          )
        : COUNTRIES,
    [countrySearch]
  );

  const canContinue = (): boolean => {
    switch (step) {
      case 0:
        return data.termsAccepted;
      case 1:
        return !!(
          data.firstName &&
          data.lastName &&
          data.email &&
          data.country &&
          data.trade &&
          (data.trade !== "Other" || data.tradeOther)
        );
      case 2:
        return !!data.currentStatus;
      case 3:
        return !!data.feeling;
      case 4:
        if (data.currentStatus === "employee") {
          return !!(data.tradeExperience && data.timelineToStart && data.savingsReady);
        }
        if (data.currentStatus === "side_hustle") {
          return !!(data.tradeExperience && data.businessStart && data.annualRevenue);
        }
        return !!(data.tradeExperience && data.businessStart && data.annualRevenue && data.teamSize);
      case 5:
        if (data.currentStatus === "employee") {
          return !!(data.marketingCurrent && data.goals);
        }
        return !!(data.biggestChallenge && data.marketingCurrent);
      case 6:
        return !!data.goals;
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
        phone: data.phone ? `${data.phoneCountryCode} ${data.phone}` : null,
        phone_country_code: data.phoneCountryCode,
        country: data.country,
        city: data.city || null,
        state: data.state || null,
        business_type: data.trade === "Other" ? data.tradeOther : data.trade,
        trade_other: data.trade === "Other" ? data.tradeOther : null,
        current_status: data.currentStatus,
        feeling: data.feeling,
        years_in_business: data.yearsInBusiness || null,
        annual_revenue: data.annualRevenue || null,
        biggest_challenge: data.biggestChallenge || null,
        team_size: data.teamSize || null,
        trade_experience: data.tradeExperience || null,
        timeline_to_start: data.timelineToStart || null,
        savings_ready:
          data.savingsReady === "yes"
            ? true
            : data.savingsReady === "no"
            ? false
            : null,
        marketing_current: data.marketingCurrent || null,
        goals: data.goals || null,
        business_start: data.businessStart || null,
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

  const renderRadioOption = (
    field: keyof QuizData,
    value: string,
    label: string,
    desc?: string
  ) => (
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
        {desc && (
          <p className="text-muted-foreground text-sm mt-0.5">{desc}</p>
        )}
      </div>
    </label>
  );

  const renderStep = () => {
    switch (step) {
      /* ─── Step 0: Terms ─── */
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                BEFORE WE START
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                We need to collect some information to give you personalized
                recommendations. Your data is kept secure and will only be used
                to help you.
              </p>
            </div>
            <div className="bg-card/80 border border-border rounded-xl p-6 text-sm text-muted-foreground space-y-3">
              <p>
                By proceeding, you agree that Forge may collect and store the
                personal information you provide in this quiz. This includes
                your name, email, location, and business details.
              </p>
              <p>
                We will use this data solely to provide you with tailored
                recommendations and may contact you with relevant offers. We
                will never sell your data to third parties.
              </p>
              <p>
                You may request deletion of your data at any time by contacting
                us.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={data.termsAccepted}
                onCheckedChange={(checked) =>
                  update("termsAccepted", !!checked)
                }
              />
              <Label htmlFor="terms" className="text-foreground cursor-pointer">
                I agree to the terms of data collection and usage described
                above
              </Label>
            </div>
          </div>
        );

      /* ─── Step 1: Personal Info ─── */
      case 1:
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                TELL US ABOUT YOURSELF
              </h2>
              <p className="text-muted-foreground">
                Let's start with the basics.
              </p>
            </div>

            {/* Name */}
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

            {/* Trade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={data.trade === "Other" ? "" : "sm:col-span-2"}>
                <Label className="text-foreground">What trade / field are you in? *</Label>
                <Select
                  value={data.trade}
                  onValueChange={(val) => update("trade", val)}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your trade" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRADES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {data.trade === "Other" && (
                <div>
                  <Label className="text-foreground">Your trade *</Label>
                  <Input
                    value={data.tradeOther}
                    onChange={(e) => update("tradeOther", e.target.value)}
                    placeholder="e.g. Irrigation Specialist"
                    className="mt-1.5"
                  />
                </div>
              )}
            </div>

            {/* Email + Phone side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="flex gap-2 mt-1.5">
                  <Select
                    value={data.phoneCountryCode}
                    onValueChange={(val) => update("phoneCountryCode", val)}
                  >
                    <SelectTrigger className="w-[120px] flex-shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="px-2 pb-2 sticky top-0 bg-popover">
                        <div className="flex items-center gap-2 border border-border rounded-md px-2">
                          <Search className="w-3.5 h-3.5 text-muted-foreground" />
                          <input
                            className="w-full py-1.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                            placeholder="Search..."
                            value={phoneCodeSearch}
                            onChange={(e) => setPhoneCodeSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </div>
                      {filteredPhoneCodes.map((p) => (
                        <SelectItem key={p.code} value={p.code}>
                          {p.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="(555) 000-0000"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Country + City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground">Country *</Label>
                <Select
                  value={data.country}
                  onValueChange={(val) => {
                    update("country", val);
                    setData((prev) => ({ ...prev, country: val, state: "", city: "" }));
                  }}
                >
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 pb-2 sticky top-0 bg-popover">
                      <div className="flex items-center gap-2 border border-border rounded-md px-2">
                        <Search className="w-3.5 h-3.5 text-muted-foreground" />
                        <input
                          className="w-full py-1.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                          placeholder="Search..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                    {filteredCountries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">
                  City{data.country === "United States" ? "" : " (optional)"}
                </Label>
                <Input
                  value={data.city}
                  onChange={(e) => updateCity(e.target.value)}
                  placeholder={
                    data.country === "United States"
                      ? "e.g. Austin — we'll find your state"
                      : "e.g. Paris"
                  }
                  className="mt-1.5"
                />
                {data.country === "United States" && data.state && (
                  <p className="text-xs text-primary mt-1">
                    State detected: {data.state}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      /* ─── Step 2: Current Status ─── */
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                WHERE ARE YOU RIGHT NOW?
              </h2>
              <p className="text-muted-foreground">
                No wrong answers — just helps us point you in the right
                direction.
              </p>
            </div>
            <RadioGroup
              value={data.currentStatus}
              onValueChange={(val) => {
                update("currentStatus", val);
                // Reset status-dependent fields
                setData((prev) => ({
                  ...prev,
                  currentStatus: val,
                  feeling: "",
                  biggestChallenge: "",
                  annualRevenue: "",
                  teamSize: "",
                  timelineToStart: "",
                  savingsReady: "",
                  businessStart: "",
                  yearsInBusiness: "",
                }));
              }}
              className="space-y-3"
            >
              {renderRadioOption(
                "currentStatus",
                "employee",
                "I'm an Employee",
                "Working for someone else but thinking about going out on my own"
              )}
              {renderRadioOption(
                "currentStatus",
                "side_hustle",
                "Side Hustle",
                "I've started picking up jobs on the side but haven't gone full-time yet"
              )}
              {renderRadioOption(
                "currentStatus",
                "business_owner",
                "Business Owner",
                "I already run my own trades business"
              )}
            </RadioGroup>
          </div>
        );

      /* ─── Step 3: Feeling (sorted beginner → advanced) ─── */
      case 3: {
        const feelingsByStatus = () => {
          if (data.currentStatus === "employee") {
            return [
              { val: "starting_fresh", label: "Starting Fresh", desc: "I'm at the beginning and need a roadmap to get going" },
              { val: "curious", label: "Curious but Cautious", desc: "I'm interested but not sure if I'm ready to make the jump" },
              { val: "stuck", label: "Stuck & Frustrated", desc: "I know I can do more but I'm held back in my current role" },
              { val: "accelerate", label: "Ready to Make the Leap", desc: "I've been planning and I'm ready to go" },
            ];
          }
          if (data.currentStatus === "side_hustle") {
            return [
              { val: "starting_fresh", label: "Just Getting Started", desc: "I've done a few jobs on the side but I'm still figuring things out" },
              { val: "stuck", label: "Stuck Between Two Worlds", desc: "Balancing my day job and side work is burning me out" },
              { val: "accelerate", label: "Ready to Go Full-Time", desc: "My side hustle is picking up and I want to commit" },
              { val: "overwhelmed", label: "Overwhelmed", desc: "I'm doing everything myself — sales, work, invoicing — and it's too much" },
            ];
          }
          // business_owner
          return [
            { val: "starting_fresh", label: "Still Finding My Footing", desc: "My business is young and I need guidance to build it right" },
            { val: "stuck", label: "Stuck at a Plateau", desc: "Revenue has flatlined and I don't know what to do next" },
            { val: "accelerate", label: "Ready to Scale", desc: "Things are going well but I want to grow faster and smarter" },
            { val: "overwhelmed", label: "Overwhelmed & Burned Out", desc: "I'm doing everything myself and it's not sustainable" },
          ];
        };

        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                HOW ARE YOU FEELING?
              </h2>
              <p className="text-muted-foreground">
                Be honest — we've all been there.
              </p>
            </div>
            <RadioGroup
              value={data.feeling}
              onValueChange={(val) => update("feeling", val)}
              className="space-y-3"
            >
              {feelingsByStatus().map((f) =>
                renderRadioOption("feeling", f.val, f.label, f.desc)
              )}
            </RadioGroup>
          </div>
        );
      }

      /* ─── Step 4: Experience & situation (different per status) ─── */
      case 4: {
        if (data.currentStatus === "employee") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                  YOUR EXPERIENCE & PLAN
                </h2>
                <p className="text-muted-foreground">
                  Let's see where you're at and where you want to go.
                </p>
              </div>
              <div>
                <Label className="text-foreground">How long have you been in your trade? *</Label>
                <Select value={data.tradeExperience} onValueChange={(val) => update("tradeExperience", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0 – 2 years</SelectItem>
                    <SelectItem value="3-5">3 – 5 years</SelectItem>
                    <SelectItem value="5-10">5 – 10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">When do you want to start your own business? *</Label>
                <Select value={data.timelineToStart} onValueChange={(val) => update("timelineToStart", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_sure">Not sure yet — exploring my options</SelectItem>
                    <SelectItem value="6-12months">Within 6 – 12 months</SelectItem>
                    <SelectItem value="3-6months">Within 3 – 6 months</SelectItem>
                    <SelectItem value="asap">As soon as possible — I'm ready</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Do you have savings set aside to start? *</Label>
                <Select value={data.savingsReady} onValueChange={(val) => update("savingsReady", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Not really — I need help with the financial side</SelectItem>
                    <SelectItem value="some">Some, but probably not enough yet</SelectItem>
                    <SelectItem value="yes">Yes — I've been putting money away</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        }

        if (data.currentStatus === "side_hustle") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                  YOUR SIDE HUSTLE
                </h2>
                <p className="text-muted-foreground">
                  Help us understand where your side hustle is at.
                </p>
              </div>
              <div>
                <Label className="text-foreground">How long have you been in your trade? *</Label>
                <Select value={data.tradeExperience} onValueChange={(val) => update("tradeExperience", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0 – 2 years</SelectItem>
                    <SelectItem value="3-5">3 – 5 years</SelectItem>
                    <SelectItem value="5-10">5 – 10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">When did you start your side hustle? *</Label>
                <Select value={data.businessStart} onValueChange={(val) => update("businessStart", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select when you started" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less_than_6mo">Less than 6 months ago</SelectItem>
                    <SelectItem value="6mo_1yr">6 months – 1 year ago</SelectItem>
                    <SelectItem value="1_2yr">1 – 2 years ago</SelectItem>
                    <SelectItem value="2yr_plus">2+ years ago</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">How much have you made from your side hustle so far? *</Label>
                <Select value={data.annualRevenue} onValueChange={(val) => update("annualRevenue", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_5k">Under $5K</SelectItem>
                    <SelectItem value="5k_15k">$5K – $15K</SelectItem>
                    <SelectItem value="15k_50k">$15K – $50K</SelectItem>
                    <SelectItem value="50k_plus">$50K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        }

        // business_owner
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                YOUR BUSINESS
              </h2>
              <p className="text-muted-foreground">
                Help us understand where your business is at.
              </p>
            </div>
            <div>
              <Label className="text-foreground">How long have you been in your trade? *</Label>
              <Select value={data.tradeExperience} onValueChange={(val) => update("tradeExperience", val)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2">0 – 2 years</SelectItem>
                  <SelectItem value="3-5">3 – 5 years</SelectItem>
                  <SelectItem value="5-10">5 – 10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">When did you start your business? *</Label>
              <Select value={data.businessStart} onValueChange={(val) => update("businessStart", val)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select when you started" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less_than_1yr">Less than 1 year ago</SelectItem>
                  <SelectItem value="1_3yr">1 – 3 years ago</SelectItem>
                  <SelectItem value="3_5yr">3 – 5 years ago</SelectItem>
                  <SelectItem value="5_10yr">5 – 10 years ago</SelectItem>
                  <SelectItem value="10yr_plus">10+ years ago</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Annual revenue (approx.) *</Label>
              <Select value={data.annualRevenue} onValueChange={(val) => update("annualRevenue", val)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under_50k">Under $50K</SelectItem>
                  <SelectItem value="50k_100k">$50K – $100K</SelectItem>
                  <SelectItem value="100k_250k">$100K – $250K</SelectItem>
                  <SelectItem value="250k_500k">$250K – $500K</SelectItem>
                  <SelectItem value="500k_1m">$500K – $1M</SelectItem>
                  <SelectItem value="1m_plus">$1M+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">Team size *</Label>
              <Select value={data.teamSize} onValueChange={(val) => update("teamSize", val)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="just_me">Just me</SelectItem>
                  <SelectItem value="2-5">2 – 5 people</SelectItem>
                  <SelectItem value="6-15">6 – 15 people</SelectItem>
                  <SelectItem value="15+">15+ people</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      }

      /* ─── Step 5: Challenges & Marketing (different per status) ─── */
      case 5: {
        if (data.currentStatus === "employee") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                  YOUR GOALS
                </h2>
                <p className="text-muted-foreground">
                  What matters most to you right now?
                </p>
              </div>
              <div>
                <Label className="text-foreground">What's holding you back the most? *</Label>
                <Select value={data.marketingCurrent} onValueChange={(val) => update("marketingCurrent", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your biggest hurdle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dont_know_where_to_start">I don't know where to start</SelectItem>
                    <SelectItem value="no_money">I don't have the money to start</SelectItem>
                    <SelectItem value="fear_of_failure">Fear of failure</SelectItem>
                    <SelectItem value="no_clients">I don't know how to get clients</SelectItem>
                    <SelectItem value="no_business_knowledge">I don't know the business side</SelectItem>
                    <SelectItem value="family_stability">I need stability for my family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">What's your #1 goal? *</Label>
                <Select value={data.goals} onValueChange={(val) => update("goals", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your top goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start_business">Start my own business</SelectItem>
                    <SelectItem value="be_my_own_boss">Be my own boss</SelectItem>
                    <SelectItem value="make_more_money">Make more money than I do now</SelectItem>
                    <SelectItem value="build_something_mine">Build something that's mine</SelectItem>
                    <SelectItem value="work_life">Better work-life balance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        }

        // Side hustle & business owner
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                CHALLENGES & MARKETING
              </h2>
              <p className="text-muted-foreground">
                This helps us recommend the right resources.
              </p>
            </div>
            <div>
              <Label className="text-foreground">What's your biggest challenge right now? *</Label>
              <Select value={data.biggestChallenge} onValueChange={(val) => update("biggestChallenge", val)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your biggest challenge" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="getting_clients">Getting more clients</SelectItem>
                  <SelectItem value="pricing">Pricing & knowing my worth</SelectItem>
                  <SelectItem value="streamlining">Too much admin, not enough building</SelectItem>
                  <SelectItem value="systems">Setting up systems (CRM, scheduling)</SelectItem>
                  {data.currentStatus === "business_owner" && (
                    <SelectItem value="hiring">Finding & keeping good people</SelectItem>
                  )}
                  <SelectItem value="scaling">Scaling without losing quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground">How do you currently get clients? *</Label>
              <Select value={data.marketingCurrent} onValueChange={(val) => update("marketingCurrent", val)}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select your main method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none_yet">I don't have clients yet</SelectItem>
                  <SelectItem value="word_of_mouth">Word of mouth only</SelectItem>
                  <SelectItem value="social_media">Social media</SelectItem>
                  <SelectItem value="website_seo">Website & SEO</SelectItem>
                  <SelectItem value="google_ads">Google / Paid ads</SelectItem>
                  <SelectItem value="referral_network">Referral network / partnerships</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      }

      /* ─── Step 6: Final goal ─── */
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-3">
                ALMOST DONE
              </h2>
              <p className="text-muted-foreground">
                One last thing — what are you working towards?
              </p>
            </div>
            {data.currentStatus !== "employee" && (
              <div>
                <Label className="text-foreground">What's your #1 goal in the next 12 months? *</Label>
                <Select value={data.goals} onValueChange={(val) => update("goals", val)}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your top goal" />
                  </SelectTrigger>
                  <SelectContent>
                    {data.currentStatus === "side_hustle" ? (
                      <>
                        <SelectItem value="go_full_time">Go full-time with my business</SelectItem>
                        <SelectItem value="double_revenue">Double my side hustle revenue</SelectItem>
                        <SelectItem value="first_hire">Make my first hire</SelectItem>
                        <SelectItem value="systemize">Set up proper systems</SelectItem>
                        <SelectItem value="work_life">Better work-life balance</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="double_revenue">Double my revenue</SelectItem>
                        <SelectItem value="hire_team">Build a reliable team</SelectItem>
                        <SelectItem value="systemize">Systemize & automate</SelectItem>
                        <SelectItem value="work_life">Better work-life balance</SelectItem>
                        <SelectItem value="exit_strategy">Build something I can sell one day</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // For employees, step 5 already captures goals, so skip step 6
  const effectiveTotalSteps = data.currentStatus === "employee" ? 6 : 7;
  const effectiveProgress = ((step + 1) / effectiveTotalSteps) * 100;
  const isLastStep = data.currentStatus === "employee" ? step === 5 : step === 6;

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-20 max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              Step {step + 1} of {effectiveTotalSteps}
            </span>
            <span>{Math.round(effectiveProgress)}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${effectiveProgress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Step content — fixed min height for consistent button position */}
        <div className="min-h-[480px] flex flex-col">
          <div className="flex-1">
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
          </div>

          {/* Navigation — always at bottom */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="heroOutline"
              size="lg"
              onClick={back}
              disabled={step === 0}
              className={step === 0 ? "invisible" : ""}
            >
              <ArrowLeft className="mr-2 !size-4" /> Back
            </Button>

            {!isLastStep ? (
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
                    <Loader2 className="mr-2 !size-4 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  <>
                    See My Recommendations{" "}
                    <ArrowRight className="ml-2 !size-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Quiz;
