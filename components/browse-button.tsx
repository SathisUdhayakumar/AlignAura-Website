"use client";

import React, { useState } from "react";
import { FolderOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileBrowser, { RemoteFile } from "@/components/file-browser";

interface BrowseButtonProps {
  label?: string;
  onSelected?: (url: string, file: RemoteFile) => void;
}

export default function BrowseButton({
  label = "Browse",
  onSelected,
}: BrowseButtonProps) {
  const [open, setOpen] = useState(false);

  function handleSelected(url: string, file: RemoteFile) {
    setOpen(false);
    onSelected?.(url, file);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full border px-5 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 active:bg-[#FFD503] active:border-[#FFD503] active:text-gray-900 whitespace-nowrap"
        >
          <FolderOpen className="h-3 w-3" />
          <span>{label}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Select a file</DialogTitle>
          <DialogDescription>
            Choose a file from available locations to use for this upload.
          </DialogDescription>
        </DialogHeader>
        <FileBrowser onSelected={handleSelected} />
      </DialogContent>
    </Dialog>
  );
}
