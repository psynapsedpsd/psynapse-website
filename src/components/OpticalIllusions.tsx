import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, RotateCcw } from "lucide-react";

interface Illusion {
  id: number;
  name: string;
  category: string;
  tagline: string;
  explanation: string;
  science: string;
  svg: React.ReactNode;
}

/* ─────────────── Individual illusion SVGs ─────────────── */

function MullerLyer() {
  return (
    <svg viewBox="0 0 220 100" className="w-full h-full">
      {/* Line 1 — arrows pointing OUT (looks shorter) */}
      <line x1="30" y1="35" x2="130" y2="35" stroke="white" strokeWidth="2.5" />
      <line x1="30" y1="35" x2="48" y2="20" stroke="white" strokeWidth="2.5" />
      <line x1="30" y1="35" x2="48" y2="50" stroke="white" strokeWidth="2.5" />
      <line x1="130" y1="35" x2="112" y2="20" stroke="white" strokeWidth="2.5" />
      <line x1="130" y1="35" x2="112" y2="50" stroke="white" strokeWidth="2.5" />
      {/* Line 2 — arrows pointing IN (looks longer) */}
      <line x1="30" y1="70" x2="130" y2="70" stroke="#f87171" strokeWidth="2.5" />
      <line x1="30" y1="70" x2="12" y2="55" stroke="#f87171" strokeWidth="2.5" />
      <line x1="30" y1="70" x2="12" y2="85" stroke="#f87171" strokeWidth="2.5" />
      <line x1="130" y1="70" x2="148" y2="55" stroke="#f87171" strokeWidth="2.5" />
      <line x1="130" y1="70" x2="148" y2="85" stroke="#f87171" strokeWidth="2.5" />
      <text x="160" y="39" fill="white" fontSize="10" fontFamily="serif" opacity="0.5">A</text>
      <text x="160" y="74" fill="#f87171" fontSize="10" fontFamily="serif" opacity="0.7">B</text>
    </svg>
  );
}






function KanizsaTriangle() {
  const cream = "#f1e7c8";

  return (
    <svg
      viewBox="0 0 200 180"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Kanizsa triangle optical illusion"
    >
      <rect width="200" height="180" fill="#080808" />

      {/* Top disc: opening faces downward */}
      <path
        d="M 100 28
           A 32 32 0 1 1 99.99 28
           L 83 57
           L 117 57
           Z"
        fill={cream}
        fillRule="evenodd"
        transform="rotate(0 100 60)"
      />

      {/* Bottom-left disc: opening faces upper-right */}
      <path
        d="M 45 128
           A 32 32 0 1 1 44.99 128
           L 73 111
           L 73 145
           Z"
        fill={cream}
        fillRule="evenodd"
        transform="rotate(0 60 128)"
      />

      {/* Bottom-right disc: opening faces upper-left */}
      <path
        d="M 155 128
           A 32 32 0 1 1 154.99 128
           L 127 111
           L 127 145
           Z"
        fill={cream}
        fillRule="evenodd"
        transform="rotate(0 140 128)"
      />
    </svg>
  );
}






function HermannGrid() {
  const size = 13; const gap = 6; const cols = 7; const rows = 6;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(<rect key={`${r}-${c}`} x={c * (size + gap)} y={r * (size + gap)} width={size} height={size} fill="#1a1a1a" rx="1" />);
    }
  }
  return (
    <svg viewBox="0 0 133 110" className="w-full h-full" style={{ background: "#888" }}>
      {cells}
      <text x="66" y="106" textAnchor="middle" fill="white" fontSize="7" fontFamily="serif" opacity="0.5">Grey dots appear at intersections</text>
    </svg>
  );
}

