import { useState, useRef } from "react"
import type { AthleteDocument, VerificationStatus } from "../../../types/participant"

interface IdUploadDropzoneProps {
  label: string
  subLabel: string
  documentType: "student_id" | "national_id"
  doc: AthleteDocument
  onUpdateDoc: (newDoc: AthleteDocument) => void
}

export default function IdUploadDropzone({
  label,
  subLabel,
  documentType,
  doc,
  onUpdateDoc,
}: IdUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileSelection(file: File) {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      alert("Please upload an image file (JPG, PNG) or PDF of your official document.")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    onUpdateDoc({
      type: documentType,
      status: "under_review",
      fileName: file.name,
      fileUrl: objectUrl,
      uploadedAt: new Date().toISOString(),
    })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0])
    }
  }

  function getStatusBadge(status: VerificationStatus) {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 uppercase">
            <span>✓</span> Document Verified
          </span>
        )
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-400 uppercase">
            <span>⏳</span> Under Committee Review
          </span>
        )
      case "action_required":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#A60E13]/60 bg-[#A60E13]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#A60E13] uppercase">
            <span>⚠️</span> Re-upload Required
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1F1F24] bg-[#1C1C1E] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#8E8E93] uppercase">
            <span>⚪</span> Not Uploaded
          </span>
        )
    }
  }

  return (
    <div className="rounded-2xl border border-[#1F1F24] bg-[#000000] p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F1F24] pb-3 gap-2">
        <div>
          <h4 className="font-sans font-bold text-sm text-white">{label}</h4>
          <p className="text-xs text-[#8E8E93]">{subLabel}</p>
        </div>
        <div>{getStatusBadge(doc.status)}</div>
      </div>

      {doc.rejectionReason && (
        <div className="mt-3 rounded-xl border border-[#A60E13]/40 bg-[#A60E13]/10 p-2.5 text-xs text-[#A60E13] font-mono">
          <strong>Review Note:</strong> {doc.rejectionReason}
        </div>
      )}

      {/* Preview or Upload Zone */}
      {doc.fileUrl ? (
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-[#1F1F24] bg-[#0A0A0A] p-3 sm:p-4">
          <div className="relative h-24 w-36 sm:h-28 sm:w-44 shrink-0 overflow-hidden rounded-lg border border-[#1F1F24] bg-[#1C1C1E]">
            <img
              src={doc.fileUrl}
              alt={label}
              className="h-full w-full object-cover"
            />
            <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[9px] text-white">
              Preview
            </span>
          </div>

          <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
            <p className="font-mono text-xs font-bold text-white truncate">
              {doc.fileName || "official_identification_card.jpg"}
            </p>
            <p className="text-[11px] text-[#8E8E93] font-mono">
              Status: {doc.status === "verified" ? "Officially Accredited" : "Pending Committee Approval"}
            </p>
            {doc.uploadedAt && (
              <p className="text-[10px] text-[#8E8E93] font-mono">
                Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
              </p>
            )}

            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-[#1F1F24] bg-[#000000] px-3 py-1 font-mono text-[11px] text-white hover:border-[#A60E13] transition cursor-pointer"
              >
                Replace Photo
              </button>
              <button
                type="button"
                onClick={() => window.open(doc.fileUrl, "_blank")}
                className="rounded-lg border border-[#1F1F24] bg-[#000000] px-3 py-1 font-mono text-[11px] text-[#8E8E93] hover:text-white transition cursor-pointer"
              >
                View Full
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition cursor-pointer ${
            isDragging
              ? "border-[#A60E13] bg-[#A60E13]/10"
              : "border-[#1F1F24] bg-[#0A0A0A] hover:border-[#A60E13]/50"
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1C1C1E] text-xl">
            📷
          </span>
          <p className="mt-2 font-sans font-bold text-xs sm:text-sm text-white">
            Tap or Drag &amp; Drop to upload photo
          </p>
          <p className="mt-1 font-mono text-[11px] text-[#8E8E93]">
            Supports JPG, PNG, or clear PDF (Max 10MB)
          </p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelection(e.target.files[0])
          }
        }}
      />
    </div>
  )
}
