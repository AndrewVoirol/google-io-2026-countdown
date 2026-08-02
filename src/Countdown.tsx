import { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const CODE_SNIPPETS = [
  "import { GoogleGenAI } from '@google/genai';",
  "const ai = new GoogleGenAI();",
  "const response = await ai.models.generateContent({",
  "  model: 'gemini-3.5-pro',",
  "  contents: [{ role: 'user', parts: [{ text: 'Initiate I/O sequence' }] }]",
  "});",
  "const agent = new Agent({ tools: [search_web] });",
  "await agent.solve(task);",
  "// Synthesizing data...",
  "// Expanding context window...",
  "// Optimizing pathways...",
  "function optimize(graph: Node[]) { ... }",
  "System.out.println(\"Hello, World!\");"
];

function generateCodeBlocks(count: number, prefix: string) {
  const blocks = [];
  for (let i = 0; i < count; i++) {
    blocks.push(prefix + CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)]);
  }
  return blocks;
}

const COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC05',
  green: '#34A853',
};

type ColorKey = keyof typeof COLORS;

interface PillarProps {
  id: string;
  color: ColorKey;
  codeLines: string[];
  isRightPillar: boolean;
  entranceDelay?: number;
}

function LiquidMetalFilter() {
  return (
    <svg className="absolute w-0 h-0">
      <defs>
         <filter id="liquid-metal">
           <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
           <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -9" result="liquid" />
           <feBlend in="SourceGraphic" in2="liquid" />
         </filter>
      </defs>
    </svg>
  );
}

/** Check if device supports hover (i.e. has a fine pointer — not touch-only) */
function useHasHover() {
  const [hasHover, setHasHover] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(pointer: fine)').matches;
  });

  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)');
    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return hasHover;
}

