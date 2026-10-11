

import { useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import type { PointerEvent as ReactPointerEvent } from "react";

import {

  ArrowLeft,

  ArrowRight,

  ArrowUpRight,

  CalendarDays,

  Camera,

  ChevronDown,

  Images,

  X,

} from "lucide-react";

import { Link } from "wouter";



type GalleryShape = "orbit" | "grid" | "rings" | "wave";



type GalleryMoment = {

  id: string;

  label: string;

  note: string;

  palette: string;

  shape: GalleryShape;

  image: string;

};



type GalleryEvent = {

  id: string;

  event: string;

  title: string;

  date: string;

  description: string;

  tag: string;

  palette: string;

  accent: string;

  shape: GalleryShape;

  image: string;

  moments: GalleryMoment[];

};



// ======================================================

// IMAGE GUIDE

// Put all photographs inside public/gallery/

// Main event images appear on the gallery cards.

// Moment images appear inside the expanded gallery.

// ======================================================



const galleryEvents: GalleryEvent[] = [

  {

    id: "mind-maze",

    event: "Mental Health",

    title: "Mental Health Awareness day 2026",

    date: "08 October 2026",

    description:

      "An awareness event promoting mental well-being, breaking stigmas, and encouraging open conversations about mental health through engaging activities.",

    tag: "Wellbeing session",

    palette:

      "linear-gradient(135deg, #241b34 0%, #5b3e73 50%, #c57b70 100%)",

    accent: "#e8b4a1",

    shape: "orbit",

    image: "/gallery/mind-maze.jpg",

    moments: [

      {

        id: "mind-maze-01",

        label: "The entry point",

        note: "A wall of possible paths, before anyone knew which way they would turn.",

        palette:

          "linear-gradient(135deg, #241b34 0%, #5b3e73 50%, #c57b70 100%)",

        shape: "orbit",

        image: "/gallery/mind-maze-01.jpg",

      },

      {

        id: "mind-maze-02",

        label: "A different answer",

        note: "The puzzle changed when we stopped trying to solve it alone.",

        palette:

          "linear-gradient(135deg, #332344 0%, #845978 48%, #d2a07e 100%)",

        shape: "rings",

        image: "/gallery/mind-maze-02.jpg",

      },

      {

        id: "mind-maze-03",

        label: "After the reveal",

        note: "The best discoveries were the ones that gave us a better question.",

        palette:

          "linear-gradient(135deg, #1c2939 0%, #466c79 48%, #dfae88 100%)",

        shape: "wave",

        image: "/gallery/mind-maze-03.jpg",

      },

    ],

  },

  {

    id: "MIND MATRIX",

    event: "ANNUAL FEST",

    title: "Mind Matrix ",

    date: "September 2026",

    description:

      "A guided exploration of attention, breath, and the everyday signals that tell us to slow down and notice.",

    tag: "Wellbeing session",

    palette:

      "linear-gradient(135deg, #173936 0%, #51786f 46%, #d5bd91 100%)",

    accent: "#e4d3a9",

    shape: "rings",

    image: "/gallery/stress-lab.jpg",

    moments: [

      {

        id: "stress-lab-01",

        label: "Arriving",

        note: "A quiet beginning: noticing what the body already knew.",

        palette:

          "linear-gradient(135deg, #173936 0%, #51786f 46%, #d5bd91 100%)",

        shape: "rings",

        image: "/gallery/stress-lab-01.jpg",

      },

      {

        id: "stress-lab-02",

        label: "The pause",

        note: "Small experiments in attention, breath, and making room.",

        palette:

          "linear-gradient(135deg, #243f3c 0%, #799483 48%, #e5cfa0 100%)",

        shape: "orbit",

        image: "/gallery/stress-lab-02.jpg",

      },

      {

        id: "stress-lab-03",

        label: "Taking it with us",

        note: "A few gentle practices to carry beyond the room.",

        palette:

          "linear-gradient(135deg, #344b42 0%, #9b9f7d 52%, #e8d6ae 100%)",

        shape: "wave",

        image: "/gallery/stress-lab-03.jpg",

      },

    ],

  },

  {

    id: "color-cognition",

    event: "ANNUAL FEST",

    title: "Psycathon",

    date: "August 2026",

    description:

      "A visual study of association, emotion, and how a single shade can change the story we tell ourselves.",

    tag: "Studio experiment",

    palette:

      "linear-gradient(135deg, #8a2f29 0%, #d07d46 48%, #f0d59b 100%)",

    accent: "#fff0c7",

    shape: "grid",

    image: "/gallery/color-cognition.jpg",

    moments: [

      {

        id: "color-cognition-01",

        label: "The palette",

        note: "A table of shades waiting to become memory, mood, or meaning.",

        palette:

          "linear-gradient(135deg, #8a2f29 0%, #d07d46 48%, #f0d59b 100%)",

        shape: "grid",

        image: "/gallery/color-cognition-01.jpg",

      },

      {

        id: "color-cognition-02",

        label: "Associations",

        note: "One colour, many stories — none of them quite the same.",

        palette:

          "linear-gradient(135deg, #6e3335 0%, #ba6e56 50%, #efd0a1 100%)",

        shape: "rings",

        image: "/gallery/color-cognition-02.jpg",

      },

      {

        id: "color-cognition-03",

        label: "A new shade",

        note: "The moment a familiar feeling found an unfamiliar name.",

        palette:

          "linear-gradient(135deg, #4d2933 0%, #a54d58 45%, #e9bd84 100%)",

        shape: "orbit",

        image: "/gallery/color-cognition-03.jpg",

      },

    ],

  },

  {

    id: "Vibgyor",

    event: "Vibgyor",

    title: "Vibgyor 2025",

    date: "July 2025",

    description:

      "New faces, old curiosities, and a wall covered in questions we want to keep asking together.",

    tag: "Community",

    palette:

      "linear-gradient(135deg, #202a4a 0%, #52658b 50%, #b4c7c0 100%)",

    accent: "#e8eee0",

    shape: "wave",

    image: "/gallery/club-induction.jpg",

    moments: [

      {

        id: "club-induction-01",

        label: "First arrivals",

        note: "New faces, open notebooks, and a little room for uncertainty.",

        palette:

          "linear-gradient(135deg, #202a4a 0%, #52658b 50%, #b4c7c0 100%)",

        shape: "wave",

        image: "/gallery/club-induction-01.jpg",

      },

      {

        id: "club-induction-02",

        label: "The question wall",

        note: "Curiosity made visible, one handwritten thought at a time.",

        palette:

          "linear-gradient(135deg, #2c3859 0%, #687d98 48%, #d2d9c4 100%)",

        shape: "grid",

        image: "/gallery/club-induction-02.jpg",

      },

      {

        id: "club-induction-03",

        label: "Settling in",

        note: "The first circle of a year that had not yet been written.",

        palette:

          "linear-gradient(135deg, #283b4a 0%, #62817f 50%, #d5ceb0 100%)",

        shape: "rings",

        image: "/gallery/club-induction-03.jpg",

      },

    ],

  },

  {

    id: "Annual fest 2025",

    event: "Annual Fest 2025",

    title: "Annual Fest 2025",

    date: "April 2025",

    description:

      "A series of small provocations across campus: optical illusions, thought prompts, and conversations that stayed after the bell.",

    tag: "Campus series",

    palette:

      "linear-gradient(135deg, #432827 0%, #9b4d45 45%, #dbb069 100%)",

    accent: "#f7ddab",

    shape: "orbit",

    image: "/gallery/psychology-week.jpg",

    moments: [

      {

        id: "psychology-week-01",

        label: "Looking closer",

        note: "A campus corner turned into an invitation to slow down and notice.",

        palette:

          "linear-gradient(135deg, #432827 0%, #9b4d45 45%, #dbb069 100%)",

        shape: "orbit",

        image: "/gallery/psychology-week-01.jpg",

      },

      {

        id: "psychology-week-02",

        label: "The illusion",

        note: "What we see first is not always the whole story.",

        palette:

          "linear-gradient(135deg, #302a32 0%, #85505c 48%, #d8b174 100%)",

        shape: "grid",

        image: "/gallery/psychology-week-02.jpg",

      },

      {

        id: "psychology-week-03",

        label: "The conversation after",

        note: "The questions kept moving, long after the display came down.",

        palette:

          "linear-gradient(135deg, #3d3030 0%, #9c6b54 48%, #e5c990 100%)",

        shape: "wave",

        image: "/gallery/psychology-week-03.jpg",

      },

    ],

  },

  {

    id: "open-circle",

    event: "Mental Health",

    title: "Mental Health Awareness day 2025",

    date: "March 2025",

    description:

      "An informal club circle about self-awareness, listening well, and the psychology behind the stories we carry.",

    tag: "Open conversation",

    palette:

      "linear-gradient(135deg, #292824 0%, #6d6654 48%, #c8aa7b 100%)",

    accent: "#f2dfb3",

    shape: "rings",

    image: "/gallery/open-circle.jpg",

    moments: [

      {

        id: "open-circle-01",

        label: "Taking a seat",

        note: "There was no stage, only a circle and time to arrive.",

        palette:

          "linear-gradient(135deg, #292824 0%, #6d6654 48%, #c8aa7b 100%)",

        shape: "rings",

        image: "/gallery/open-circle-01.jpg",

      },

      {

        id: "open-circle-02",

        label: "Listening well",

        note: "A shared pause can be its own kind of generosity.",

        palette:

          "linear-gradient(135deg, #30332d 0%, #7d8062 48%, #d3bd89 100%)",

        shape: "wave",

        image: "/gallery/open-circle-02.jpg",

      },

      {

        id: "open-circle-03",

        label: "Leaving a little lighter",

        note: "The stories we carry can make room for one another.",

        palette:

          "linear-gradient(135deg, #3b3029 0%, #8a6e58 48%, #dec79c 100%)",

        shape: "orbit",

        image: "/gallery/open-circle-03.jpg",

      },

    ],

  },

];



// ======================================================

// VISUAL COMPONENT

// Photograph + original animated shapes + grid overlay

// ======================================================



function AbstractVisual({

  item,

  large = false,

  moment,

}: {

  item: GalleryEvent;

  large?: boolean;

  moment?: GalleryMoment;

}) {

  const palette = moment?.palette ?? item.palette;

  const shape = moment?.shape ?? item.shape;

  const image = moment?.image ?? item.image;



  return (

    <div

      className={`relative overflow-hidden ${

        large ? "h-full min-h-[320px]" : "h-64"

      } rounded-[1.4rem]`}

      style={{ background: palette }}

    >

      {/* Background photograph */}

      <img

        src={image}

        alt={moment?.label ?? item.event}

        loading="lazy"

        draggable={false}

        onError={(event) => {

          // Show the original gradient if a photograph is missing.

          event.currentTarget.style.display = "none";

        }}

        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"

      />



      {/* Darken the photo slightly so the white details remain visible */}

      <div className="pointer-events-none absolute inset-0 bg-black/15" />



      {/* Original grid overlay */}

      <div

        className="pointer-events-none absolute inset-0 opacity-20"

        style={{

          backgroundImage:

            "linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px)",

          backgroundSize: "32px 32px",

        }}

      />



      {/* ORBIT */}

      {shape === "orbit" && (

        <>

          <motion.div

            className="absolute left-[17%] top-[13%] h-40 w-40 rounded-full border border-white/35"

            animate={{ rotate: 360 }}

            transition={{

              duration: 16,

              repeat: Infinity,

              ease: "linear",

            }}

          />

          <motion.div

            className="absolute left-[29%] top-[25%] h-40 w-40 rounded-full border border-white/25"

            animate={{ rotate: -360 }}

            transition={{

              duration: 20,

              repeat: Infinity,

              ease: "linear",

            }}

          />

          <div className="absolute left-[44%] top-[40%] h-5 w-5 rounded-full bg-white/80 shadow-[0_0_35px_rgba(255,255,255,.6)]" />

        </>

      )}



      {/* RINGS */}

      {shape === "rings" && (

        <>

          <motion.div

            className="absolute -right-16 -top-16 h-72 w-72 rounded-full border-[20px] border-white/15"

            animate={{ scale: [1, 1.08, 1] }}

            transition={{

              duration: 5,

              repeat: Infinity,

              ease: "easeInOut",

            }}

          />

          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-white/45" />

          <div className="absolute bottom-10 left-10 h-3 w-3 rounded-full bg-white/80" />

        </>

      )}



      {/* GRID SHAPE */}

      {shape === "grid" && (

        <>

          <motion.div

            className="absolute -right-8 top-5 h-48 w-48 rotate-12 border-[18px] border-white/20"

            animate={{ rotate: [12, 25, 12] }}

            transition={{

              duration: 7,

              repeat: Infinity,

              ease: "easeInOut",

            }}

          />

          <motion.div

            className="absolute bottom-6 left-12 h-24 w-24 -rotate-12 rounded-full border border-white/45"

            animate={{ y: [0, -10, 0] }}

            transition={{

              duration: 4,

              repeat: Infinity,

              ease: "easeInOut",

            }}

          />

        </>

      )}



      {/* WAVE */}

      {shape === "wave" && (

        <>

          <motion.div

            className="absolute -bottom-20 -left-10 h-64 w-[130%] rounded-[50%] border-[22px] border-white/20"

            animate={{ x: [-8, 8, -8] }}

            transition={{

              duration: 6,

              repeat: Infinity,

              ease: "easeInOut",

            }}

          />

          <div className="absolute left-[21%] top-[18%] h-24 w-24 rounded-full bg-white/12 blur-sm" />

        </>

      )}



      {/* Footer labels */}

      <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">

        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/80">

          {moment?.label ?? item.event}

        </span>

        <span className="font-mono text-[10px] text-white/80">

          PSY /{" "}

          {String(galleryEvents.indexOf(item) + 1).padStart(2, "0")}

        </span>

      </div>

    </div>

  );

}



// ======================================================

// MAIN GALLERY

// ======================================================



export function Gallery() {

  const [activeEvent, setActiveEvent] = useState("All");

  const [selectedItem, setSelectedItem] =

    useState<GalleryEvent | null>(null);

  const [selectedMomentIndex, setSelectedMomentIndex] = useState(0);



  const dragStartX = useRef<number | null>(null);



  const filters = useMemo(

    () => ["All", ...Array.from(new Set(galleryEvents.map((item) => item.event)))],

    []

  );



  const visibleItems =

    activeEvent === "All"

      ? galleryEvents

      : galleryEvents.filter((item) => item.event === activeEvent);



  // Keyboard navigation and background scroll lock

  useEffect(() => {

    if (!selectedItem) return;



    const onKeyDown = (event: KeyboardEvent) => {

      if (event.key === "Escape") {

        setSelectedItem(null);

      }



      if (event.key === "ArrowLeft") {

        setSelectedMomentIndex((index) =>

          index === 0 ? selectedItem.moments.length - 1 : index - 1

        );

      }



      if (event.key === "ArrowRight") {

        setSelectedMomentIndex(

          (index) => (index + 1) % selectedItem.moments.length

        );

      }

    };



    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";



    window.addEventListener("keydown", onKeyDown);



    return () => {

      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", onKeyDown);

    };

  }, [selectedItem]);



  const showPreviousMoment = () => {

    if (!selectedItem) return;



    setSelectedMomentIndex((index) =>

      index === 0 ? selectedItem.moments.length - 1 : index - 1

    );

  };



  const showNextMoment = () => {

    if (!selectedItem) return;



    setSelectedMomentIndex(

      (index) => (index + 1) % selectedItem.moments.length

    );

  };



  const handlePointerDown = (

    event: ReactPointerEvent<HTMLDivElement>

  ) => {

    dragStartX.current = event.clientX;

    event.currentTarget.setPointerCapture(event.pointerId);

  };



  const handlePointerUp = (

    event: ReactPointerEvent<HTMLDivElement>

  ) => {

    if (dragStartX.current === null) return;



    const distance = event.clientX - dragStartX.current;

    dragStartX.current = null;



    if (Math.abs(distance) > 42) {

      if (distance < 0) showNextMoment();

      else showPreviousMoment();

    }

  };



  return (

    <div className="min-h-[100dvh] overflow-hidden bg-background text-foreground">

      {/* HEADER */}

      <header className="relative border-b border-border bg-card">

        <div className="container relative mx-auto px-6 pb-20 pt-8 md:pb-28 md:pt-10">

          <Link

            href="/"

            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/45 transition-colors hover:text-foreground"

          >

            <ArrowLeft

              size={14}

              className="transition-transform group-hover:-translate-x-1"

            />

            Back to PSYNAPSE

          </Link>



          <motion.div

            initial={{ opacity: 0, y: 22 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{

              duration: 0.8,

              ease: [0.22, 1, 0.36, 1],

            }}

            className="mt-20 max-w-3xl"

          >

            <div className="mb-6 flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">

                <Camera size={17} />

              </span>

              <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">

                The PSYNAPSE archive

              </p>

            </div>



            <h1 className="max-w-2xl text-5xl font-semibold leading-[.95] text-foreground md:text-8xl">

              Curiosity, in motion.

            </h1>



            <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-foreground/55 md:text-lg">

              A living record of the questions, experiments, and gatherings

              that make our psychology club feel like a place to belong.

            </p>

          </motion.div>



          <motion.div

            className="pointer-events-none absolute -right-24 bottom-[-120px] hidden h-80 w-80 rounded-full border border-accent/20 md:block"

            animate={{ rotate: 360 }}

            transition={{

              duration: 32,

              repeat: Infinity,

              ease: "linear",

            }}

          />



          <motion.div

            className="pointer-events-none absolute right-24 bottom-[-26px] hidden h-32 w-32 rounded-full border border-foreground/10 md:block"

            animate={{ rotate: -360, scale: [1, 1.06, 1] }}

            transition={{

              duration: 18,

              repeat: Infinity,

              ease: "easeInOut",

            }}

          />

        </div>

      </header>



      {/* GALLERY GRID */}

      <main className="container mx-auto px-6 py-16 md:py-24">

        <div className="mb-12 flex flex-col justify-between gap-5 border-b border-border pb-5 md:flex-row md:items-end">

          <div>

            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/35">

              Browse by event

            </p>

            <p className="mt-2 text-sm font-light text-foreground/45">

              Every card holds a small chapter of the club.

            </p>

          </div>



          <div className="relative">

            <select

              value={activeEvent}

              onChange={(event) => setActiveEvent(event.target.value)}

              className="appearance-none rounded-full border border-border bg-card py-3 pl-4 pr-10 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/65 outline-none transition-colors focus:border-accent"

              aria-label="Filter gallery by event"

            >

              {filters.map((filter) => (

                <option key={filter} value={filter}>

                  {filter}

                </option>

              ))}

            </select>



            <ChevronDown

              size={14}

              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground/45"

            />

          </div>

        </div>



        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <AnimatePresence mode="popLayout">

            {visibleItems.map((item, index) => (

              <motion.button

                key={item.id}

                type="button"

                layout

                initial={{ opacity: 0, y: 24 }}

                animate={{ opacity: 1, y: 0 }}

                exit={{ opacity: 0, scale: 0.96 }}

                transition={{ duration: 0.45, delay: index * 0.05 }}

                onClick={() => {

                  setSelectedItem(item);

                  setSelectedMomentIndex(0);

                }}

                className={`group text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background ${

                  index === 0 ? "md:col-span-2 lg:col-span-2" : ""

                }`}

              >

                <div className="overflow-hidden rounded-[1.6rem] border border-border bg-card p-2 shadow-sm transition-shadow duration-500 group-hover:shadow-xl">

                  <div className="relative">

                    <AbstractVisual

                      item={item}

                      large={index === 0}

                    />



                    <span className="absolute right-5 top-5 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                      <ArrowUpRight size={17} />

                    </span>

                  </div>



                  <div className="px-3 pb-4 pt-5">

                    <div className="mb-3 flex items-center justify-between gap-3">

                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">

                        {item.tag}

                      </span>



                      <span className="flex items-center gap-1 font-mono text-[10px] text-foreground/35">

                        <CalendarDays size={12} />

                        {item.date}

                      </span>

                    </div>



                    <h2 className="max-w-md text-2xl font-semibold leading-tight text-foreground">

                      {item.title}

                    </h2>



                    <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-foreground/45">

                      {item.description}

                    </p>

                  </div>

                </div>

              </motion.button>

            ))}

          </AnimatePresence>

        </motion.div>

      </main>



      {/* FOOTER */}

      <footer className="border-t border-border bg-card">

        <div className="container mx-auto flex flex-col justify-between gap-4 px-6 py-8 text-xs font-mono text-foreground/35 md:flex-row md:items-center">

          <span>PSYNAPSE / DPS Dwarka</span>

          <Link

            href="/"

            className="text-foreground/45 transition-colors hover:text-foreground"

          >

            Return to the main experience

          </Link>

        </div>

      </footer>



      {/* EXPANDED GALLERY MODAL */}

      <AnimatePresence>

        {selectedItem && (

          <motion.div

            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/75 p-5 backdrop-blur-md sm:p-8"

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            exit={{ opacity: 0 }}

            onMouseDown={(event) => {

              if (event.target === event.currentTarget) {

                setSelectedItem(null);

              }

            }}

          >

            <motion.div

              role="dialog"

              aria-modal="true"

              aria-label={`${selectedItem.event} gallery item`}

              className="relative grid max-h-[90dvh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-white/15 bg-background p-4 shadow-2xl sm:grid-cols-[1.1fr_.9fr] sm:gap-7 sm:p-7"

              initial={{ opacity: 0, y: 24, scale: 0.96 }}

              animate={{ opacity: 1, y: 0, scale: 1 }}

              exit={{ opacity: 0, y: 18, scale: 0.97 }}

            >

              <button

                type="button"

                onClick={() => setSelectedItem(null)}

                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/85 text-foreground/55 transition-colors hover:text-foreground"

                aria-label="Close gallery item"

              >

                <X size={17} />

              </button>



              {/* IMAGE CAROUSEL */}

              <div

                className="relative min-h-[290px] touch-pan-y"

                role="region"

                aria-roledescription="carousel"

                aria-label={`${selectedItem.event} moments`}

                onPointerDown={handlePointerDown}

                onPointerUp={handlePointerUp}

              >

                <AnimatePresence mode="wait" initial={false}>

                  <motion.div

                    key={selectedItem.moments[selectedMomentIndex].id}

                    className="h-full"

                    initial={{ opacity: 0, x: 18 }}

                    animate={{ opacity: 1, x: 0 }}

                    exit={{ opacity: 0, x: -18 }}

                    transition={{ duration: 0.28 }}

                  >

                    <AbstractVisual

                      item={selectedItem}

                      large

                      moment={selectedItem.moments[selectedMomentIndex]}

                    />

                  </motion.div>

                </AnimatePresence>



                <button

                  type="button"

                  onClick={showPreviousMoment}

                  aria-label="Show previous gallery moment"

                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-foreground/35 text-white backdrop-blur-sm transition-colors hover:bg-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"

                >

                  <ArrowLeft size={17} />

                </button>



                <button

                  type="button"

                  onClick={showNextMoment}

                  aria-label="Show next gallery moment"

                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-foreground/35 text-white backdrop-blur-sm transition-colors hover:bg-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"

                >

                  <ArrowRight size={17} />

                </button>



                <div

                  className="absolute inset-x-5 bottom-4 flex items-center justify-between gap-3 rounded-full bg-foreground/35 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm"

                  aria-live="polite"

                >

                  <span>

                    {selectedItem.moments[selectedMomentIndex].label}

                  </span>

                  <span>

                    {selectedMomentIndex + 1} / {selectedItem.moments.length}

                  </span>

                </div>

              </div>



              {/* EVENT DETAILS */}

              <div className="flex flex-col justify-center px-2 pb-3 pt-8 sm:px-4 sm:py-8">

                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">

                  {selectedItem.event}

                </p>



                <h3 className="mt-5 text-4xl font-semibold leading-[.98] text-foreground">

                  {selectedItem.title}

                </h3>



                <div className="my-7 h-px w-14 bg-accent/50" />



                <p className="text-base font-light leading-relaxed text-foreground/60">

                  {selectedItem.description}

                </p>



                <p className="mt-4 text-sm font-light leading-relaxed text-foreground/45">

                  {selectedItem.moments[selectedMomentIndex].note}

                </p>



                <div className="mt-8 flex items-center gap-2 font-mono text-xs text-foreground/35">

                  <CalendarDays size={14} />

                  {selectedItem.date}

                </div>



                <div className="mt-7 flex items-center gap-2">

                  <Images size={14} className="text-accent" />

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">

                    Swipe, drag, or use the arrow keys

                  </span>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  );

}
