"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ShoppingCart,
  Truck,
  Calendar,
  ClipboardList,
  FileCheck,
  FileSearch,
  Send,
  Kanban,
  Map,
  CalendarCheck,
  Bot,
  FolderOpen,
  Puzzle,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  href?: string;
  active?: boolean;
};

function NavItem({
  icon: Icon,
  label,
  href = "#",
  active = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
        active
          ? "bg-[#2a3a5c] text-white font-medium"
          : "text-white/70 hover:bg-[#2a3a5c]/50 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
    </Link>
  );
}

type NavSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

function NavSection({ title, children, defaultOpen = true }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white/50 uppercase tracking-wider w-full hover:text-white/70 transition-colors"
      >
        {isOpen ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
        {title}
      </button>
      {isOpen && <div className="space-y-0.5 ml-1">{children}</div>}
    </div>
  );
}

export default function AppSidebar() {
  const pathname = usePathname();
  const isProjectDetail =
    typeof pathname === "string" &&
    pathname.startsWith("/projects/") &&
    pathname !== "/projects";

  return (
    <aside className="w-[220px] bg-[#1e2642] flex flex-col min-h-screen">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <Link href="/projects" className="flex items-center gap-2">
          <svg
            width="32"
            height="28"
            viewBox="0 0 32 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 0L32 28H0L16 0Z" fill="#f5c518" />
          </svg>
          <span className="text-white font-bold text-xl tracking-wide">
            KRANE
          </span>
          <div className="ml-1 p-1 rounded border border-white/30">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1"
                y="1"
                width="10"
                height="10"
                rx="1"
                stroke="white"
                strokeWidth="1.5"
              />
              <path d="M4 4H8M4 6H8M4 8H6" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        {/* Dashboard - only show in project detail */}
        {isProjectDetail && (
          <div className="mb-2">
            <NavItem icon={LayoutDashboard} label="Dashboard" href="#" />
          </div>
        )}

        {/* Procurement Section */}
        {isProjectDetail ? (
          <>
            <NavSection title="Procurement">
              <NavItem
                icon={FileText}
                label="Procurement Log"
                href="#"
                active={true}
              />
              <NavItem icon={ShoppingCart} label="Orders" href="#" />
              <NavItem icon={Truck} label="Deliveries" href="#" />
            </NavSection>

            <NavSection title="Schedule viewer">
              <NavItem icon={Calendar} label="Project Schedule" href="#" />
              <NavItem icon={ClipboardList} label="Lookahead Plan" href="#" />
            </NavSection>

            <NavSection title="Submittal viewer">
              <NavItem icon={FileCheck} label="All" href="#" />
              <NavItem icon={Send} label="For Submission" href="#" />
              <NavItem icon={FileSearch} label="For Review" href="#" />
            </NavSection>

            <div className="mb-2">
              <NavItem
                icon={Kanban}
                label="Delivery board"
                href="#"
              />
            </div>

            <NavSection title="Logistics">
              <NavItem
                icon={Map}
                label="Area Map"
                href="#"
              />
              <NavItem icon={CalendarCheck} label="Reservation" href="#" />
            </NavSection>

            <NavSection title="KAI">
              <NavItem icon={Bot} label="KAI Agent" href="#" />
              <NavItem icon={FolderOpen} label="Saved Documents" href="#" />
              <NavItem icon={Puzzle} label="Integrations" href="#" />
              <NavItem icon={Settings} label="Settings" href="#" />
            </NavSection>
          </>
        ) : (
          // Simple nav for projects list
          <div className="space-y-1">
            <NavItem
              icon={FileText}
              label="Projects"
              href="/projects"
              active={pathname === "/projects"}
            />
            <NavItem icon={LayoutDashboard} label="Companies" href="#" />
          </div>
        )}
      </nav>
    </aside>
  );
}

