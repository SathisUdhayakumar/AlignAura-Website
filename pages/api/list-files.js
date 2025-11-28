import fs from "fs";
import path from "path";
import os from "os";

function safeListFiles(dir, label) {
  const files = [];
  try {
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const fullPath = path.join(dir, entry.name);
      try {
        const stat = fs.statSync(fullPath);
        files.push({
          name: entry.name,
          path: fullPath,
          size: stat.size,
          mtime: stat.mtimeMs,
          directory: label,
        });
      } catch {
        // ignore individual file errors
      }
    }
  } catch {
    // ignore directory errors
  }
  return files;
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const files = [];

    // Cursor uploads
    files.push(...safeListFiles("/mnt/data", "Uploads"));

    // Local Downloads fallback
    const downloadsDir = path.join(os.homedir(), "Downloads");
    files.push(...safeListFiles(downloadsDir, "Downloads"));

    return res.status(200).json({ ok: true, files });
  } catch (err) {
    console.error("list-files error:", err);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to list files", error: String(err) });
  }
}
