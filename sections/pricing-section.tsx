"use client";

import { MotionSection } from "@/components/motion-section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const baseFeatures = [
  "Vastu-enabled space scan",
  "Room-by-room recommendations",
  "Email summary of key actions",
];

const suiteFeatures = [
  "All Free plan features",
  "2 x 60 min live sessions",
  "Founder cabin & workspace audit",
  "Team zone & meeting room mapping",
  "Priority support for 30 days",
];

export function PricingSection() {
  return (
    <MotionSection
      id="pricing"
      className="mx-auto max-w-6xl px-4 md:px-6"
    >
      <div className="space-y-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-500">
          Pricing
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          The only cloud platform that pays for itself
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600">
          One simple starting point, one deep-dive suite. Choose what matches
          where you and your space are today.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <motion.div
          whileHover={{
            y: -3,
            boxShadow: "0 12px 30px -20px rgba(15,23,42,0.12)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <Card className="h-full rounded-2xl border-slate-100 bg-white px-6 py-7 text-left shadow-sm">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Start
              </CardTitle>
              <p className="mt-1 text-xs text-slate-500">
                For first-time explorations and single-room recalibrations.
              </p>
            </CardHeader>
            <CardContent className="px-0">
              <div className="mb-5">
                <div className="text-2xl font-semibold text-slate-900">Free</div>
                <p className="mt-1 text-xs text-slate-500">
                  Try AlignAura with a single layout and discover how it feels.
                </p>
              </div>
              <ul className="mb-6 space-y-2 text-sm text-slate-600">
                {baseFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-sky-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button className="w-full rounded-[8px] bg-slate-900 text-xs font-semibold uppercase tracking-[0.16em] text-white hover:bg-slate-800">
                  Begin for free
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{
            y: -4,
            boxShadow: "0 16px 40px -24px rgba(15,23,42,0.4)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <Card className="h-full rounded-2xl border-sky-100 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 px-6 py-7 text-left text-slate-50 shadow-[0_14px_36px_-22px_rgba(15,23,42,0.75)]">
            <CardHeader className="px-0 pb-4">
              <CardTitle className="flex items-center justify-between text-sm font-semibold">
                Suite
                <span className="rounded-full bg-sky-500/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-sky-300">
                  Most aligned
                </span>
              </CardTitle>
              <p className="mt-1 text-xs text-slate-300">
                For founders and families ready for a deep, end-to-end reset.
              </p>
            </CardHeader>
            <CardContent className="px-0">
              <div className="mb-5">
                <div className="text-2xl font-semibold text-slate-50">
                  $999
                  <span className="ml-1 text-xs font-normal text-slate-400">
                    / engagement
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  Includes full blueprint review and post-implementation check-in.
                </p>
              </div>
              <ul className="mb-6 space-y-2 text-sm text-slate-100">
                {suiteFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button className="w-full rounded-[8px] bg-sky-500 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 hover:bg-sky-400">
                  Book the Suite
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MotionSection>
  );
}


