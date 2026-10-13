
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, UsersRound, X } from "lucide-react";
import {
  Profile,
  ProfileLightbox,
  PortraitFrame,
} from "@/components/ProfileLightbox";

const currentTeam: Profile[] = [
  {
    name: "Nikhil Dev",
    role: "President",
    initial: "ND",
    tone: "crimson",
    image: `${import.meta.env.BASE_URL}images/leaders/Nikhil.jpeg`,
    imagePosition: "center 38%",
    bio: "Leading PSYNAPSE with a passion for cognitive science and community building.",
  },
  {
    name: "Saanchi Yadav",
    role: "President",
    initial: "SY",
    tone: "indigo",
    image: `${import.meta.env.BASE_URL}images/leaders/sanchi ji .jpeg`,
    imagePosition: "center 30%",
    bio: "Shaping PSYNAPSE’s vision through collaborative leadership, a passion for psychology, and a commitment to building a thriving community of curious minds.",
  },
  {
    name: "Aditi Vashisth",
    role: "Vice President",
    initial: "AV",
    tone: "ochre",
    image: `${import.meta.env.BASE_URL}images/leaders/aditi.jpg`,
    bio: "Coordinating events, outreach, and member engagement across the club.",
  },
];

const pastPresidents: Profile[] = [
  {
    name: "Jenya Suri",
    role: "Past President",
    year: "2024–2025",
    initial: "JS",
    tone: "sage",
    image: `${import.meta.env.BASE_URL}images/leaders/jenya-suri.jpg`,
    bio: "Strengthened PSYNAPSE's research culture and helped shape its digital identity.",
  },
  {
    name: "Avni Nischal",
    role: "Past President",
    year: "2022–23",
    initial: "AN",
    tone: "plum",
    image: `${import.meta.env.BASE_URL}images/leaders/avni-nischal.jpg`,
   bio: "Played a key role in nurturing PSYNAPSE's community and shaping the club's growing legacy.",
  },
{
    name: "Dhruvika Sehrawat",
    role: "Past President",
    year: "2022–2023",
    initial: "DS",
    tone: "crimson",
    image: `${import.meta.env.BASE_URL}images/leaders/dhruvika-sehrawat.jpg`,
    bio: "Envisioned and founded PSYNAPSE, creating the beginnings of a community built around psychology, curiosity, and research.",
},
  ];
type DirectoryMember = {
  name: string;
  role: string;
  group: string;
};

