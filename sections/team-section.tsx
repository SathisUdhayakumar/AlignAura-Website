"use client";

import { MotionSection } from "@/components/motion-section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

const team = [
  {
    name: "Sourav Sen",
    role: "Founder · Spatial Strategist",
    bio: "Brings together 10+ years of product thinking with a lifelong study of Vastu and energy-led design.",
  },
  {
    name: "Ananya Rao",
    role: "Design Lead · Architect",
    bio: "Architect and researcher focused on creating emotionally intelligent spaces for founders and families.",
  },
  {
    name: "Arjun Mehta",
    role: "Machine Learning Lead",
    bio: "Builds our spatial analysis engine, translating complex signals into gentle, human-first insights.",
  },
];

export function TeamSection() {
  return (
    <MotionSection className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="space-y-6 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-500">
          Team
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          The people behind AlignAura
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 md:mx-0">
          A compact, hands-on team that partners closely with you on every
          engagement &mdash; from first call to final rearrangement.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <motion.div
            key={member.name}
            whileHover={{
              y: -6,
              boxShadow: "0 24px 60px rgba(15,23,42,0.16)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <Card className="h-full rounded-2xl border-slate-100 bg-white/90 px-5 py-6 text-left shadow-sm">
              <CardHeader className="px-0 pb-4">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-slate-50">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <CardTitle className="text-sm font-semibold text-slate-900">
                  {member.name}
                </CardTitle>
                <p className="text-xs font-medium text-slate-500">
                  {member.role}
                </p>
              </CardHeader>
              <CardContent className="px-0">
                <p className="text-sm leading-relaxed text-slate-600">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}


