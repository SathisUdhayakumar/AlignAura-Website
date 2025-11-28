"use client";

import { MotionSection } from "@/components/motion-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function CommunitySection() {
  return (
    <MotionSection id="community" className="mx-auto max-w-6xl px-4 md:px-6">
      <Card className="overflow-hidden rounded-3xl border-slate-100 bg-slate-900 text-slate-50 shadow-[0_16px_46px_-24px_rgba(15,23,42,0.75)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(56,189,248,0.24),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.2),transparent_55%)]" />
        <CardHeader className="relative px-6 pb-3 pt-7 md:px-8 md:pt-8">
          <CardTitle className="text-base font-semibold tracking-tight md:text-lg">
            Join our community
          </CardTitle>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-200">
            Receive quiet monthly notes on designing spaces that feel calmer,
            clearer, and more intentionally yours.
          </p>
        </CardHeader>
        <CardContent className="relative px-6 pb-7 md:px-8">
          <form className="mt-3 flex flex-col gap-3 rounded-2xl bg-slate-950/40 p-3.5 backdrop-blur-md md:flex-row md:items-center">
            <Input
              type="email"
              required
              placeholder="Enter your email"
              className="h-10 flex-1 border-slate-700 bg-slate-900/60 text-sm text-slate-50 placeholder:text-slate-500"
            />
            <motion.div
              className="md:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                type="submit"
                className="h-10 w-full rounded-[8px] bg-sky-500 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 hover:bg-sky-400 md:w-auto"
              >
                Subscribe
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </MotionSection>
  );
}
