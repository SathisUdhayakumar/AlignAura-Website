import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // lightweight redirect - no file bundling
  res.writeHead(302, { Location: "/uploads/KRANE-Brand-Design-Pitch-1.pdf" });
  res.end();
}
