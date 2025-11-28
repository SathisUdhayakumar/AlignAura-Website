"use client";

import { MotionSection } from "@/components/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export function MissionVisionSection() {
  return (
    <MotionSection
      id="mission"
      className="bg-slate-950 py-16 text-slate-100 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="space-y-4 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-400">
            Our approach at AlignAura
          </p>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Crafting spaces that resonate with purpose and harmony
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-400 md:mx-0">
            We believe that every home and workspace holds a story. Our role is
            to decode its energetic patterns and realign them so you feel
            lighter, clearer, and deeply supported by the spaces you inhabit.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <motion.div
            whileHover={{
              y: -4,
              boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <Card className="h-full rounded-2xl border-slate-800 bg-slate-900/80 px-5 py-6 text-left shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
              <CardHeader className="px-0 pb-4">
                <CardTitle className="text-sm font-semibold tracking-wide text-slate-50">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="text-sm leading-relaxed text-slate-300">
                  To make ancient spatial wisdom approachable, measurable, and
                  implementable for modern lives. We translate Vastu principles
                  into clear, context-aware recommendations instead of rigid
                  rules, enabling you to make confident decisions about your
                  space.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileHover={{
              y: -4,
              boxShadow: "0 24px 60px rgba(15,23,42,0.9)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <Card className="h-full rounded-2xl border-slate-800 bg-slate-900/80 px-5 py-6 text-left shadow-[0_18px_60px_rgba(15,23,42,0.9)]">
              <CardHeader className="px-0 pb-4">
                <CardTitle className="text-sm font-semibold tracking-wide text-slate-50">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="text-sm leading-relaxed text-slate-300">
                  A world where homes and workplaces are designed not only to
                  look beautiful, but to feel deeply attuned to the people
                  within them. AlignAura aims to become the quiet companion
                  behind every meaningful space, guiding design decisions from
                  blueprint to daily rituals.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}


