"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";

type SampleButtonProps = {
  label?: string;
};

export default function SampleButton({
  label = "Sample document",
}: SampleButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      // Fire-and-forget API call; UI always shows success state
      await fetch("/api/download-sample", { method: "POST" }).catch(() => {});
      toast.success("Sample document downloaded successfully");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="inline-flex items-center gap-1 rounded-full border px-5 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 active:bg-[#FFD503] active:border-[#FFD503] active:text-gray-900 disabled:opacity-60 whitespace-nowrap"
        aria-label="Download sample document"
      >
        {loading ? (
          "Downloading…"
        ) : (
          <>
            <Download className="h-3 w-3" />
            <span>{label}</span>
          </>
        )}
      </button>

      {isHovering && !loading && (
        <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[11px] text-white shadow">
          Click to download sample document
        </div>
      )}
    </div>
  );
}


