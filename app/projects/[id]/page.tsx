"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { initialProjects } from "@/data/projects";
import AppSidebar from "@/components/ui/app-sidebar";
import AppHeader from "@/components/ui/app-header";
import { Button } from "@/components/ui/button";
import UploadArea from "@/components/upload-area";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Upload,
  FileText,
  Paperclip,
  Settings2,
  AtSign,
  Mic,
  ArrowUp,
  MessageSquare,
  ClipboardList,
  Building2,
  Info,
  FolderOpen,
  ChevronDown,
  X,
  CornerDownLeft,
  Loader2,
  CheckCircle2,
  Clock3,
} from "lucide-react";

// File Upload Card Component
function UploadCard({
  fileType,
  title,
  description,
  badgeColor,
  kind,
  selectedUrl,
  onSelected,
}: {
  fileType: string;
  title: string;
  description: string;
  badgeColor: string;
  kind?: "spec" | "drawings";
  selectedUrl?: string | null;
  onSelected?: (url: string) => void;
}) {
  const hasFile = !!selectedUrl;
  return (
    <div
      className={`flex items-center justify-between p-6 border-b border-gray-100 last:border-b-0 transition-colors group ${
        hasFile ? "bg-gray-50" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {/* File Icon with Badge */}
        <div className="relative">
          <div className="w-12 h-14 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <div
            className={`absolute -bottom-1 -left-1 px-1.5 py-0.5 text-[10px] font-bold text-white rounded ${badgeColor}`}
          >
            {fileType}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#f5c518] rounded-full flex items-center justify-center">
            <Upload className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 flex flex-col justify-center gap-1">
          <h3 className="font-medium text-gray-900 leading-snug whitespace-nowrap">
            Add your <span className="font-semibold">{title}</span> file
          </h3>
          <p className="text-sm text-gray-500 leading-snug whitespace-nowrap">
            {description}
          </p>
        </div>
      </div>

      {/* Actions on hover */}
      <UploadArea kind={kind} selectedUrl={selectedUrl} onSelected={onSelected} />
    </div>
  );
}

const ANALYSIS_STEPS = [
  "45 materials in Division 03 (Concrete)",
  "28 materials in Division 04 (Masonry)",
  "22 materials in Division 07 (Thermal & Moisture Protection)",
  "18 materials in Division 15 (Mechanical - HVAC)",
  "10 materials in Division 16 (Electrical)",
  "4 materials in Division 21 (Fire Suppression)",
];

type InventoryItem = {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  unitCost?: string;
  availableQuantity?: number;
  needsAttention?: boolean;
};

type InventoryDivision = {
  id: string;
  label: string;
  stepIndex: number; // index into ANALYSIS_STEPS when this division becomes available
  materialCount: number;
  items: InventoryItem[];
};

function createDivisionItems(
  prefix: string,
  count: number,
  unit: string = "EA",
  attentionCount: number = 0
): InventoryItem[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-${(index + 1).toString().padStart(3, "0")}`,
    description: `${prefix} material ${index + 1}`,
    unit,
    quantity: index + 1,
    unitCost: "-",
    availableQuantity: index + 1,
    needsAttention: index < attentionCount,
  }));
}

const INVENTORY_DIVISIONS: InventoryDivision[] = [
  {
    id: "division-03",
    label: "Division 03: Concrete",
    stepIndex: 0,
    materialCount: 45,
    // First 12 materials flagged as needing attention (e.g. missing units)
    items: createDivisionItems("CONC", 45, "EA", 12),
  },
  {
    id: "division-04",
    label: "Division 04: Masonry",
    stepIndex: 1,
    materialCount: 28,
    items: createDivisionItems("MASON", 28),
  },
  {
    id: "division-07",
    label: "Division 07: Thermal & Moisture Protection",
    stepIndex: 2,
    materialCount: 22,
    items: createDivisionItems("THERM", 22),
  },
  {
    id: "division-15",
    label: "Division 15: Mechanical - HVAC",
    stepIndex: 3,
    materialCount: 18,
    items: createDivisionItems("HVAC", 18),
  },
  {
    id: "division-16",
    label: "Division 16: Electrical",
    stepIndex: 4,
    materialCount: 10,
    items: createDivisionItems("ELEC", 10),
  },
  {
    id: "division-21",
    label: "Division 21: Fire Suppression",
    stepIndex: 5,
    materialCount: 4,
    items: createDivisionItems("FIRE", 4),
  },
];

