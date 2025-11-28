"use client";

import { MotionSection } from "@/components/motion-section";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/container";

export function FooterSection() {
  return (
    <MotionSection className="border-t border-zinc-200/70 bg-zinc-950 py-10 text-zinc-400">
      <Container className="grid gap-8 text-[12px] md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-start">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-100">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-[13px] font-semibold tracking-tight text-zinc-900">
              A
            </div>
            <span className="text-xs font-medium tracking-tight">
              AlignAura
            </span>
          </div>
          <p className="max-w-xs text-[12px] leading-relaxed text-zinc-400">
            Modern AI-enabled Vastu consultancy, crafted for founders, families,
            and teams designing spaces that quietly support their best work.
          </p>
          <p className="text-[11px] text-zinc-500">
            © {new Date().getFullYear()} AlignAura Studio. All rights reserved.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Explore
          </p>
          <div className="flex flex-col gap-1.5 text-[12px]">
            <a href="#about" className="hover:text-zinc-100 hover:underline">
              About
            </a>
            <a href="#services" className="hover:text-zinc-100 hover:underline">
              Services
            </a>
            <a href="#pricing" className="hover:text-zinc-100 hover:underline">
              Pricing
            </a>
            <a
              href="#community"
              className="hover:text-zinc-100 hover:underline"
            >
              Community
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Stay aligned
          </p>
          <form className="space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Work email"
                className="h-8 flex-1 rounded-[8px] border border-zinc-700 bg-zinc-900/60 px-3 text-[12px] text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-300 focus:ring-1 focus:ring-zinc-500"
              />
              <button
                type="submit"
                className="inline-flex h-8 items-center rounded-[8px] bg-zinc-100 px-3 text-[11px] font-semibold tracking-[0.16em] text-zinc-900 transition-colors hover:bg-zinc-200"
              >
                Join
              </button>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
              <a
                href="#"
                aria-label="AlignAura on GitHub"
                className="rounded-full border border-zinc-700 p-1.5 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-100"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="AlignAura on LinkedIn"
                className="rounded-full border border-zinc-700 p-1.5 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-100"
              >
                <Linkedin className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                aria-label="AlignAura on Instagram"
                className="rounded-full border border-zinc-700 p-1.5 text-zinc-400 transition-colors hover:border-zinc-400 hover:text-zinc-100"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
            </div>
          </form>
        </div>
      </Container>
    </MotionSection>
  );
}


