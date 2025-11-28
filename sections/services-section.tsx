"use client";

import { MotionSection } from "@/components/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    title: "Residential Vastu",
    description:
      "Re-align your home for wellbeing, clarity, and effortless flow with room-by-room guidance.",
  },
  {
    title: "Workspaces & Studios",
    description:
      "Design offices, studios, and co-working spaces that boost focus, collaboration, and output.",
  },
  {
    title: "New Construction",
    description:
      "Validate plans before you build with directionally aligned layouts and sunlight mapping.",
  },
  {
    title: "Commercial Vastu",
    description:
      "Shape retail, hospitality, and clinics to feel intuitively inviting and energetically balanced.",
  },
  {
    title: "Remedies Without Demolition",
    description:
      "Discover practical, non-invasive corrections using lighting, furniture, and intent.",
  },
  {
    title: "Founder & CXO Alignment",
    description:
      "Align your cabin, boardrooms, and decision spaces with your long-term vision.",
  },
];

export function ServicesSection() {
  return (
    <MotionSection
      id="services"
      className="mx-auto max-w-6xl px-4 md:px-6"
    >
      <div className="space-y-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-500">
          What we offer
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Services across every kind of space
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600">
          From compact city apartments to expansive campuses, AlignAura adapts
          Vastu principles to the realities of modern architecture.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <motion.div
            key={service.title}
            whileHover={{
              y: -3,
              boxShadow: "0 10px 24px -18px rgba(15,23,42,0.12)",
            }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <Card className="h-full rounded-2xl border-slate-100 bg-white px-5 py-6 text-left shadow-sm transition-colors hover:border-sky-100">
              <CardHeader className="px-0 pb-4">
                <CardTitle className="text-[15px] font-semibold text-slate-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <p className="text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}


