import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CHARACTER_PIXEL_GRID,
  ORBIT_IDEAS,
  PIXEL_GRID_HEIGHT,
  PIXEL_GRID_WIDTH,
  computeCursorParallax,
  computeOrbitPosition,
  nextCycleIndex,
  parsePixelGrid,
  type OrbitIdea,
} from '../utils/pixelArt';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface OrbitingIdeaNodeProps {
  idea: OrbitIdea;
  index: number;
  total: number;
  rx: number;
  ry: number;
  baseAngle: MotionValue<number>;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  isActive: boolean;
  onHoverStart: (idea: OrbitIdea) => void;
  onHoverEnd: () => void;
  onSelect: (idea: OrbitIdea) => void;
}

function OrbitingIdeaNode({
  idea,
  index,
  total,
  rx,
  ry,
  baseAngle,
  parallaxX,
  parallaxY,
  isActive,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: OrbitingIdeaNodeProps) {
  const offsetRad = (index / total) * Math.PI * 2;

  const x = useTransform([baseAngle, parallaxX], ([theta, px]: number[]) => {
    const orbit = computeOrbitPosition(theta + offsetRad, rx, ry);
    const shift = px * (orbit.zIndex > 10 ? 0.65 : 0.25);
    return orbit.x + shift;
  });

  const y = useTransform([baseAngle, parallaxY], ([theta, py]: number[]) => {
    const orbit = computeOrbitPosition(theta + offsetRad, rx, ry);
    const shift = py * (orbit.zIndex > 10 ? 0.45 : 0.2);
    return orbit.y + shift;
  });

  const scale = useTransform(baseAngle, (theta) =>
    isActive ? 1.04 : computeOrbitPosition(theta + offsetRad, rx, ry).scale
  );
  const opacity = useTransform(baseAngle, (theta) => {
    const orbit = computeOrbitPosition(theta + offsetRad, rx, ry);
    if (orbit.zIndex === 1) return orbit.opacity;
    return isActive ? 1 : orbit.opacity;
  });
  const zIndex = useTransform(baseAngle, (theta) =>
    computeOrbitPosition(theta + offsetRad, rx, ry).zIndex
  );

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className="pointer-events-auto absolute left-1/2 top-[17%] -translate-x-1/2 -translate-y-1/2"
    >
      <button
        type="button"
        onMouseEnter={() => onHoverStart(idea)}
        onMouseLeave={onHoverEnd}
        onFocus={() => onHoverStart(idea)}
        onBlur={onHoverEnd}
        onClick={() => onSelect(idea)}
        aria-pressed={isActive}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap border bg-white/95 px-2 py-1 font-mono text-[10.5px] leading-none tracking-[0.02em] transition-colors duration-150 ${
          isActive
            ? 'border-[#141414] text-[#141414]'
            : 'border-[#D4D4D4] text-[#242424] hover:border-[#141414] hover:text-[#141414]'
        }`}
      >
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 shrink-0"
          style={{ backgroundColor: idea.accent }}
        />
        <span>{idea.label}</span>
      </button>
    </motion.div>
  );
}

/**
 * Custom interactive pixel-art character illustration inspired by
 * Adham Dannaway's split painterly/ink portrait style.
 * Responds to cursor movement (eye tracking + 3D parallax), actively
 * types on a laptop, and displays a revolving halo of ideas around his head.
 */
export function PixelBuilderCharacter() {
  const stageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const cells = useMemo(() => parsePixelGrid(CHARACTER_PIXEL_GRID), []);

  const [hoveredIdea, setHoveredIdea] = useState<OrbitIdea | null>(null);
  const [pinnedIdea, setPinnedIdea] = useState<OrbitIdea | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [isStageHovered, setIsStageHovered] = useState(false);
  const [stageWidth, setStageWidth] = useState(440);

  const activeIdea = hoveredIdea ?? pinnedIdea ?? ORBIT_IDEAS[autoIndex];

  useEffect(() => {
    if (hoveredIdea || pinnedIdea) return;
    const timer = window.setInterval(() => {
      setAutoIndex((prev) => nextCycleIndex(prev, ORBIT_IDEAS.length));
    }, 3000);
    return () => window.clearInterval(timer);
  }, [hoveredIdea, pinnedIdea]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const updateWidth = () => {
      const next = node.getBoundingClientRect().width;
      if (next > 0) setStageWidth(next);
    };
    updateWidth();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const orbitRx =
    stageWidth < 400
      ? Math.max(86, Math.round((stageWidth - 130) / 2))
      : 176;
  const orbitRy = stageWidth < 400 ? 44 : 54;

  // Cursor-driven MotionValues (no 60Hz React setState)
  const rawEyeX = useMotionValue(0);
  const rawEyeY = useMotionValue(0);
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const rawParallaxX = useMotionValue(0);
  const rawParallaxY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.6 };
  const eyeX = useSpring(rawEyeX, springConfig);
  const eyeY = useSpring(rawEyeY, springConfig);
  const tiltX = useSpring(rawTiltX, springConfig);
  const tiltY = useSpring(rawTiltY, springConfig);
  const parallaxX = useSpring(rawParallaxX, springConfig);
  const parallaxY = useSpring(rawParallaxY, springConfig);

  // Continuous smooth orbital phase (pauses on idea hover or reduced motion)
  const baseAngle = useMotionValue(-Math.PI / 2);
  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || hoveredIdea) return;
    const radiansPerMs = (Math.PI * 2) / 18000;
    baseAngle.set(baseAngle.get() + delta * radiansPerMs);
  });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleWindowPointerMove = (event: PointerEvent) => {
      const node = stageRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const p = computeCursorParallax(event.clientX, event.clientY, rect);
      rawEyeX.set(p.eyeX);
      rawEyeY.set(p.eyeY);
      rawTiltX.set(p.tiltX);
      rawTiltY.set(p.tiltY);
      rawParallaxX.set(p.nx * 10);
      rawParallaxY.set(p.ny * 7);
    };

    const handlePointerLeave = () => {
      rawEyeX.set(0);
      rawEyeY.set(0);
      rawTiltX.set(0);
      rawTiltY.set(0);
      rawParallaxX.set(0);
      rawParallaxY.set(0);
    };

    window.addEventListener('pointermove', handleWindowPointerMove, {
      passive: true,
    });
    document.addEventListener('mouseleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [
    shouldReduceMotion,
    rawEyeX,
    rawEyeY,
    rawTiltX,
    rawTiltY,
    rawParallaxX,
    rawParallaxY,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: EDITORIAL_EASE }}
      className="flex w-full max-w-[440px] flex-col items-center select-none"
    >
      {/* Interactive Stage with 3D perspective + revolving idea ring */}
      <div
        ref={stageRef}
        onMouseEnter={() => setIsStageHovered(true)}
        onMouseLeave={() => setIsStageHovered(false)}
        style={{ perspective: 900 }}
        className="relative flex w-full items-center justify-center pt-12 pb-2"
      >
        {/* Revolving list of ideas orbiting his head */}
        <div
          aria-label="Ideas revolving around his head"
          className="pointer-events-none absolute inset-0"
        >
          {ORBIT_IDEAS.map((idea, index) => (
            <OrbitingIdeaNode
              key={idea.id}
              idea={idea}
              index={index}
              total={ORBIT_IDEAS.length}
              rx={orbitRx}
              ry={orbitRy}
              baseAngle={baseAngle}
              parallaxX={parallaxX}
              parallaxY={parallaxY}
              isActive={activeIdea.id === idea.id}
              onHoverStart={setHoveredIdea}
              onHoverEnd={() => setHoveredIdea(null)}
              onSelect={(selected) =>
                setPinnedIdea((prev) =>
                  prev?.id === selected.id ? null : selected
                )
              }
            />
          ))}
        </div>

        {/* Character SVG Layer (z-10 sits cleanly between front/back orbital arcs) */}
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : tiltX,
            rotateY: shouldReduceMotion ? 0 : tiltY,
            transformStyle: 'preserve-3d',
          }}
          className="relative z-10 w-[84%] max-w-[360px]"
        >
          <svg
            viewBox={`0 0 ${PIXEL_GRID_WIDTH} ${PIXEL_GRID_HEIGHT}`}
            shapeRendering="crispEdges"
            role="img"
            aria-label="Interactive pixel art character working on a laptop and thinking about textile and finance ideas that revolve around his head."
            className="h-auto w-full overflow-visible"
          >
            {/* Base 44x40 pixel-art character, laptop, lightbulb & desk */}
            <g>
              {cells.map((cell) => (
                <rect
                  key={cell.key}
                  x={cell.x}
                  y={cell.y}
                  width={1}
                  height={1}
                  fill={cell.color}
                />
              ))}
            </g>

            {/* Cursor-responsive eye pupils inside glasses lenses */}
            <motion.rect
              x={16.4}
              y={14.4}
              width={1.25}
              height={1.25}
              fill="#4D8B94"
              style={{ x: eyeX, y: eyeY }}
            />
            <motion.rect
              x={25.0}
              y={14.4}
              width={1.25}
              height={1.25}
              fill="#141414"
              style={{ x: eyeX, y: eyeY }}
            />

            {/* Periodic eye blink overlays */}
            <motion.rect
              x={15}
              y={14}
              width={4}
              height={2}
              fill="#FAF8F4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 0, 0] }}
              transition={{
                duration: 4.4,
                repeat: Infinity,
                times: [0, 0.89, 0.93, 0.97, 1],
                ease: 'linear',
              }}
            />
            <motion.rect
              x={24}
              y={14}
              width={3}
              height={2}
              fill="#F2D2B6"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 0, 0] }}
              transition={{
                duration: 4.4,
                repeat: Infinity,
                times: [0, 0.89, 0.93, 0.97, 1],
                ease: 'linear',
              }}
            />

            {/* Idea lightbulb pulse above head */}
            <motion.g
              animate={{
                opacity: isStageHovered ? [0.85, 1, 0.85] : [0.55, 1, 0.55],
              }}
              transition={{
                duration: 1.9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <rect x={35} y={0} width={1} height={1} fill="#F4CE5C" />
              <rect x={32} y={1} width={1} height={1} fill="#E9B31B" />
              <rect x={39} y={1} width={1} height={1} fill="#E9B31B" />
            </motion.g>

            {/* Active laptop screen cursor & live chart activity */}
            <motion.rect
              x={24}
              y={32}
              width={1}
              height={1}
              fill="#141414"
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.rect
              x={18}
              y={30}
              width={1}
              height={2}
              fill="#4D8B94"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Rhythmic typing hands at the laptop keyboard */}
            <motion.g
              animate={{ y: [0, -0.35, 0] }}
              transition={{
                duration: 0.65,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            >
              <rect x={12} y={35} width={2} height={1} fill="#F2D2B6" />
              <rect x={28} y={35} width={2} height={1} fill="#F2D2B6" />
            </motion.g>

            {/* Animated rising chai steam pixels */}
            <motion.g
              animate={{
                y: [0, -1.6],
                opacity: [0.85, 0],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              <rect x={34} y={30} width={1} height={1} fill="#C8C4BC" />
              <rect x={36} y={29} width={1} height={1} fill="#E2DFD9" />
              <rect x={35} y={28} width={1} height={1} fill="#C8C4BC" />
            </motion.g>

            {/* Floating painterly Adham-style pixel flecks */}
            <motion.g
              animate={{ y: [0, -1, 0] }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <rect x={3} y={22} width={1} height={1} fill="#E9B31B" />
              <rect x={1} y={28} width={1} height={1} fill="#4D8B94" />
              <rect x={5} y={19} width={1} height={1} fill="#D96B52" />
            </motion.g>
          </svg>
        </motion.div>
      </div>

      {/* Quiet single-line thought readout synced with orbiting ideas */}
      <div className="mt-2 min-h-[24px] px-2 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIdea.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
            className="font-serif text-[14px] italic leading-[1.45] text-[#525252]"
          >
            <span className="not-italic font-sans text-[11px] uppercase tracking-[0.06em] text-[#606060]">
              {activeIdea.label}:{' '}
            </span>
            {activeIdea.detail}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
