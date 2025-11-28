"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#mission" },
  { label: "Pricing", href: "#pricing" },
  { label: "Community", href: "#community" },
];

export function Navbar() {
  return (
    <motion.header
      className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-[15px] font-semibold tracking-tight text-zinc-50 shadow-[0_10px_25px_-18px_rgba(15,23,42,0.9)]">
            A
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[13px] font-medium tracking-tight text-zinc-900">
              AlignAura
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">
              AI Vastu Studio
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-[11px] font-medium text-zinc-500 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-zinc-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="hidden text-[11px] font-medium text-zinc-600 hover:text-zinc-900 md:inline-flex"
          >
            Log in
          </Button>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Button
              size="sm"
              className="h-9 rounded-[8px] bg-zinc-900 px-5 text-[11px] font-semibold tracking-[0.16em] text-zinc-50 shadow-[0_18px_40px_-26px_rgba(15,23,42,0.9)] hover:bg-zinc-800"
            >
              Start free consultation
            </Button>
          </motion.div>
        </div>
      </Container>
    </motion.header>
  );
}


