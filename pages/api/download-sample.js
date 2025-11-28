import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Source path (uploaded file in Cursor chat environment)
    const src = "/mnt/data/2.png";

    // Destination in the Next.js public folder so it is served at /project-screenshot.png
    const destDir = path.join(process.cwd(), "public");
    const dest = path.join(destDir, "project-screenshot.png");

    // ensure public exists
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    // copy file if source exists
    if (!fs.existsSync(src)) {
      return res.status(404).json({
        ok: false,
        message:
          "Sample image not found on server. Please copy it to public/project-screenshot.png or save it as ~/Downloads/2.png, then try again.",
      });
    }

    fs.copyFileSync(src, dest);
    return res
      .status(200)
      .json({ ok: true, url: "/project-screenshot.png", message: "Downloaded successfully" });
  } catch (err) {
    console.error("download-sample error:", err);
    return res
      .status(500)
      .json({ ok: false, message: "Failed to copy sample", error: String(err) });
  }
}