function EbbinghausIllusion() {
  return (
    <svg viewBox="0 0 220 100" className="w-full h-full">
      {/* Left: center circle surrounded by big circles */}
      {[0,1,2,3,4,5].map(i => {
        const angle = (i / 6) * 2 * Math.PI;
        return <circle key={i} cx={55 + Math.cos(angle) * 28} cy={50 + Math.sin(angle) * 28} r={13} fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />;
      })}
      <circle cx="55" cy="50" r="11" fill="#f87171" />
      {/* Right: center circle surrounded by small circles */}
      {[0,1,2,3,4,5,6,7].map(i => {
        const angle = (i / 8) * 2 * Math.PI;
        return <circle key={i} cx={155 + Math.cos(angle) * 20} cy={50 + Math.sin(angle) * 20} r={5} fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />;
      })}
      <circle cx="155" cy="50" r="11" fill="#f87171" />
      <text x="55" y="95" textAnchor="middle" fill="white" fontSize="8" fontFamily="serif" opacity="0.5">Looks smaller</text>
      <text x="155" y="95" textAnchor="middle" fill="white" fontSize="8" fontFamily="serif" opacity="0.5">Looks bigger</text>
    </svg>
  );
}



function RubinsVase() {
  return (
    <svg
      viewBox="0 0 160 180"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Rubin's vase: a vase or two facing profiles"
    >
      {/* Black background forms the two faces */}
      <rect width="160" height="180" fill="#000000" />

      {/* One smooth, symmetrical vase silhouette */}
      <path
        d="
          M 59 12
          C 51 12, 39 14, 32 22
          C 43 27, 49 36, 51 47
          C 53 57, 58 63, 66 68
          C 71 72, 74 76, 75 80

          L 73 83
          C 69 85, 64 86, 61 89
          L 66 92
          L 72 93
          L 68 97
          C 71 100, 74 101, 75 105

          C 73 113, 67 117, 60 123
          C 55 129, 53 137, 51 145
          C 49 156, 42 164, 32 168
          C 39 176, 51 177, 59 177

          L 101 177
          C 109 177, 121 176, 128 168
          C 118 164, 111 156, 109 145
          C 107 137, 105 129, 100 123
          C 93 117, 87 113, 85 105

          C 86 101, 89 100, 92 97
          L 88 93
          L 94 92
          L 99 89
          C 96 86, 91 85, 87 83
          L 85 80

          C 86 76, 89 72, 94 68
          C 102 63, 107 57, 109 47
          C 111 36, 117 27, 128 22
          C 121 14, 109 12, 101 12
          Z
        "
        fill="#f1e7b5"
      />
    </svg>
  );
}



function CafeWall() {
  const rows = [];
  for (let r = 0; r < 7; r++) {
    const offset = (r % 2) * 16;
    for (let c = -1; c < 9; c++) {
      rows.push(
        <rect key={`cell-${r}-${c}`} x={c * 32 + offset} y={r * 18} width={16} height={14} fill={c % 2 === 0 ? "#111" : "#eee"} />
      );
    }
    rows.push(<line key={`hline-${r}`} x1="0" y1={r * 18 + 14} x2="240" y2={r * 18 + 14} stroke="#888" strokeWidth="4" />);
  }
  return (
    <svg viewBox="0 0 160 130" className="w-full h-full" style={{ background: "#888" }}>
      {rows}
      <text x="80" y="127" textAnchor="middle" fill="white" fontSize="7" fontFamily="serif">Are the grey lines parallel?</text>
    </svg>
  );
}

function ZollnerIllusion() {
  const lines = [];
  for (let i = 0; i < 5; i++) {
    const y = 20 + i * 28;
    lines.push(<line key={`main${i}`} x1="10" y1={y} x2="190" y2={y} stroke="white" strokeWidth="2" />);
    for (let x = 20; x < 185; x += 18) {
      const d = i % 2 === 0 ? 1 : -1;
      lines.push(<line key={`h${i}-${x}`} x1={x} y1={y - 8} x2={x + 8 * d} y2={y + 8} stroke="white" strokeWidth="1.2" opacity="0.6" />);
    }
  }
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {lines}
      <text x="100" y="155" textAnchor="middle" fill="white" fontSize="8" fontFamily="serif" opacity="0.5">All horizontal lines are parallel</text>
    </svg>
  );
}

