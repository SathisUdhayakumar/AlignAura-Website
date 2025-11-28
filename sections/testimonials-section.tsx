"use client";

import { useEffect, useState } from "react";
import { MotionSection } from "@/components/motion-section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sourav Sen",
    role: "Founder, Product Studio",
    quote:
      "AlignAura helped me reconfigure my home office and studio into a space that feels deeply intentional. Clients often mention that it 'feels right' the moment they walk in.",
  },
  {
    name: "Priya Menon",
    role: "Design Lead, Digital Agency",
    quote:
      "The AI analysis made Vastu finally make sense. We could see why certain corners felt heavy and how moving just a few things unlocked a new sense of clarity in the team.",
  },
  {
    name: "Rahul Verma",
    role: "CXO, SaaS Company",
    quote:
      "Within weeks of implementing AlignAura's recommendations, my cabin and meeting rooms started to feel more grounded, and difficult conversations became unexpectedly easier.",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
    scale: 0.98,
  }),
};

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function goTo(next: number) {
    const total = testimonials.length;
    const normalised = (next + total) % total;
    setDirection(next > index ? 1 : -1);
    setIndex(normalised);
  }

  useEffect(() => {
    const id = setInterval(() => {
      goTo(index + 1);
    }, 7000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const current = testimonials[index];

  return (
    <MotionSection className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="space-y-6 text-center md:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-500">
          Our testimonials
        </p>
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
          Stories from spaces we&apos;ve helped realign
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 md:mx-0">
          Every engagement begins with listening &mdash; to you, your routines,
          and how your current environment feels.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] md:items-center">
        <div className="relative">
          <Card className="overflow-hidden rounded-3xl border-slate-100 bg-slate-900 text-slate-50 shadow-[0_18px_46px_-26px_rgba(15,23,42,0.6)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.18),transparent_55%)]" />
            <div className="relative flex flex-col gap-6 p-7 md:p-9">
              <Quote className="h-6 w-6 text-sky-400" />
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current.name}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="space-y-5"
                >
                  <p className="text-sm leading-relaxed text-slate-100 md:text-base">
                    {current.quote}
                  </p>
                  <div className="space-y-0.5 text-left">
                    <p className="text-sm font-semibold text-slate-50">
                      {current.name}
                    </p>
                    <p className="text-xs text-slate-300">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index
                          ? "w-7 bg-sky-400"
                          : "w-3 bg-slate-600 hover:bg-slate-500"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full border-slate-700 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                    onClick={() => goTo(index - 1)}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="rounded-full border-slate-700 bg-slate-900/80 text-slate-100 hover:border-slate-500 hover:bg-slate-800"
                    onClick={() => goTo(index + 1)}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 rounded-3xl border border-dashed border-slate-200/80 bg-slate-50/80 p-6 text-left shadow-sm">
          <h3 className="text-sm font-semibold tracking-tight text-slate-900">
            The people behind the platform
          </h3>
          <p className="text-sm leading-relaxed text-slate-600">
            AlignAura was created by architects, product thinkers, and Vastu
            practitioners who observed a gap between deeply spiritual guidance
            and the realities of modern layouts. We built a system that respects
            both.
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            Think of us as your calm, data-backed guide whenever you&apos;re
            planning a move, a renovation, or an energetic reset.
          </p>
        </div>
      </div>
    </MotionSection>
  );
}


