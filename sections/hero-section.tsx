"use client";

import { useCallback } from "react";
import { MotionSection } from "@/components/motion-section";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function HeroSection() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const parallaxX = useSpring(x, { stiffness: 120, damping: 20 });
  const parallaxY = useSpring(y, { stiffness: 120, damping: 20 });
  const rotate = useTransform(x, [-24, 24], [-3, 3]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - (bounds.left + bounds.width / 2);
      const offsetY = event.clientY - (bounds.top + bounds.height / 2);
      const dampenedX = (offsetX / bounds.width) * 32;
      const dampenedY = (offsetY / bounds.height) * 24;
      x.set(dampenedX);
      y.set(dampenedY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <MotionSection className="mx-auto max-w-6xl px-4 md:px-8">
      <div
        className="overflow-hidden rounded-[32px] border border-zinc-200/70 bg-white/80 px-6 py-12 shadow-[0_14px_32px_-24px_rgba(15,23,42,0.24)] backdrop-blur-md md:px-12 md:py-16"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-labelledby="hero-heading"
      >
        <div className="grid gap-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.05fr)] md:items-center">
          <motion.div
            className="space-y-9"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.55,
                  ease: [0.25, 0.1, 0.25, 1],
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            <motion.div
              className="space-y-5"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                Modern Vastu, guided by AI
              </p>
              <h1
                id="hero-heading"
                className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-[44px] md:leading-[1.1]"
              >
                Decode. Align.{" "}
                <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
                  Flourish.
                </span>
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-600 md:text-[15px]">
                At AlignAura, we decode the hidden energetic flow in your spaces, aligning
                it with your intentions using AI, ancient wisdom, and practical design.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-8"
              variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Button className="h-11 rounded-[8px] bg-zinc-900 px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-50 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.85)] hover:bg-zinc-800">
                  Book your consultation
                </Button>
              </motion.div>

              <div className="flex gap-9 text-[11px] text-zinc-500 md:text-xs">
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-zinc-900">
                    07
                  </div>
                  <p className="mt-1 max-w-[9rem] leading-snug">
                    Years of combined Vastu & design experience
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-semibold tracking-tight text-zinc-900">
                    162
                  </div>
                  <p className="mt-1 max-w-[9rem] leading-snug">
                    Homes and workspaces aligned across the globe
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[28px] bg-gradient-to-br from-zinc-50 via-slate-50 to-zinc-100 p-5 shadow-[0_12px_28px_-22px_rgba(15,23,42,0.32)] md:max-w-lg"
            style={{ x: parallaxX, y: parallaxY, rotate }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(148,163,184,0.3),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.28),transparent_55%)]" />

            <div className="relative flex h-full flex-col items-center justify-center gap-5">
              <div className="relative h-[62%] w-full overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-900/90">
                <Image
                  src="/window.svg"
                  alt="AlignAura interface preview"
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, 70vw"
                  className="object-contain opacity-90"
                />
              </div>
              <motion.button
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-[0_20px_40px_-26px_rgba(15,23,42,0.85)] ring-1 ring-white/80 backdrop-blur-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 22px 60px -32px rgba(15,23,42,0.9)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                aria-label="Play overview video"
              >
                <span className="ml-0.5 border-l-[9px] border-y-[6px] border-l-zinc-900 border-y-transparent" />
              </motion.button>
              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-500">
                Watch how AlignAura works
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}