const memberDirectory: DirectoryMember[] = [
  { name: "Nikhil Dev", role: "President", group: "Class XII" },
  { name: "Saanchi Yadav", role: "President", group: "Class XII" },
  { name: "Aditi Vashisht", role: "Vice President", group: "Class XII" },
  { name: "Arshia Guleria", role: "Secretary", group: "Class XII" },
  { name: "Anushka Nandini", role: "Secretary", group: "Class XII" },
  { name: "Preet Sachdev", role: "Joint Secretary", group: "Class XII" },
  { name: "Akriti Yadav", role: "Joint Secretary", group: "Class XII" },
  { name: "Niharika Dutta", role: "Event Head", group: "Class XII" },
  { name: "Sana Verma", role: "Co-Event Head", group: "Class XI · E" },
  { name: "Ayesha Arora", role: "Co-Event Head", group: "Class XI · A" },
  { name: "Shraavni Sinha", role: "Creative Head", group: "Class XII" },
  { name: "Taama Sharma", role: "Creative Head", group: "Class XII" },
  { name: "Aaradhya Mishra", role: "Junior Creative Head", group: "Class XI · A" },
  { name: "Sanna Malhotra", role: "Junior Creative Head", group: "Class XI · F" },
  { name: "Bhumika", role: "Research Head", group: "Class XII" },
  { name: "Bhoomika", role: "Tech Head", group: "PSYNAPSE '27" },
  { name: "Ahana Singh", role: "PR Head", group: "Class XII" },
  { name: "Sanjeevni Jha", role: "Editorial Head", group: "Class XII" },
  { name: "K. Saranya Shree Rao", role: "Co-Editorial Head", group: "Class XI" },
  { name: "Mishka", role: "Co-Editorial Head", group: "Class XI · B" },
  { name: "Zara", role: "Media Head", group: "Class XII" },
  { name: "Aditri Gupta", role: "Treasurer", group: "Class XII" },
  { name: "Rakshaa", role: "Member", group: "Class XII" },
  { name: "Mannat Sachdeva", role: "Member", group: "Class XII" },
  { name: "Amaira Chawla", role: "Member", group: "Class XII" },
  { name: "Geet Sachdeva", role: "Member", group: "Class XII" },
  { name: "Tripada Kaushik", role: "Member", group: "Class XII" },
  { name: "Kashish", role: "Member", group: "Class XI · E" },
  { name: "Deeksha Taneja", role: "Member", group: "Class XI · E" },
  { name: "Dishita Arora", role: "Member", group: "Class XI · E" },
  { name: "Nishika Tehlan", role: "Member", group: "Class XI · A" },
  { name: "Vanshika Nagar", role: "Member", group: "Class XI · A" },
  { name: "Avni Singhal", role: "Member", group: "Class IX · G" },
  { name: "Aarish Maitra", role: "Member", group: "Class IX · G" },
  { name: "Nishi Sethi", role: "Member", group: "Class IX · F" },
  { name: "Parneet Kaur", role: "Member", group: "Class IX · E" },
  { name: "Partham Yadav", role: "Member", group: "Class IX · F" },
  { name: "Sankalp Kumar", role: "Member", group: "Class IX · F" },
  { name: "Shivansh Sharma", role: "Member", group: "Class IX" },
  { name: "Srishti Sinha", role: "Member", group: "Class IX · E" },
  { name: "Aaradhya Jain", role: "Member", group: "Class IX · D" },
  { name: "Myra Rastogi", role: "Member", group: "Class IX · E" },
  { name: "Kashvi Soni", role: "Member", group: "Class IX · D" },
];

