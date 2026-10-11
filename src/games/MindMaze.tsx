import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAZES = [
  {
    grid: [
      "##########",
      "#S.......#",
      "#.######.#",
      "#.#....#.#",
      "#.#.##.#.#",
      "#...#..#.#",
      "#####.##.#",
      "#......#.#",
      "#.######.#",
      "#.......E#",
      "##########",
    ],
  },
  {
    grid: [
      "############",
      "#S.........#",
      "#.########.#",
      "#.#......#.#",
      "#.#.####.#.#",
      "#.#.#..#.#.#",
      "#.#.#.##.#.#",
      "#...#....#.#",
      "#####.####.#",
      "#..........#",
      "#.########.#",
      "#.........E#",
      "############",
    ],
  },
];

type Dir = "up" | "down" | "left" | "right";
type GamePhase = "intro" | "playing" | "won";

function findPos(grid: string[], ch: string): [number, number] {
  for (let r = 0; r < grid.length; r++) {
    const c = grid[r].indexOf(ch);
    if (c !== -1) return [r, c];
  }
  return [0, 0];
}

export function MindMaze() {
  const [mazeIdx, setMazeIdx] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const phaseRef = useRef<GamePhase>("intro");
  const positionRef = useRef<[number, number]>([0, 0]);
  const startTimeRef = useRef(0);

  const maze = MAZES[mazeIdx];
  const maxColumns = maze.grid[0].length;
  const setGamePhase = useCallback((nextPhase: GamePhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const start = useCallback(() => {
    const [sr, sc] = findPos(maze.grid, "S");
    positionRef.current = [sr, sc];
    setPos([sr, sc]);
    setMoves(0);
    const now = Date.now();
    startTimeRef.current = now;
    setStartTime(now);
    setElapsed(0);
    setGamePhase("playing");
  }, [maze, setGamePhase]);

  useEffect(() => {
    if (phase !== "playing") return;
    const t = setInterval(() => setElapsed(Date.now() - startTime), 200);
    return () => clearInterval(t);
  }, [phase, startTime]);

  const move = useCallback((dir: Dir) => {
    if (phaseRef.current !== "playing") return;
    const [r, c] = positionRef.current;
    const deltas: Record<Dir, [number, number]> = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
    const [dr, dc] = deltas[dir];
    const nr = r + dr;
    const nc = c + dc;
    if (nr < 0 || nr >= maze.grid.length || nc < 0 || nc >= maze.grid[nr].length) return;

    const cell = maze.grid[nr][nc];
    if (cell === "#") return;

    const nextPosition: [number, number] = [nr, nc];
    positionRef.current = nextPosition;
    setPos(nextPosition);
    setMoves((current) => current + 1);

    if (cell === "E") {
      setElapsed(Date.now() - startTimeRef.current);
      setGamePhase("won");
    }
  }, [maze, setGamePhase]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phaseRef.current !== "playing") return;
      if (e.target instanceof HTMLElement && e.target.isContentEditable) return;

      const key = e.key.toLowerCase();
      const direction: Dir | undefined =
        key === "arrowup" || key === "w" ? "up" :
        key === "arrowdown" || key === "s" ? "down" :
        key === "arrowleft" || key === "a" ? "left" :
        key === "arrowright" || key === "d" ? "right" :
        undefined;

      if (!direction) return;
      e.preventDefault();
      move(direction);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [move]);

  const CELL = 28;
  const fmt = (ms: number) => `${(ms / 1000).toFixed(1)}s`;

  const nextMaze = () => {
    const next = (mazeIdx + 1) % MAZES.length;
    setMazeIdx(next);
    positionRef.current = [0, 0];
    startTimeRef.current = 0;
    setPos([0, 0]);
    setMoves(0);
    setStartTime(0);
    setElapsed(0);
    setGamePhase("intro");
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center" data-testid="mind-maze-game">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md">
            <p className="text-[#999] mb-4 text-lg">Navigate from <span className="text-green-400 font-bold">S</span> to <span className="text-[#A32020] font-bold">E</span>.</p>
            <p className="text-[#666] text-sm mb-8">Use arrow keys, WASD, or the on-screen controls. Maze {mazeIdx + 1} of {MAZES.length}.</p>
            <button onClick={start} className="px-10 py-4 bg-[#A32020] text-[#F4E8D4] rounded-lg font-medium text-lg hover:bg-[#D93A3A] transition-colors" data-testid="start-btn">Enter Maze</button>
          </motion.div>
        )}

        {phase === "playing" && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
            <div className="flex gap-8 font-mono text-sm">
              <span className="text-[#F4E8D4]">Moves: {moves}</span>
              <span className="text-[#666]">{fmt(elapsed)}</span>
            </div>
            <div
              role="grid"
              aria-label={`Mind Maze ${mazeIdx + 1}`}
              className="mx-auto grid max-w-full overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#0d0d0d]"
              style={{ width: `min(100%, ${maxColumns * CELL}px)`, gridTemplateColumns: `repeat(${maxColumns}, minmax(0, 1fr))` }}
            >
              {maze.grid.map((row, r) => row.split("").map((cell, c) => {
                const isPlayer = pos[0] === r && pos[1] === c;
                return (
                  <div
                    key={`${r}-${c}`}
                    role="gridcell"
                    style={{ aspectRatio: "1 / 1", minWidth: 0 }}
                    className={`flex items-center justify-center text-xs font-bold transition-colors ${
                      cell === "#" ? "bg-[#1a1a1a] border border-[#222]" :
                      cell === "E" ? "bg-[#A32020]/20" :
                      cell === "S" ? "bg-[#1e1e1e]" :
                      "bg-[#0d0d0d]"
                    }`}
                  >
                    {isPlayer ? (
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 max-w-[80%] max-h-[80%] rounded-full bg-[#F4E8D4] shadow-[0_0_8px_rgba(244,232,212,0.8)]" />
                    ) : cell === "E" ? (
                      <span className="text-[#A32020] font-bold text-sm">E</span>
                    ) : cell === "S" ? (
                      <span className="text-green-400/30 text-xs">s</span>
                    ) : null}
                  </div>
                );
              }))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[["", "up", ""], ["left", "down", "right"]].map((row, ri) => (
                <div key={ri} className="contents">
                  {row.map((dir, ci) => (
                    dir ? (
                      <button key={ci} onClick={() => move(dir as Dir)} className="w-12 h-12 bg-[#151515] border border-[#2a2a2a] rounded-lg text-[#F4E8D4] hover:bg-[#1e1e1e] hover:border-[#A32020] active:scale-95 transition-all font-mono text-lg" data-testid={`btn-${dir}`}>
                        {dir === "up" ? "↑" : dir === "down" ? "↓" : dir === "left" ? "←" : "→"}
                      </button>
                    ) : <div key={ci} className="w-12 h-12" />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "won" && (
          <motion.div key="won" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
            <div className="text-5xl font-serif font-bold text-[#F4E8D4] mb-2">Maze Solved</div>
            <div className="text-[#A32020] font-mono mb-4">{moves} moves · {fmt(elapsed)}</div>
            <p className="text-[#999] mb-8 max-w-xs mx-auto">Spatial reasoning and working memory are engaged simultaneously in maze navigation — a powerful cognitive workout.</p>
            <div className="flex gap-4 justify-center">
              <button onClick={start} className="px-6 py-3 bg-[#151515] border border-[#2a2a2a] text-[#F4E8D4] rounded-lg font-medium hover:border-[#A32020] transition-colors">Retry</button>
              <button onClick={nextMaze} className="px-6 py-3 bg-[#A32020] text-[#F4E8D4] rounded-lg font-medium hover:bg-[#D93A3A] transition-colors" data-testid="next-maze-btn">Next Maze</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
