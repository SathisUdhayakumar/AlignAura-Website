"use client";

import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  imageSrc?: string;
};

export default function ProjectCard({ id, title, subtitle, imageSrc }: Props) {
  return (
    <Link href={`/projects/${id}`} className="block group">
      <div className="w-[280px] rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white hover:shadow-xl transition-all duration-300">
        <div className="relative h-40 overflow-hidden">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-full w-full bg-slate-200" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
    </Link>
  );
}