function SimultaneousContrast() {
  return (
    <svg viewBox="0 0 220 120" className="w-full h-full">
      <rect x="5" y="10" width="95" height="100" fill="#111" rx="6" />
      <rect x="120" y="10" width="95" height="100" fill="#ddd" rx="6" />
      <rect x="35" y="35" width="40" height="50" fill="#888" rx="4" />
      <rect x="148" y="35" width="40" height="50" fill="#888" rx="4" />
      <text x="55" y="108" textAnchor="middle" fill="white" fontSize="8" fontFamily="serif" opacity="0.6">Same grey</text>
      <text x="168" y="108" textAnchor="middle" fill="#333" fontSize="8" fontFamily="serif" opacity="0.6">Same grey</text>
    </svg>
  );
}

/* ─────────────── Illusion data ─────────────── */
const illusions: Illusion[] = [
  {
    id: 1, name: "Müller-Lyer", category: "Size Distortion",
    tagline: "Two equal lines — one looks longer.",
    explanation: "Lines A and B are identical in length. The arrowheads pointing inward make a line look shorter, while outward arrows make it look longer.",
    science: "Your visual cortex uses context clues — like converging angles — to estimate depth and size. The arrows mimic corners of rooms, triggering 3D depth perception even on a flat surface.",
    svg: <MullerLyer />,
  },
  {
    id: 2, name: "Kanizsa Triangle", category: "Illusory Contours",
    tagline: "A triangle that doesn't exist.",
    explanation: "There are no triangle edges drawn here — only three pac-man circles. Yet your brain perceives a bright white triangle floating in the centre.",
    science: "The brain uses Gestalt completion to 'fill in' edges between fragmented shapes. This is your visual cortex doing predictive work — guessing what should be there.",
    svg: <KanizsaTriangle />,
  },
  {
    id: 3, name: "Hermann Grid", category: "Neural Inhibition",
    tagline: "Ghost dots at every intersection.",
    explanation: "Stare at the grid. Ghostly grey dots appear at all intersections — except the one you're looking at directly.",
    science: "Lateral inhibition in retinal ganglion cells. When a bright region is surrounded by bright neighbours, inhibitory signals reduce its apparent brightness. The fovea has fewer of these cells, so the effect vanishes where you focus.",
    svg: <HermannGrid />,
  },
  {
    id: 4, name: "Ebbinghaus Illusion", category: "Relative Size",
    tagline: "Identical circles, different sizes.",
    explanation: "Both red circles are exactly the same size. The surrounding context — large or small circles — tricks your brain into judging them differently.",
    science: "Size perception is relative, not absolute. Your visual system compares objects to their surroundings to infer scale. This is why the same coffee mug looks smaller on a restaurant table than on a desk.",
    svg: <EbbinghausIllusion />,
  },
  {
    id: 5, name: "Rubin's Vase", category: "Figure–Ground",
    tagline: "A vase. Or two faces. Pick one.",
    explanation: "You can see either a white vase in the centre or two dark profiles facing each other — but not both simultaneously.",
    science: "The brain cannot process an image as both figure and ground at the same time. It must choose. This constant switching reveals how actively your visual cortex constructs reality rather than passively recording it.",
    svg: <RubinsVase />,
  },
  {
    id: 6, name: "Café Wall", category: "Tilt Distortion",
    tagline: "Perfectly parallel lines look slanted.",
    explanation: "Every single horizontal grey line is completely parallel. The offset black-and-white tiles make them appear to converge and diverge alternately.",
    science: "Edge detectors in V1 (primary visual cortex) pick up strong local contrast signals. The brain integrates these signals into global line orientation — and the nearby tile edges corrupt that calculation.",
    svg: <CafeWall />,
  },
  {
    id: 7, name: "Zöllner Illusion", category: "Tilt Distortion",
    tagline: "Parallel lines that refuse to look parallel.",
    explanation: "All five long lines are perfectly parallel. The short diagonal hatch marks create a systematic tilt that bends your perception of the main lines.",
    science: "The brain infers line orientation partly from nearby angles. The hatching introduces an acute angle that biases orientation-sensitive neurons in the visual cortex, rotating your perceived angle by up to 10°.",
    svg: <ZollnerIllusion />,
  },
  {
    id: 8, name: "Simultaneous Contrast", category: "Colour Perception",
    tagline: "The same grey looks completely different.",
    explanation: "Both inner squares are painted the exact same shade of grey — #888888. On black, it appears light. On white, it appears dark.",
    science: "Colour and brightness are not absolute — they are computed relative to neighbours. The visual system evolved to detect contrast (edges) not absolute luminance, which is why the same pigment looks completely different depending on context.",
    svg: <SimultaneousContrast />,
  },
];

