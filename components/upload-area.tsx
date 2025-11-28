"use client";

import React from "react";
import BrowseButton from "@/components/browse-button";
import SampleButton from "@/components/sample-button";

interface UploadAreaProps {
  kind?: "spec" | "drawings";
  selectedUrl?: string | null;
  onSelected?: (url: string) => void;
}

export default function UploadArea({
  kind,
  selectedUrl,
  onSelected,
}: UploadAreaProps) {
  const hasFile = !!selectedUrl;
  const baseLabel = kind === "drawings" ? "Browse drawings" : "Browse file";
  const browseLabel = hasFile ? "Replace" : baseLabel;
  const showSample = !hasFile;

  return (
    <div
      className={`flex items-center justify-end gap-2 transition-opacity ${
        hasFile ? "" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      <BrowseButton
        label={browseLabel}
        onSelected={(url) => {
          onSelected?.(url);
        }}
      />
      {showSample && <SampleButton label="Sample document" />}
      {hasFile && selectedUrl && (
        <div className="ml-2 flex items-center gap-2 text-[11px] text-gray-600">
          <span>Document uploaded.</span>
          <a
            href={selectedUrl}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-600 underline underline-offset-2"
          >
            View
          </a>
        </div>
      )}
    </div>
  );
}