export default function IO2026Countdown() {
  const codeLinesLeft = useMemo(() => generateCodeBlocks(40, ""), []);
  const codeLinesRight = useMemo(() => generateCodeBlocks(40, ""), []);
  const hasHover = useHasHover();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const trailX1 = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const trailY1 = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const trailX2 = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const trailY2 = useSpring(mouseY, { damping: 40, stiffness: 100 });

  useEffect(() => {
    if (!hasHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 24);
      mouseY.set(e.clientY - 24);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, hasHover]);

  return (
    <div className={`relative min-h-screen w-full bg-[#050505] text-[#F8F9FA] overflow-hidden flex flex-col items-center justify-between font-sans selection:bg-blue-500/30 ${hasHover ? 'cursor-none' : ''}`}>
      <LiquidMetalFilter />

      {/* Agentic Cursor — only render on hover-capable devices */}
      {hasHover && (
        <>
          <motion.div
            className="fixed pointer-events-none z-[98] text-4xl font-black tracking-tighter mix-blend-screen"
            style={{ left: trailX2, top: trailY2 }}
          >
            <span className="text-purple-500 opacity-60 blur-[2px]">11</span>
          </motion.div>
          <motion.div
            className="fixed pointer-events-none z-[99] text-4xl font-black tracking-tighter mix-blend-screen"
            style={{ left: trailX1, top: trailY1 }}
          >
            <span className="text-cyan-400 opacity-80 blur-[1px]">11</span>
          </motion.div>
          <motion.div
            className="fixed pointer-events-none z-[100] text-4xl font-black tracking-tighter mix-blend-screen"
            style={{ left: smoothX, top: smoothY }}
          >
            <span className="text-white drop-shadow-[0_0_15px_#00F0FF]">11</span>
          </motion.div>
        </>
      )}

      {/* Full-screen plasma aura — breathing opacity */}
      <motion.div
        className="fixed inset-0 z-0 mix-blend-screen pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(66, 133, 244, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(234, 67, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 30%, rgba(251, 188, 5, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(52, 168, 83, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(66, 133, 244, 0.4) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(234, 67, 53, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(66, 133, 244, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(234, 67, 53, 0.3) 0%, transparent 50%)"
          ],
          opacity: [0.3, 0.5, 0.35, 0.45, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Visual Accents (Dashed Paths) — animated flow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 1024 768" preserveAspectRatio="none">
          <path className="accent-path" d="M100,200 Q300,100 512,384 T924,200" stroke="#4285F4" strokeWidth="1" fill="none" strokeDasharray="4 8" />
          <path className="accent-path" d="M0,600 Q200,700 512,384 T1024,600" stroke="#34A853" strokeWidth="1" fill="none" strokeDasharray="2 12" />
          <path className="accent-path" d="M200,100 Q500,300 700,150 T1024,300" stroke="#EA4335" strokeWidth="0.8" fill="none" strokeDasharray="3 10" style={{ animationDelay: '-4s' }} />
          <path className="accent-path" d="M0,400 Q250,500 512,350 T900,500" stroke="#FBBC05" strokeWidth="0.8" fill="none" strokeDasharray="5 10" style={{ animationDelay: '-8s' }} />
        </svg>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative w-full z-10">

        {/* The '11' Centerpiece — tightened gap, centered properly */}
        <motion.div
          className="flex flex-row items-center justify-center gap-6 md:gap-10 z-10 mt-8 mb-4 group"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >

          {/* Left Pillar -> 1 */}
          <Pillar
            id="left-pillar"
            color="blue"
            codeLines={codeLinesLeft}
            isRightPillar={false}
            entranceDelay={0.1}
          />

          {/* Right Pillar -> 1 */}
          <Pillar
            id="right-pillar"
            color="green"
            codeLines={codeLinesRight}
            isRightPillar={true}
            entranceDelay={0.25}
          />

        </motion.div>

        {/* Messaging below visualization */}
        <motion.div
          className="mt-12 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-light tracking-tighter text-white opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <span
              className="inline-block italic font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-400 to-yellow-400 relative"
            >
              11 Days
            </span> to Google I/O
          </motion.h1>
        </motion.div>
        <motion.p
          className="mt-6 text-gray-400 font-mono text-sm tracking-[0.3em] uppercase text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {'// the code was counting too'}
        </motion.p>
      </main>

      <motion.footer
        className="w-full px-12 py-12 flex justify-center items-end z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <div className="flex gap-4 items-center">
          <TimeUnit value="11" label="Days" />
          <span className="text-3xl font-thin opacity-20 -translate-y-2">:</span>
          <TimeUnit value="00" label="Hours" />
          <span className="text-3xl font-thin opacity-20 -translate-y-2">:</span>
          <TimeUnit value="00" label="Mins" />
          <span className="text-3xl font-thin opacity-20 -translate-y-2">:</span>
          <TimeUnit value="00" label="Secs" />
        </div>
      </motion.footer>
    </div>
  );
}