/* ─────────────── Component ─────────────── */
export function OpticalIllusions() {
  const [active, setActive] = useState<Illusion | null>(null);
  const [revealed, setRevealed] = useState(false);

  function openCard(ill: Illusion) {
    setActive(ill);
    setRevealed(false);
  }

  return (
    <section id="illusions" className="py-28 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-mono text-xs tracking-[0.35em] uppercase mb-4">Perception Lab</p>
          <h2 className="text-5xl md:text-6xl font-serif font-semibold text-foreground mb-4">
            Optical Illusions
          </h2>
          <p className="text-foreground/45 max-w-xl mx-auto font-light leading-relaxed">
            Your brain doesn't show you the world — it constructs it.<br />
            <span className="font-mono text-xs tracking-wider text-accent/70">Click any illusion to understand the science behind the trick.</span>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {illusions.map((ill, i) => (
            <motion.button
              key={ill.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => openCard(ill)}
              className="group relative rounded-2xl overflow-hidden text-left focus:outline-none"
              style={{ boxShadow: "0 4px 24px hsl(25 20% 8% / .12), 0 1px 4px hsl(25 20% 8% / .08)" }}
            >
              {/* Dark illusion display */}
              <div className="bg-[#111] aspect-[4/3] flex items-center justify-center p-4 relative overflow-hidden">
                <div className="w-full h-full">{ill.svg}</div>
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-300" />
              </div>
              {/* Card footer */}
              <div className="bg-card border border-border/60 border-t-0 rounded-b-2xl px-4 py-4"
                style={{ boxShadow: "inset 0 1px 0 hsl(25 20% 8% / .06)" }}>
                <span className="inline-block text-[9px] font-mono tracking-widest uppercase text-accent mb-1.5">{ill.category}</span>
                <h3 className="text-base font-serif font-semibold text-foreground group-hover:text-accent transition-colors">{ill.name}</h3>
                <p className="text-xs text-foreground/45 mt-1 font-light leading-snug">{ill.tagline}</p>
                <div className="mt-3 flex items-center gap-1 text-[10px] text-foreground/30 group-hover:text-accent/60 transition-colors font-mono tracking-wide">
                  <Eye className="w-3 h-3" /> <span>Click to reveal</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative z-10 bg-background rounded-3xl overflow-hidden w-full max-w-xl"
              style={{ boxShadow: "0 32px 80px hsl(25 20% 8% / .40), 0 8px 24px hsl(25 20% 8% / .20)" }}
            >
              {/* Illusion display */}
              <div className="bg-[#111] h-52 flex items-center justify-center p-6">
                <div className="w-full h-full">{active.svg}</div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-1">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-accent">{active.category}</span>
                  <button onClick={() => setActive(null)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/30 hover:text-foreground hover:bg-card transition-colors -mt-1">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-1">{active.name}</h3>
                <p className="text-foreground/50 text-sm font-light italic mb-5">"{active.tagline}"</p>

                <div className="h-px bg-border mb-5" />

                <AnimatePresence mode="wait">
                  {!revealed ? (
                    <motion.div key="pre" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <p className="text-foreground/65 leading-relaxed mb-6">{active.explanation}</p>
                      <button
                        onClick={() => setRevealed(true)}
                        className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
                      >
                        <Eye className="w-4 h-4" /> Reveal the Neuroscience
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="post" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}>
                      <div className="bg-card border border-border rounded-2xl p-5 mb-4">
                        <p className="text-[10px] font-mono tracking-widest text-accent uppercase mb-2">Neuroscience</p>
                        <p className="text-foreground/70 leading-relaxed text-sm">{active.science}</p>
                      </div>
                      <button onClick={() => setRevealed(false)}
                        className="flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground transition-colors font-mono">
                        <RotateCcw className="w-3 h-3" /> Back
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
