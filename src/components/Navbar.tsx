import * as React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import forgeLogo from "@/assets/forge-logo.png";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const SKOOL_URL = "https://www.skool.com/forge-the-trades-blueprint-8794/about";

const navLinks = [
  { label: "The Quiz", href: "/quiz" },
  { label: "The Systems", href: "/systems" },
  { label: "The Classes", href: "/classes" },
  { label: "The Blueprints", href: "/blueprints" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={forgeLogo} alt="Forge logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0">
          {navLinks.map((link, i) => (
            <React.Fragment key={link.label}>
              {i > 0 && <div className="w-px h-5 bg-muted-foreground" />}
              <Link
                to={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-semibold uppercase tracking-wider transition-colors px-6"
              >
                {link.label}
              </Link>
            </React.Fragment>
          ))}
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="sm">
              Join Free <ArrowRight className="ml-1 !size-4" />
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-muted-foreground hover:text-foreground text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="sm" className="w-full">
              Join Free <ArrowRight className="ml-1 !size-4" />
            </Button>
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
