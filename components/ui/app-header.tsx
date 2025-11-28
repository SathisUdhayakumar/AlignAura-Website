"use client";

import React, { useState } from "react";
import { HelpCircle, Bell, ChevronDown, ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  isDropdown?: boolean;
};

type AppHeaderProps = {
  breadcrumbs?: BreadcrumbItem[];
};

export default function AppHeader({ breadcrumbs }: AppHeaderProps) {
  const [language, setLanguage] = useState<"en" | "kn" | "ta">("en");
  const [showLanguageSheet, setShowLanguageSheet] = useState(false);

  const languageLabel: Record<typeof language, string> = {
    en: "English",
    kn: "Kannada",
    ta: "Tamil",
  };

  const languageFlag: Record<typeof language, string> = {
    en: "🇺🇸",
    kn: "🇮🇳",
    ta: "🇮🇳",
  };

  function handleSelectLanguage(next: "en" | "kn" | "ta") {
    setLanguage(next);
    setShowLanguageSheet(false);
  }

  return (
    <header className="h-16 bg-[#1e2642] flex items-center justify-between px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-white/70">
        {breadcrumbs?.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-white/40" />}
            <button
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                item.isDropdown
                  ? "hover:bg-[#2a3a5c] text-white"
                  : "hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
              {item.isDropdown && <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      {/* Right side */}
      <div className="relative flex items-center gap-4">
        {/* Language Selector */}
        <button
          type="button"
          onClick={() => setShowLanguageSheet((open) => !open)}
          className="flex items-center gap-2 px-2 py-1 text-white text-sm transition-colors hover:text-white"
        >
          <span className="text-base">{languageFlag[language]}</span>
          <span>{languageLabel[language]}</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showLanguageSheet && (
          <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-gray-200 bg-white shadow-lg py-2 text-sm">
            <div className="px-4 pb-2 text-[11px] font-medium uppercase tracking-wide text-gray-400">
              Choose language
            </div>
            <button
              type="button"
              onClick={() => handleSelectLanguage("en")}
              className={`flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-50 ${
                language === "en" ? "font-semibold text-gray-900" : "text-gray-700"
              }`}
            >
              <span className="text-base">🇺🇸</span>
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectLanguage("kn")}
              className={`flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-50 ${
                language === "kn" ? "font-semibold text-gray-900" : "text-gray-700"
              }`}
            >
              <span className="text-base">🇮🇳</span>
              <span>ಕನ್ನಡ (Kannada)</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectLanguage("ta")}
              className={`flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-50 ${
                language === "ta" ? "font-semibold text-gray-900" : "text-gray-700"
              }`}
            >
              <span className="text-base">🇮🇳</span>
              <span>தமிழ் (Tamil)</span>
            </button>
          </div>
        )}

        {/* Help */}
        <button className="p-2 text-white/70 hover:text-white transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="p-2 text-white/70 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20" />

        {/* User Avatar */}
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1e2642] font-semibold text-sm border-2 border-white/20">
          S
        </div>
      </div>
    </header>
  );
}

