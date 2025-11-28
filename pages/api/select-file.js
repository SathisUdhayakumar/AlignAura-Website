import fs from "fs";
import path from "path";

const ALLOWED_EXTENSIONS = new Set([".xer", ".xml", ".pdf"]);

function ensureUploadsDir() {
  const dir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function makeUniqueName(dir, baseName) {
  let name = baseName;
  let counter = 1;
  const ext = path.extname(baseName);
  const base = path.basename(baseName, ext);
  while (fs.existsSync(path.join(dir, name))) {
    name = `${base}-${counter}${ext}`;
    counter += 1;
  }
  return name;
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const { srcPath } = req.body || {};
    if (!srcPath || typeof srcPath !== "string") {
      return res
        .status(400)
        .json({ ok: false, message: "srcPath is required" });
    }

    const ext = path.extname(srcPath).toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return res.status(400).json({
        ok: false,
        message: "Invalid file type. Allowed: .xer, .xml, .pdf",
      });
    }

    if (!fs.existsSync(srcPath)) {
      return res
        .status(404)
        .json({ ok: false, message: "Source file not found" });
    }

    const uploadsDir = ensureUploadsDir();
    const baseName = path.basename(srcPath);
    const finalName = makeUniqueName(uploadsDir, baseName);
    const destPath = path.join(uploadsDir, finalName);

    fs.copyFileSync(srcPath, destPath);

    const url = `/uploads/${finalName}`;
    return res.status(200).json({ ok: true, url });
  } catch (err) {
    console.error("select-file error:", err);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to select file", error: String(err) });
  }
}
