import { motion } from "framer-motion";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { Link } from "wouter";

export function StudentSupport() {
  return (
    <section id="student-support" className="relative overflow-hidden bg-card py-10 md:py-14">
      <div className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-accent/15" />
      <div className="pointer-events-none absolute -right-8 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full border border-foreground/10" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex max-w-5xl flex-col gap-7 rounded-[2rem] border border-[#fff8ec]/80 bg-[#f5ede0]/65 p-6 shadow-[0_14px_36px_rgba(74,45,26,.09),inset_0_1px_0_rgba(255,255,255,.7)] backdrop-blur-xl md:flex-row md:items-center md:justify-between md:gap-10 md:px-8 md:py-7"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
              <HeartHandshake size={19} />
            </span>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Student Support</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                You do not have to figure everything out alone.
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-foreground/55">
                If something has been feeling heavy, you can ask for a quiet conversation with the school support team. Share only what feels okay.
              </p>
            </div>
          </div>

          <Link
            href="/counselling"
            className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-foreground px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-background shadow-[0_6px_18px_rgba(28,20,16,.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground/90 hover:shadow-[0_10px_24px_rgba(28,20,16,.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-card active:scale-[.98]"
          >
            Talk to someone
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}