export function Team() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [membersOpen, setMembersOpen] = useState(false);

 
useEffect(() => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMembersOpen(false);
      setSelectedProfile(null);
    }
  };

  window.addEventListener("keydown", onKeyDown);

  return () => {
    window.removeEventListener("keydown", onKeyDown);
  };
}, []);

  return (
    <>
      <section id="team" className="relative overflow-hidden bg-background py-24 md:py-28">
        <div className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 rounded-full border border-dashed border-foreground/5" />

        <div className="container mx-auto px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-accent">
              Our Leadership
            </p>
            <h3 className="text-4xl font-semibold text-foreground md:text-5xl">
              The Minds Behind PSYNAPSE
            </h3>
            <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-foreground/45">
              Meet the people shaping the club&apos;s next chapter.
            </p>
          </motion.div>

          <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {currentTeam.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-300 hover:border-foreground/25 hover:shadow-xl"
                style={{
                  boxShadow: "0 5px 18px hsl(25 20% 8% / .10)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedProfile(member)}
                  aria-label={`View ${member.name}'s profile`}
                  className="block w-full text-left"
                >
                  <div className="flex min-h-[300px] items-center justify-center bg-background px-5 pt-7">
                    <PortraitFrame
                      profile={member}
                      onClick={() => setSelectedProfile(member)}
                    />
                  </div>
                  <div className="p-6">
                    <span
                      className={`mb-3 inline-block rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-wider ${
                        member.role === "President"
                          ? "border-accent/25 bg-accent/10 text-accent"
                          : "border-border bg-foreground/5 text-foreground/55"
                      }`}
                    >
                      {member.role}
                    </span>
                    <h4 className="mb-2 text-xl font-semibold text-foreground">
                      {member.name}
                    </h4>
                    <p className="text-sm font-light leading-relaxed text-foreground/45">
                      {member.bio}
                    </p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/75">
                      View profile ↗
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMembersOpen(true)}
            aria-expanded={membersOpen}
            aria-controls="member-directory"
            className="group mx-auto flex w-full max-w-3xl items-center justify-between gap-4 rounded-2xl border border-[#fff8ec]/80 bg-[#f5ede0]/75 px-4 py-3.5 text-left text-[#1c1410] shadow-[0_6px_22px_rgba(74,45,26,.08)] transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_12px_30px_rgba(74,45,26,.14)] sm:rounded-full sm:px-6"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
                <UsersRound size={18} />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
                  Our Members
                </span>
                <span className="mt-1 block text-xs text-[#1c1410]/60 sm:text-sm">
                  Meet the people who make PSYNAPSE a community.
                </span>
              </span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1c1410]/10 bg-white/40 transition-transform duration-300 group-hover:border-accent/30 group-hover:text-accent">
              <ChevronDown size={16} />
            </span>
          </button>

          <div className="mx-auto mb-7 mt-14 flex max-w-2xl items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <p className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-foreground/35">
              Past Presidents
            </p>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
            {pastPresidents.map((pp, idx) => (
              <motion.button
                key={pp.name}
                type="button"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedProfile(pp)}
                className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-shadow duration-300 hover:border-foreground/20 hover:shadow-lg sm:p-5"
                style={{ boxShadow: "0 2px 10px hsl(25 20% 8% / .08)" }}
              >
                <PortraitFrame profile={pp} compact />
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h5 className="font-semibold text-foreground/80">
                      {pp.name}
                    </h5>
                    <span className="font-mono text-xs text-foreground/35">
                      {pp.year}
                    </span>
                  </div>
                  <p className="text-sm font-light leading-relaxed text-foreground/45">
                    {pp.bio}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/75">
                    View portrait ↗
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {membersOpen && (
          <motion.div
            key="member-backdrop"
            id="member-directory"
            role="dialog"
            aria-modal="true"
            aria-label="PSYNAPSE 2027 member directory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setMembersOpen(false);
              }
            }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#17110e]/65 p-3 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/70 bg-[#f5ede0] text-[#1c1410] shadow-[0_25px_80px_rgba(0,0,0,.30)] sm:rounded-3xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-[#1c1410]/10 px-4 py-4 sm:px-6 sm:py-5">
                <div className="min-w-0">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-accent sm:text-[10px] sm:tracking-[0.3em]">
                    PSYNAPSE &apos;27 · Official Team
                  </p>
                  <h4 className="mt-1.5 text-xl font-semibold sm:text-2xl">
                    The People Behind the Curiosity
                  </h4>
                  <p className="mt-1 text-xs text-[#1c1410]/55 sm:text-sm">
                    Every mind makes a difference.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setMembersOpen(false)}
                  aria-label="Close member directory"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1c1410]/15 bg-white/50 transition-colors duration-200 hover:border-accent/40 hover:bg-white hover:text-accent"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-[70dvh] overflow-y-auto overscroll-contain p-3 sm:max-h-[72dvh] sm:p-5">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-3">
                  {memberDirectory.map((member) => {
                    const leaderProfile = currentTeam.find(
                      (profile) => profile.name === member.name
                    );

                    const cardContent = (
                      <>
                        <span className="min-w-0 flex-1 truncate font-serif text-sm font-semibold sm:text-base">
                          {member.name}
                        </span>
                        <span
                          className={`w-fit max-w-full shrink-0 rounded-full border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] sm:text-[9px] ${
                            member.role === "President"
                              ? "border-accent/30 bg-accent/10 text-accent"
                              : "border-[#1c1410]/10 bg-white/55 text-[#1c1410]/65"
                          }`}
                        >
                          {member.role}
                        </span>
                      </>
                    );

                    return leaderProfile ? (
                      <motion.button
                        key={`${member.name}-${member.role}`}
                        type="button"
                        onClick={() => setSelectedProfile(leaderProfile)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border border-[#1c1410]/10 bg-white/35 px-3 py-2.5 text-left shadow-sm transition-colors duration-200 hover:border-accent/40 hover:bg-white/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                      >
                        {cardContent}
                      </motion.button>
                    ) : (
                      <div
                        key={`${member.name}-${member.role}`}
                        className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-[#1c1410]/10 bg-white/35 px-3 py-2.5 transition-colors duration-200 hover:border-accent/35 hover:bg-white/70"
                      >
                        {cardContent}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-[#1c1410]/10 px-4 py-3 text-center sm:px-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1c1410]/40">
                  PSYNAPSE · Curiosity connects us
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProfileLightbox
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
    </>
  );
}