export default function ProjectDetail() {
  const params = useParams() as { id?: string } | null;
  const id = params?.id;
  const project = id ? initialProjects.find((p) => p.id === id) : undefined;

  if (!id || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Project not found
          </h1>
          <Link href="/projects">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbs = [
    {
      label: "Brigade Group",
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      label: project.title,
      icon: <Building2 className="w-4 h-4" />,
      isDropdown: true,
    },
  ];

  const [specFileUrl, setSpecFileUrl] = React.useState<string | null>(null);
  const [drawingFileUrl, setDrawingFileUrl] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [assistantGreeting, setAssistantGreeting] =
    React.useState<string | null>(null);
  const [showSpecLanguages, setShowSpecLanguages] = React.useState(false);
  const [showDrawingLanguages, setShowDrawingLanguages] = React.useState(false);
  const [selectedPlatform, setSelectedPlatform] = React.useState<string | null>(
    null
  );
  const [isPlatformOpen, setIsPlatformOpen] = React.useState(false);

  const [divisions, setDivisions] =
    React.useState<InventoryDivision[]>(INVENTORY_DIVISIONS);
  const [hasAttention, setHasAttention] = React.useState<boolean>(() =>
    INVENTORY_DIVISIONS.some((division) =>
      division.items.some((item) => item.needsAttention)
    )
  );
  const [isImporting, setIsImporting] = React.useState<boolean>(false);
  const [hasImported, setHasImported] = React.useState<boolean>(false);

  const platforms = [
    "Google Drive",
    "Procore",
    "AutoDesk",
    "CMIC",
    "Sharepoint",
    "Viewpoint",
    "Egnyte",
    "Primavera",
  ];

  const canGenerateLog = !!specFileUrl && !!drawingFileUrl;

  const [extractionStatus, setExtractionStatus] = React.useState<
    "idle" | "reading" | "paused"
  >("idle");
  const [showAnalysisSteps, setShowAnalysisSteps] =
    React.useState<boolean>(false);
  const [currentAnalysisStep, setCurrentAnalysisStep] =
    React.useState<number>(0);
  const [analysisCompleted, setAnalysisCompleted] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (!canGenerateLog) {
      setExtractionStatus("idle");
      setShowAnalysisSteps(false);
      setCurrentAnalysisStep(0);
      setAnalysisCompleted(false);
      setHasAttention(
        INVENTORY_DIVISIONS.some((division) =>
          division.items.some((item) => item.needsAttention)
        )
      );
      setHasImported(false);
    }
  }, [canGenerateLog]);

  function startExtraction() {
    if (!canGenerateLog) return;
    setExtractionStatus("reading");
    setShowAnalysisSteps(false);
    setCurrentAnalysisStep(0);
    setAnalysisCompleted(false);
  }

  function toggleExtractionPause() {
    setExtractionStatus((prev) => (prev === "reading" ? "paused" : "reading"));
  }

  // After 10s of reading, transition to analysis steps view
  React.useEffect(() => {
    if (extractionStatus !== "reading") return;
    const timer = setTimeout(() => {
      setShowAnalysisSteps(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, [extractionStatus]);

  // Step through analysis steps one by one
  React.useEffect(() => {
    if (!showAnalysisSteps || analysisCompleted) return;
    if (extractionStatus !== "reading") return;

    // If we're on the last step, mark analysis as complete after a short delay.
    if (currentAnalysisStep >= ANALYSIS_STEPS.length - 1) {
      const doneTimer = setTimeout(() => {
        setAnalysisCompleted(true);
        setExtractionStatus("idle");
      }, 1500);
      return () => clearTimeout(doneTimer);
    }

    const interval = setInterval(() => {
      setCurrentAnalysisStep((prev) =>
        prev < ANALYSIS_STEPS.length - 1 ? prev + 1 : prev
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [
    showAnalysisSteps,
    currentAnalysisStep,
    extractionStatus,
    analysisCompleted,
  ]);

  function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    if (lower === "hi" || lower === "hello" || lower === "hi sathish" || lower === "hello sathish") {
      setAssistantGreeting(
        "Hi Sathish! Great to see you here. I’m ready to help you set up your procurement log."
      );
    }

    setInputValue("");
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canGenerateLog && extractionStatus === "idle" && !analysisCompleted) {
        startExtraction();
      } else {
      handleSend();
      }
    }
  }

  const showInventoryView = showAnalysisSteps || analysisCompleted;
  const maxInventoryStep = analysisCompleted
    ? ANALYSIS_STEPS.length - 1
    : currentAnalysisStep;
  const visibleInventoryDivisions = divisions.filter(
    (division) => division.stepIndex <= maxInventoryStep
  );

  const [collapsedDivisions, setCollapsedDivisions] = React.useState<
    Record<string, boolean>
  >({});

  const [viewAttentionOnly, setViewAttentionOnly] =
    React.useState<boolean>(false);

  const [editingItemId, setEditingItemId] = React.useState<string | null>(null);
  const [editingUnit, setEditingUnit] = React.useState<string>("");
  const [showImportConfirm, setShowImportConfirm] =
    React.useState<boolean>(false);

  function toggleDivisionCollapse(id: string) {
    setCollapsedDivisions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function startEditUnit(item: InventoryItem) {
    setEditingItemId(item.id);
    setEditingUnit(item.unit);
  }

  function saveEditUnit() {
    if (!editingItemId) return;
    setDivisions((prev) => {
      const next = prev.map((division) => ({
        ...division,
        items: division.items.map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                unit: editingUnit || item.unit,
                needsAttention: false,
              }
            : item
        ),
      }));

      const hasRemainingAttention = next.some((division) =>
        division.items.some((item) => item.needsAttention)
      );

      if (hasRemainingAttention) {
        toast.success("Unit updated for material", { duration: 2000 });
      } else {
        toast.success("Units added for all materials successfully", {
          duration: 2500,
        });
        setViewAttentionOnly(false);
      }

      setHasAttention(hasRemainingAttention);
      setHasImported(false);

      return next;
    });
    setEditingItemId(null);
    setEditingUnit("");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AppHeader breadcrumbs={breadcrumbs} />

        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Left: Materials table */}
            <section className="flex-1 flex flex-col bg-gray-50 px-8 py-10 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FolderOpen className="w-4 h-4" />
                  <span>Procurement Log</span>
                </div>
                {analysisCompleted && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <span>Export</span>
                  </button>
                )}
              </div>

              <div className="flex-1 flex flex-col rounded-2xl border border-dashed border-gray-200 bg-white/60 overflow-hidden">
                {/* Column headers at the top */}
                <div className="border-b border-gray-100 bg-gray-50">
                  <div className="grid grid-cols-6 text-[11px] uppercase tracking-wide text-gray-400">
                    <div className="px-6 py-3 font-medium">MATERIAL ID</div>
                    <div className="px-6 py-3 font-medium whitespace-nowrap">
                      MATERIAL DESCRIPTION
                    </div>
                    <div className="px-4 py-3 font-medium">UNIT</div>
                    <div className="px-4 py-3 font-medium">QUANTITY</div>
                    <div className="px-4 py-3 font-medium">UNIT COST</div>
                    <div className="px-6 py-3 font-medium">
                      AVAILABLE QUANTITY
                    </div>
                  </div>
                </div>

                {/* Body */}
                {isImporting ? (
                  <div className="flex-1 flex items-center justify-center bg-white">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      <span>Importing materials…</span>
                    </div>
                  </div>
                ) : showInventoryView && visibleInventoryDivisions.length > 0 ? (
                  <div className="flex-1 overflow-auto bg-white">
                    <div className="divide-y divide-gray-100">
                      {visibleInventoryDivisions.map((division) => {
                        const divisionItems = viewAttentionOnly
                          ? division.items.filter((item) => item.needsAttention)
                          : division.items;

                        // If we're in "attention only" mode and this division has
                        // no flagged items, skip rendering it.
                        if (viewAttentionOnly && divisionItems.length === 0) {
                          return null;
                        }

                        return (
                          <div key={division.id} className="bg-white">
                          {/* Division header */}
                          <button
                            type="button"
                            onClick={() => toggleDivisionCollapse(division.id)}
                            className="grid w-full grid-cols-6 items-center px-6 py-3 bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-2">
                              <ChevronDown
                                className={`h-4 w-4 text-gray-400 transition-transform ${
                                  collapsedDivisions[division.id]
                                    ? "-rotate-90"
                                    : "rotate-0"
                                }`}
                              />
                              <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                {division.label}
                              </span>
                            </div>
                            <div />
                            <div />
                            <div />
                            <div />
                            <div className="text-xs text-gray-500 text-right">
                              {division.materialCount} materials
                            </div>
                          </button>

                          {/* Rows */}
                          {!collapsedDivisions[division.id] &&
                            divisionItems.map((item) => (
                              <div
                                key={item.id}
                                className="grid grid-cols-6 px-6 py-2 text-sm text-gray-700"
                              >
                                <div>{item.id}</div>
                                <div>{item.description}</div>
                                <div>
                                  {editingItemId === item.id ? (
                                    <input
                                      autoFocus
                                      value={editingUnit}
                                      onChange={(e) =>
                                        setEditingUnit(e.target.value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault();
                                          saveEditUnit();
                                        }
                                      }}
                                      onBlur={saveEditUnit}
                                      className="w-20 rounded border border-gray-300 bg-white px-2 py-0.5 text-sm"
                                    />
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => startEditUnit(item)}
                                      className={`text-left ${
                                        item.needsAttention
                                          ? "text-rose-600 font-medium"
                                          : ""
                                      }`}
                                    >
                                      {item.unit}
                                    </button>
                                  )}
                                </div>
                                <div>{item.quantity}</div>
                                <div>{item.unitCost ?? "-"}</div>
                                <div>{item.availableQuantity ?? "-"}</div>
                              </div>
                            ))}
                        </div>
                      );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Centered data connection + upload cards + copy */}
                    <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 text-gray-400">
                      <div className="w-full max-w-3xl space-y-6">
                        {/* Data connection select */}
                        <div className="space-y-2">
                          <h2 className="text-base font-semibold text-gray-900">
                            Data connection
                          </h2>
                          <label className="block text-sm font-medium text-gray-700">
                            Select Platform <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setIsPlatformOpen((open) => !open)
                              }
                              className={`flex w-full items-center justify-between rounded-lg border px-4 h-10 text-sm bg-white text-gray-900 transition-colors ${
                                isPlatformOpen
                                  ? "border-[#FFD503] ring-2 ring-[#FFD503]/40"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <span
                                className={`truncate ${
                                  selectedPlatform
                                    ? "text-gray-900"
                                    : "text-gray-500"
                                }`}
                              >
                                {selectedPlatform || "Choose platform"}
                              </span>
                              <ChevronDown className="ml-3 h-4 w-4 text-gray-400" />
                            </button>

                            {isPlatformOpen && (
                              <div className="absolute left-0 right-0 mt-1 max-h-72 overflow-auto rounded-xl border border-gray-200 bg-white shadow-lg z-20">
                                {platforms.map((platform) => (
                                  <button
                                    key={platform}
                                    type="button"
                                    onClick={() => {
                                      setSelectedPlatform(platform);
                                      setIsPlatformOpen(false);
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                                  >
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gray-100 text-[11px] font-semibold text-gray-700">
                                      {platform.charAt(0)}
                </span>
                                    <span>{platform}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
            </div>

                        {/* Divider between data connection and upload section */}
                        <div className="h-px bg-gray-200" />

                        {/* Upload cards */}
                        <div className="space-y-4 text-gray-400">
              <UploadCard
                fileType="XML"
                title="spec document"
                description=".XER or .XML format | Up to 20MB per file"
                badgeColor="bg-[#f5c518]"
                kind="spec"
                selectedUrl={specFileUrl}
                onSelected={setSpecFileUrl}
              />
              <UploadCard
                fileType="PDF"
                title="Construction drawings"
                description=".PDF format | Up to 20MB per file"
                badgeColor="bg-red-500"
                kind="drawings"
                selectedUrl={drawingFileUrl}
                onSelected={setDrawingFileUrl}
              />
                          <p className="pt-2 text-center text-sm text-gray-500">
                            Your materials will appear here after upload
                          </p>
                        </div>
                      </div>
            </div>

                    {/* Footer row */}
                    <div className="border-t border-gray-100 bg-white text-center text-xs text-gray-400 py-4">
                      No materials yet
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Right: KAI panel */}
            <aside className="w-[420px] border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto">
              {/* Panel header */}
              <div className="sticky top-0 z-20 flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 bg-white">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Welcome! I'm KAI.
                  </p>
                  <h2 className="text-base font-semibold text-gray-900">
                    Begin by setting up your procurement log.
                  </h2>
                  <p className="mt-1 text-xs text-gray-600">
                    Just add your{" "}
                    <span className="font-medium text-gray-900 underline underline-offset-2">
                      spec document
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-gray-900 underline underline-offset-2">
                      Construction drawings
                    </span>
                    . Our system will create your procurement log instantly.
                  </p>
                </div>
                <button
                  type="button"
                  className="ml-4 flex h-7 w-7 items-center justify-center text-gray-400 hover:text-gray-600"
                  aria-label="Close assistant"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Body: chips + chat + footer actions */}
              <div className="flex-1 flex flex-col px-4 pt-4 pb-3">
                <div className="flex-1 space-y-3">
              {(specFileUrl || drawingFileUrl) && (
                    <div className="mb-4 flex flex-wrap gap-2">
                  {specFileUrl && (
                    <div
                      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700"
                      onClick={() => setShowSpecLanguages((v) => !v)}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-md border border-emerald-100 bg-emerald-50">
                            <FileText className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-900">
                          Spec document added
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Linked to this conversation
                        </div>
                        {showSpecLanguages && (
                          <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-gray-600">
                            <span className="rounded-full bg-gray-100 px-2 py-0.5">
                              English
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5">
                              ಕನ್ನಡ
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5">
                              தமிழ்
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSpecFileUrl(null);
                          setShowSpecLanguages(false);
                        }}
                        aria-label="Remove spec document"
                        className="ml-3 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {drawingFileUrl && (
                    <div
                      className="group flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700"
                      onClick={() => setShowDrawingLanguages((v) => !v)}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-md border border-red-100 bg-red-50">
                        <FileText className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-900">
                          Construction drawings added
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Linked to this conversation
                        </div>
                        {showDrawingLanguages && (
                          <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-gray-600">
                            <span className="rounded-full bg-gray-100 px-2 py-0.5">
                              English
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5">
                              ಕನ್ನಡ
                            </span>
                            <span className="rounded-full bg-gray-100 px-2 py-0.5">
                              தமிழ்
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrawingFileUrl(null);
                          setShowDrawingLanguages(false);
                        }}
                        aria-label="Remove construction drawings"
                        className="ml-3 flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}

                  {canGenerateLog && extractionStatus === "idle" && !analysisCompleted && (
                    <div className="mb-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={startExtraction}
                        className="inline-flex items-center rounded-lg bg-[#FFD503] px-5 py-2 text-sm font-medium text-gray-900 hover:bg-[#e6c303] transition-colors"
                      >
                        Start extraction
                      </button>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <CornerDownLeft className="h-3 w-3" />
                        <span>or hit Enter</span>
                      </div>
                    </div>
                  )}

                  {canGenerateLog &&
                    extractionStatus !== "idle" &&
                    !showAnalysisSteps && (
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div className="space-y-1 text-sm text-gray-700">
                        <div className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-700">
                          {extractionStatus === "reading" && (
                            <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                          )}
                          <span>
                            {extractionStatus === "reading"
                              ? "Reading documents in real time…"
                              : "Reading paused"}
                          </span>
                        </div>

                        {specFileUrl && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span
                              className={
                                extractionStatus === "reading"
                                  ? "animate-pulse"
                                  : undefined
                              }
                            >
                              Reading spec.XML
                            </span>
                          </div>
                        )}
                        {drawingFileUrl && (
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span
                              className={
                                extractionStatus === "reading"
                                  ? "animate-pulse"
                                  : undefined
                              }
                            >
                              Reading drawing.pdf
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={toggleExtractionPause}
                        className="mt-1 inline-flex items-center rounded border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {extractionStatus === "reading" ? "Pause" : "Resume"}
                      </button>
                    </div>
                  )}

                  {canGenerateLog && showAnalysisSteps && (
                    <div className="mb-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                          {analysisCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                          )}
                          <span>
                            Analyzing your document and extracting materials
                          </span>
                        </div>

                        {!analysisCompleted && (
                          <button
                            type="button"
                            onClick={toggleExtractionPause}
                            className="inline-flex items-center rounded border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          >
                            {extractionStatus === "reading" ? "Pause" : "Resume"}
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 text-sm text-gray-700">
                        {ANALYSIS_STEPS.map((step, index) => {
                          const isCompleted = analysisCompleted
                            ? true
                            : index < currentAnalysisStep;
                          const isActive =
                            !analysisCompleted && index === currentAnalysisStep;

                          return (
                            <div
                              key={step}
                              className="flex items-start gap-2"
                            >
                              <div className="mt-0.5">
                                {isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                ) : isActive ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                                ) : (
                                  <Clock3 className="h-4 w-4 text-gray-300" />
                                )}
                              </div>
                              <p
                                className={`${
                                  isActive
                                    ? "font-semibold text-gray-900"
                                    : isCompleted
                                    ? "text-gray-700"
                                    : "text-gray-400"
                                }`}
                              >
                                {step}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <Clock3 className="h-3 w-3" />
                        <span>Estimated time: ~5 seconds</span>
                      </div>
                    </div>
                  )}

                  {analysisCompleted && (
                    <div className="mb-3 rounded-2xl border border-gray-100 bg-emerald-50/60 px-4 py-3">
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Extraction complete! You can now review all materials in the
                        inventory table on the left.
                      </p>
                      <p className="text-xs text-gray-600 mb-3">
                        Make any edits you need, or import everything directly into
                        your project inventory.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          if (hasAttention) {
                            setShowImportConfirm(true);
                          } else {
                            setIsImporting(true);
                            setTimeout(() => {
                              setIsImporting(false);
                              toast.success("Materials imported successfully", {
                                duration: 2500,
                              });
                              setHasImported(true);
                            }, 2000);
                          }
                        }}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-[#FFD503] px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-[#e6c303] transition-colors"
                      >
                        Import
                      </button>
                    </div>
                  )}

                  {analysisCompleted && hasAttention && (
                    <div className="mb-3 rounded-2xl border border-rose-100 bg-rose-50/60 px-4 py-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                          Needs your attention
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setViewAttentionOnly((current) => !current)
                          }
                          className="text-[11px] font-medium text-rose-700 underline underline-offset-2 hover:text-rose-800"
                        >
                          {viewAttentionOnly ? "View all materials" : "View materials"}
                        </button>
                      </div>
                      <div className="space-y-1.5 text-sm text-gray-800">
                        <p className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                          <span>
                            12 materials are missing unit information. We recommend
                            fixing these before import.
                          </span>
                        </p>
                      </div>
                    </div>
                  )}

                  {analysisCompleted && !hasAttention && !hasImported && (
                    <div className="mb-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        All looks good now – you’re ready to import your materials.
                      </p>
                    </div>
                  )}

                  {assistantGreeting && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
                      <div className="text-[11px] font-medium text-gray-500 mb-1">
                        Preview
                      </div>
                      <div className="text-sm text-gray-900">
                        {assistantGreeting}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky footer: input + disclaimer */}
                <div className="sticky bottom-0 bg-white pt-2">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 px-3 py-2.5 mb-2">
                    <div className="flex items-center gap-3">
                <input
                  type="text"
                        className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
                        placeholder="Ask anything or Type / for actions…"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
              </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                          <Paperclip className="w-4 h-4" />
                  </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                          <Settings2 className="w-4 h-4" />
                  </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                          <AtSign className="w-4 h-4" />
                  </button>
                </div>
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors">
                          <Mic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleSend}
                          className={`p-1.5 rounded-lg transition-colors ${
                      inputValue.trim()
                        ? "bg-[#FFD503] text-gray-900 hover:bg-[#e6c303]"
                              : "bg-white text-gray-300 border border-gray-200"
                    }`}
                  >
                          <ArrowUp className="w-4 h-4" />
                  </button>
                      </div>
                </div>
              </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <div className="flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      <span>
                        KAI can make mistakes. Please double check responses.
                      </span>
                    </div>
                  </div>
                </div>
            </div>
              {/* Import confirmation dialog */}
              <Dialog open={showImportConfirm} onOpenChange={setShowImportConfirm}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Import materials with missing units?</DialogTitle>
                    <DialogDescription>
                      We’ll import your materials now. Whenever you try to create an
                      order using a material that’s still missing a unit, we’ll
                      remind you to add it first.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowImportConfirm(false)}
                      className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowImportConfirm(false);
                        setIsImporting(true);
                        setTimeout(() => {
                          setIsImporting(false);
                          toast.success("Materials imported successfully", {
                            duration: 2500,
                          });
                          setHasImported(true);
                        }, 2000);
                      }}
                      className="inline-flex items-center rounded-lg bg-[#FFD503] px-3 py-1.5 text-xs font-semibold text-gray-900 hover:bg-[#e6c303]"
                    >
                      Yes, import
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
