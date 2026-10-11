import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Tests", href: "#tests" },
    { name: "Games", href: "#games" },
    { name: "Illusions", href: "#illusions" },
    { name: "Gallery", href: "/gallery" },
    { name: "Counselling", href: "/counselling" },
    { name: "Join Us", href: "#join" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border py-3 shadow-sm" : "bg-transparent py-5"
    }`}>
      <motion.div className="absolute top-0 left-0 right-0 h-[2px] bg-accent/60 origin-left" style={{ scaleX: scrollYProgress }} />

      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 leading-none">
           <img src={logoSrc} alt="PSYNAPSE logo" className="w-9 h-9 object-contain" />
          <div className="flex flex-col">
            <span className="text-lg tracking-[0.2em] font-serif font-bold text-foreground">PSYNAPSE</span>
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/40">DPS Dwarka</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map(l => (
            l.href.startsWith("/") ? (
              <Link key={l.name} href={l.href}
                className="text-sm font-medium text-foreground/55 hover:text-foreground transition-colors duration-200 relative group tracking-wide">
                {l.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ) : (
              <a key={l.name} href={l.href}
                className="text-sm font-medium text-foreground/55 hover:text-foreground transition-colors duration-200 relative group tracking-wide">
                {l.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            )
          ))}
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-xl border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all">
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border py-4 px-6 flex flex-col gap-1 shadow-lg md:hidden">
          {links.map(l => (
            l.href.startsWith("/") ? (
              <Link key={l.name} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-foreground/65 hover:text-foreground py-3 border-b border-border/40 last:border-0 transition-colors">
                {l.name}
              </Link>
            ) : (
              <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-foreground/65 hover:text-foreground py-3 border-b border-border/40 last:border-0 transition-colors">
                {l.name}
              </a>
            )
          ))}
        </motion.div>
      )}
    </header>
  );
}
