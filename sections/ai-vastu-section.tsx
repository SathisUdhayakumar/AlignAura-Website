"use client";

import { MotionSection } from "@/components/motion-section";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AiVastuSection() {
  return (
    <MotionSection
      id="about"
      className="relative mx-auto max-w-6xl px-4 md:px-6"
    >
      <div className="absolute inset-x-4 -top-6 bottom-0 -z-10 rounded-3xl bg-sky-50/60 blur-0 md:inset-x-8" />

      <div className="grid gap-10 rounded-3xl bg-white/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-md md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:p-10">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-500">
            About AlignAura
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
            Modern AI-enabled Vastu consultancy
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
            Upload your floor plans and receive precise, actionable guidance
            that blends traditional Vastu principles with real-time spatial
            analytics. From sunlight mapping to energy flow, every
            recommendation is tailored to your life and work goals.
          </p>
          <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
            Our engine reads your layout like an expert &mdash; identifying
            imbalances, suggesting corrections, and proposing layout
            enhancements you can actually implement.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="mt-2 rounded-[8px] border-sky-100 bg-sky-50/40 px-5 text-xs font-semibold text-sky-700 hover:bg-sky-100"
            >
              Explore how AI reads your space
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative h-64 rounded-2xl bg-gradient-to-br from-sky-100 via-indigo-50 to-slate-100 p-4 shadow-inner md:h-full"
          whileHover={{ scale: 1.01 }}
        >
          <div className="absolute inset-4 rounded-2xl border border-dashed border-slate-200/80 bg-white/70 shadow-[0_22px_60px_rgba(15,23,42,0.12)]" />
          <div className="absolute inset-[18%] rounded-2xl bg-slate-900/95 shadow-[0_30px_80px_rgba(15,23,42,0.9)]">
            <div className="flex h-full flex-col justify-between p-6 text-xs text-slate-200">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live analysis
                </span>
                <span>North-East zone · 92% aligned</span>
              </div>
              <div className="space-y-2 text-[11px] leading-relaxed text-slate-300">
                <p>
                  &quot;Workspace placement improved focus scores by 37% after
                  correcting entrance energy.&quot;
                </p>
                <p className="text-[10px] text-slate-400">
                  Powered by AlignAura Spatial Engine
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}


