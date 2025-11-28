import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // update filename as needed, but use the default below
  res.writeHead(302, { Location: "/uploads/KRANE-Brand-Design-Pitch-1.pdf" });
  res.end();
}


