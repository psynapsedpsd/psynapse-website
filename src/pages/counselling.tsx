import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Clock3, HeartHandshake, Send, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type FormState = {
  name: string;
  grade: string;
  contactPreference: string;
  contactDetails: string;
  preferredTime: string;
  reason: string;
  urgency: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  grade: "",
  contactPreference: "",
  contactDetails: "",
  preferredTime: "",
  reason: "",
  urgency: "Whenever possible",
  consent: false,
};

export default function Counselling() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please share your name.";
    if (!form.grade) nextErrors.grade = "Choose your grade or class.";
    if (!form.contactPreference) nextErrors.contactPreference = "Choose how you would prefer to be contacted.";
    if (!form.preferredTime) nextErrors.preferredTime = "Choose a time that usually works.";
    if (form.reason.trim().length < 12) nextErrors.reason = "A few more words will help us understand how to support you.";
    if (!form.consent) nextErrors.consent = "Please confirm that you are comfortable being contacted.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!validate() || processing) return;

  setProcessing(true);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzXPgx2dqaqQ5WQj35GTJDnLQPaom1lSxiem0Z-5SDv96gSBaROGOdLzC5jD6YaSXe2/exec", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        name: form.name,
        grade: form.grade,
      
        contactPreference: form.contactPreference,
        contactDetails: form.contactDetails,
        preferredTime: form.preferredTime,
        reason: form.reason,
        urgency: form.urgency,
        consent: form.consent,
      
      }),
    });

    const result = await response.json();
    console.log("Counselling API response:", result);

    if (!result.ok) {
      throw new Error("The request could not be saved.");
    }

    setSubmitted(true);
  } catch (error) {
    console.error("Counselling form submission failed:", error);
    alert("Sorry, your request could not be submitted. Please try again.");
  } finally {
    setProcessing(false);
  }
};

  if (submitted) {
    return (
      <div className="min-h-[100dvh] bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto flex min-h-[72dvh] items-center px-6 pb-20 pt-32">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto w-full max-w-2xl rounded-[2rem] border border-border bg-card p-8 shadow-sm md:p-14"
            aria-live="polite"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Check size={25} strokeWidth={2.2} />
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Request prepared</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-6xl">Thank you for making space for this.</h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-foreground/60">
              Your counselling request has been recorded on this device for this session. This front-end form does not send a message to a counsellor yet, so please also share your request with a trusted adult, your school counsellor, or the PSYNAPSE team directly.
            </p>
            <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-5 text-sm font-light leading-relaxed text-foreground/60">
              If you feel unsafe, might hurt yourself or someone else, or need help right now, tell a trusted adult immediately or contact your local emergency support. You deserve support that is close and immediate.
            </div>
            <Link href="/" className="mt-9 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-foreground">
              <ArrowLeft size={14} /> Return to PSYNAPSE
            </Link>
          </motion.section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 pb-16 pt-32 md:pb-24">
            <Link href="/" className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45 transition-colors hover:text-foreground">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to PSYNAPSE
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mt-16 grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"><HeartHandshake size={17} /></span>
                  <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">A quiet door, left open</p>
                </div>
                <h1 className="max-w-2xl text-5xl font-semibold leading-[.95] md:text-8xl">You do not have to explain it perfectly.</h1>
              </div>
              <p className="max-w-md text-base font-light leading-relaxed text-foreground/55 md:pb-2 md:text-lg">
                If something has been sitting heavily with you, tell us what you can. This is a request to be heard, not a test and not a diagnosis.
              </p>
            </motion.div>
          </div>
        </header>

        <div className="container mx-auto grid gap-12 px-6 py-14 md:grid-cols-[minmax(0,1fr)_280px] md:py-24">
          <form onSubmit={handleSubmit} noValidate className="max-w-2xl">
            <div className="mb-10 flex items-start gap-4 border-b border-border pb-8">
              <ShieldCheck size={20} className="mt-1 shrink-0 text-accent" />
              <p className="text-sm font-light leading-relaxed text-foreground/55">Share only what feels okay. Your answers help a person know how to begin a conversation; they will not be used to label or diagnose you.</p>
            </div>

            <fieldset className="space-y-7">
              <legend className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">Start with the basics</legend>
              <Field label="Your name" name="name" error={errors.name}>
                <input id="name" name="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="What should we call you?" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={inputClass(Boolean(errors.name))} />
              </Field>
              <Field label="Grade or class" name="grade" error={errors.grade}>
                <select id="grade" name="grade" value={form.grade} onChange={(event) => updateField("grade", event.target.value)} aria-invalid={Boolean(errors.grade)} aria-describedby={errors.grade ? "grade-error" : undefined} className={inputClass(Boolean(errors.grade))}>
                  <option value="">Choose your grade</option>
                  <option>Class IX</option>
                  <option>Class X</option>
                  <option>Class XI</option>
                  <option>Class XII</option>
                  <option>Other / prefer not to say</option>
                </select>
              </Field>
              <div className="grid gap-7 md:grid-cols-2">
                <Field label="Preferred contact" name="contactPreference" error={errors.contactPreference}>
                  <select id="contactPreference" name="contactPreference" value={form.contactPreference} onChange={(event) => updateField("contactPreference", event.target.value)} aria-invalid={Boolean(errors.contactPreference)} aria-describedby={errors.contactPreference ? "contactPreference-error" : undefined} className={inputClass(Boolean(errors.contactPreference))}>
                    <option value="">Choose one</option>
                    <option>In person at school</option>
                    <option>Email</option>
                    <option>Phone call</option>
                    <option>Message through a trusted adult</option>
                  </select>
                </Field>
                <Field label="Contact details" name="contactDetails" hint="Optional — add an email or number only if you chose a remote option.">
                  <input id="contactDetails" name="contactDetails" value={form.contactDetails} onChange={(event) => updateField("contactDetails", event.target.value)} autoComplete="email" placeholder="Optional contact details" className={inputClass(false)} />
                </Field>
              </div>
            </fieldset>

            <fieldset className="mt-14 space-y-7">
              <legend className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">What would help us begin?</legend>
              <Field label="Preferred time" name="preferredTime" error={errors.preferredTime}>
                <select id="preferredTime" name="preferredTime" value={form.preferredTime} onChange={(event) => updateField("preferredTime", event.target.value)} aria-invalid={Boolean(errors.preferredTime)} aria-describedby={errors.preferredTime ? "preferredTime-error" : undefined} className={inputClass(Boolean(errors.preferredTime))}>
                  <option value="">Choose a usual window</option>
                  <option>Before school</option>
                  <option>Break or lunch</option>
                  <option>After school</option>
                  <option>Any school hour</option>
                  <option>I am not sure yet</option>
                </select>
              </Field>
              <Field label="What would you like to talk about?" name="reason" hint="You can keep this short. There is no right way to write it." error={errors.reason}>
                <textarea id="reason" name="reason" value={form.reason} onChange={(event) => updateField("reason", event.target.value)} rows={5} placeholder="I have been thinking about..." aria-invalid={Boolean(errors.reason)} aria-describedby={errors.reason ? "reason-error" : undefined} className={`${inputClass(Boolean(errors.reason))} resize-y`} />
              </Field>
              <Field label="How soon would support feel useful?" name="urgency">
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Whenever possible", "Within a few days", "I need to talk today"].map((option) => (
                    <label key={option} className={`cursor-pointer rounded-2xl border p-4 text-sm leading-snug transition-colors ${form.urgency === option ? "border-accent bg-accent/10 text-foreground" : "border-border bg-card text-foreground/55 hover:border-foreground/25"}`}>
                      <input type="radio" name="urgency" value={option} checked={form.urgency === option} onChange={(event) => updateField("urgency", event.target.value)} className="sr-only" />
                      {option}
                    </label>
                  ))}
                </div>
              </Field>
            </fieldset>

            <div className="mt-14 border-t border-border pt-8">
              <label className={`flex cursor-pointer items-start gap-3 text-sm font-light leading-relaxed ${errors.consent ? "text-destructive" : "text-foreground/60"}`}>
                <input type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} className="mt-1 h-4 w-4 accent-[hsl(var(--accent))]" />
                <span>I am comfortable with a member of the school support team or PSYNAPSE following up with me about this request.</span>
              </label>
              {errors.consent && <p className="mt-2 pl-7 text-xs text-destructive" role="alert">{errors.consent}</p>}
              <button type="submit" disabled={processing} className="mt-8 inline-flex min-w-48 items-center justify-center gap-3 rounded-full bg-foreground px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-background transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60">
                {processing ? <><Clock3 size={15} className="animate-pulse" /> Preparing request</> : <><Send size={15} /> Send request</>}
              </button>
              <p className="mt-4 text-xs font-light leading-relaxed text-foreground/40">This form is for a conversation, not emergency care. If you need immediate help, please tell a trusted adult now.</p>
            </div>
          </form>

          <aside className="self-start rounded-[1.6rem] border border-border bg-card p-6 md:sticky md:top-28">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">A note from the club</p>
            <h2 className="mt-5 text-2xl font-semibold leading-tight">You can start with one sentence.</h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-foreground/55">You are welcome here whether you know exactly what is going on or only know that something feels different.</p>
            <div className="mt-7 flex items-start gap-3 border-t border-border pt-5 text-xs font-mono leading-relaxed text-foreground/40">
              <Clock3 size={15} className="mt-0.5 shrink-0 text-accent" /> We will use your preferred time as a guide, not a promise.
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-2xl border bg-card px-4 py-3.5 text-sm font-light text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-accent ${hasError ? "border-destructive" : "border-border"}`;
}

function Field({ label, name, hint, error, children }: { label: string; name: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-foreground/75">{label}</label>
      {hint && <p className="mb-2 text-xs font-light leading-relaxed text-foreground/40">{hint}</p>}
      {children}
      {error && <p id={`${name}-error`} className="mt-2 text-xs text-destructive" role="alert">{error}</p>}
    </div>
  );
}