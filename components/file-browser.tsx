"use client";

import React, { useEffect, useState } from "react";
import { Loader2, RefreshCw, HardDrive, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export type RemoteFile = {
  name: string;
  path: string;
  size: number;
  mtime: number;
  directory: string;
};

interface FileBrowserProps {
  onSelected: (url: string, file: RemoteFile) => void;
}

export default function FileBrowser({ onSelected }: FileBrowserProps) {
  const [files, setFiles] = useState<RemoteFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectingPath, setSelectingPath] = useState<string | null>(null);

  async function loadFiles() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/list-files");
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || "Failed to load files");
      }
      setFiles(data.files || []);
      if (!data.files?.length) {
        setError("No files found in /mnt/data or Downloads.");
      }
    } catch (err: any) {
      console.error("loadFiles error", err);
      setError(err.message || "Failed to load files");
      toast.error("Could not load files");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function handleSelect(file: RemoteFile) {
    setSelectingPath(file.path);
    try {
      const res = await fetch("/api/select-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ srcPath: file.path }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || "Failed to select file");
      }
      toast.success("File selected and ready");
      onSelected(data.url, file);
    } catch (err: any) {
      console.error("select-file error", err);
      toast.error(err.message || "Failed to select file");
    } finally {
      setSelectingPath(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Choose a file to upload
          </h2>
          <p className="text-xs text-gray-500">
            Browsing /mnt/data (chat uploads) and your Downloads folder.
          </p>
          <div className="mt-1 inline-flex items-center gap-2 text-[11px] text-gray-500">
            <span>Supported formats:</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 font-medium text-[11px] text-gray-700">
              .xer · .xml · .pdf
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={loadFiles}
          className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="h-3 w-3" />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-6 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading files…
        </div>
      )}

      {!loading && error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && files.length === 0 && (
        <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-500">
          <HardDrive className="h-4 w-4" />
          <span>No files found. Upload a file via chat or place one in Downloads.</span>
        </div>
      )}

      {!loading && files.length > 0 && (
        <div className="max-h-72 overflow-auto rounded-md border border-gray-200">
          <ul className="divide-y divide-gray-100 text-sm">
            {files.map((file) => (
              <li key={file.path}>
                <button
                  type="button"
                  onClick={() => handleSelect(file)}
                  disabled={!!selectingPath}
                  className="flex w-full items-center justify-between px-3 py-2 hover:bg-gray-50 text-left"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 flex items-center gap-1">
                      {file.name}
                      {selectingPath === file.path && (
                        <Loader2 className="h-3 w-3 animate-spin text-gray-500" />
                      )}
                    </span>
                    <span className="text-xs text-gray-500">
                      {file.directory} • {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  {selectingPath === file.path && (
                    <span className="text-xs text-gray-500">Selecting…</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && selectingPath === null && files.length > 0 && (
        <p className="flex items-center gap-1 text-[11px] text-gray-500">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          Click a file above to use it as your upload.
        </p>
      )}
    </div>
  );
}
