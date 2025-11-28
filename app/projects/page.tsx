"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import ProjectCard from "@/components/project-card";
import AppSidebar from "@/components/ui/app-sidebar";
import AppHeader from "@/components/ui/app-header";
import { initialProjects } from "@/data/projects";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = initialProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subtitle || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AppHeader />

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Projects</h1>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            {/* Search */}
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-200 focus:border-[#1e2642] focus:ring-[#1e2642]/20"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Show Archived Projects
              </Button>
              <Button className="bg-[#f5c518] hover:bg-[#e5b616] text-gray-900 font-medium shadow-sm">
                <Plus className="w-4 h-4" />
                New project
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                id={p.id}
                title={p.title}
                subtitle={p.subtitle}
                imageSrc={p.image}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