function TimeUnit({ value, label }: { value: string, label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[64px]">
      <span className="text-4xl font-light tabular-nums tracking-tighter text-white">{value}</span>
      <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
}

function Pillar({ id, color, codeLines, isRightPillar, entranceDelay = 0 }: PillarProps) {
  const [hovered, setHovered] = useState(false);
  const itemColor = COLORS[color];

  // Pre-compute random animation values so they're stable across re-renders
  const orbAnimations = useMemo(() => [1, 2].map(() => ({
    duration: Math.random() * 3 + 3,
    delay: Math.random() * 2,
  })), []);

  return (
    <motion.div
      className="relative flex items-center justify-center cursor-none z-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0, scale: hovered ? 1.05 : 1 }}
      transition={{
        opacity: { duration: 0.8, delay: entranceDelay },
        y: { duration: 0.8, delay: entranceDelay, ease: "easeOut" },
        scale: { duration: 0.4, type: "spring", bounce: 0.4 }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Beak / Serif of the '1' */}
      <motion.div
        className="absolute top-[20px] left-[-30px] md:left-[-40px] w-[50px] md:w-[70px] h-[30px] md:h-[40px] rounded-full z-0 origin-bottom-right"
        style={{
          background: `linear-gradient(135deg, ${itemColor}40 0%, transparent 100%)`,
          borderTop: `2px solid ${itemColor}`,
          borderLeft: `2px solid ${itemColor}`,
          boxShadow: hovered ? `0 0 30px ${itemColor}60` : `0 0 15px ${itemColor}20`,
          backdropFilter: 'blur(8px)',
        }}
        initial={{ rotate: -40 }}
        animate={{
          rotate: hovered ? -30 : -40,
          left: hovered ? -35 : -40
        }}
        transition={{ type: "spring", bounce: 0.5 }}
      />

      {/* Main Stem Capsule */}
      <div
        className="relative w-[80px] md:w-[110px] h-[340px] md:h-[420px] rounded-[40px] md:rounded-[60px] overflow-hidden z-10"
        style={{
          background: hovered ? `linear-gradient(180deg, ${itemColor}20 0%, rgba(255,255,255,0.02) 100%)` : `linear-gradient(180deg, ${itemColor}0A 0%, rgba(255,255,255,0.01) 100%)`,
          border: `1px solid rgba(255,255,255,0.1)`,
          borderTop: `2px solid ${itemColor}`,
          borderBottom: `2px solid ${itemColor}40`,
          boxShadow: hovered ? `0 0 50px ${itemColor}50, inset 0 0 30px ${itemColor}20` : `0 0 20px ${itemColor}10, inset 0 0 10px ${itemColor}05`,
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Inner Floating Agent Nodes / Orbs */}
        {orbAnimations.map((anim, idx) => (
           <motion.div
             key={idx}
             className="absolute left-1/2 -ml-6 w-12 h-12 rounded-full mix-blend-screen"
             style={{
               background: `radial-gradient(circle, ${itemColor} 0%, transparent 70%)`,
               filter: 'blur(4px)'
             }}
             animate={{
               y: [500, -100]
             }}
             transition={{
               duration: anim.duration,
               repeat: Infinity,
               ease: "linear",
               delay: anim.delay
             }}
           />
        ))}

        {/* Code Streaming Area */}
        <motion.div
          className="absolute w-full px-2 md:px-4 flex flex-col items-center font-mono text-[10px] md:text-[12px] font-medium leading-[1.8] whitespace-nowrap select-none mix-blend-screen"
          style={{ color: itemColor }}
          animate={{ y: ["-50%", "0%"] }}
          transition={{
            y: { duration: isRightPillar ? 30 : 25, repeat: Infinity, ease: "linear" }
          }}
        >
          {[0, 1].map((blockIdx) => (
            <div key={blockIdx} className="flex flex-col items-center">
              {codeLines.map((line: string, i: number) => {
                 const isGlitchy = i % 8 === 0;
                 const isHighlight = i % 13 === 0;
                 // Deterministic but varied durations based on line index
                 const glitchDuration = 0.8 + (i % 5) * 0.3;
                 return (
                   <motion.div
                     key={`${blockIdx}-${i}`}
                     className="my-[4px] w-full text-center"
                     initial={{ opacity: 0.8 }}
                     animate={{
                       opacity: isGlitchy ? [0.8, 0.2, 1, 0.4, 0.8] : (hovered ? 1 : 0.8),
                       x: hovered && isGlitchy ? [0, -4, 4, 0] : 0,
                       color: isHighlight ? '#FFF' : itemColor,
                       scale: isHighlight && hovered ? 1.1 : 1
                     }}
                     transition={{
                       opacity: isGlitchy ? { duration: glitchDuration, repeat: Infinity } : { duration: 0.3 },
                       x: hovered && isGlitchy ? { duration: 0.15, repeat: Infinity, repeatType: "reverse" } : { duration: 0.3 }
                     }}
                     style={{ textShadow: `0 0 10px ${itemColor}` }}
                   >
                     {line.substring(0, 16)}
                   </motion.div>
                 );
              })}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Base / Foot of the '1' — completes the serif letterform */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] md:h-[4px] rounded-full z-20"
        style={{
          width: '140%',
          background: `linear-gradient(90deg, transparent 0%, ${itemColor}60 25%, ${itemColor} 50%, ${itemColor}60 75%, transparent 100%)`,
          boxShadow: hovered ? `0 0 25px ${itemColor}50, 0 2px 15px ${itemColor}30` : `0 0 10px ${itemColor}20`,
          transition: 'box-shadow 0.3s ease',
        }}
        animate={{ opacity: hovered ? 0.9 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
