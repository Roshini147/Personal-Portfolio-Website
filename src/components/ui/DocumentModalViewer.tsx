import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
  ShieldCheck,
  FileText,
  Calendar,
  Building,
  UserCheck,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  documentType: 'Offer Letter' | 'Completion Certificate' | 'Course Certification' | 'Resume';
  filePath: string;
  issueDate?: string;
  issuer?: string;
  signatory?: string;
  credentialId?: string;
  verificationUrl?: string;
  notes?: string;
  discrepancyAlert?: string;
}

export const DocumentModalViewer: React.FC<DocumentViewerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  documentType,
  filePath,
  issueDate,
  issuer,
  signatory,
  credentialId,
  verificationUrl,
  notes,
  discrepancyAlert,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset zoom and rotation whenever document changes or opens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setImageLoaded(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, filePath]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!modalRef.current) return;
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  // Mouse pan / drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Trigger download of original file
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop() || 'document.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-canvas-950/90 backdrop-blur-md overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-6xl max-h-[94vh] flex flex-col bg-canvas-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-canvas-850/90 border-b border-slate-800">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-lg bg-electric-600/15 border border-electric-500/30 flex items-center justify-center text-electric-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-electric-950/80 border border-electric-600/30 text-electric-400">
                      {documentType}
                    </span>
                    {credentialId && (
                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                        ID: {credentialId}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-100 truncate">
                    {title}
                  </h3>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Zoom out */}
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.5}
                  className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition disabled:opacity-40"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                {/* Zoom level percentage & Reset */}
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  title="Reset Zoom & Orientation"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                {/* Zoom in */}
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3.5}
                  className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition disabled:opacity-40"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Rotate */}
                <button
                  type="button"
                  onClick={handleRotate}
                  className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition hidden sm:inline-flex"
                  title="Rotate 90°"
                  aria-label="Rotate 90 degrees"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Fullscreen */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition hidden sm:inline-flex"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Download */}
                <button
                  type="button"
                  onClick={handleDownload}
                  className="p-2 rounded-lg bg-electric-600/20 border border-electric-500/40 text-electric-300 hover:bg-electric-600 hover:text-white transition flex items-center gap-1.5 text-xs font-medium px-3"
                  title="Download Original Document"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden md:inline">Download</span>
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-red-500/80 transition ml-1"
                  title="Close (Esc)"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Discrepancy Alert Banner (if applicable) */}
            {discrepancyAlert && (
              <div className="bg-amber-950/40 border-b border-amber-600/30 px-4 sm:px-6 py-2.5 flex items-start gap-2.5 text-amber-200 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Verification Notice: </span>
                  {discrepancyAlert}
                </div>
              </div>
            )}

            {/* Document Display Area */}
            <div
              ref={imageContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative flex-1 min-h-[50vh] max-h-[70vh] bg-canvas-950 flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none ${
                zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
              }`}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400 bg-canvas-950 z-10">
                  <div className="w-8 h-8 border-2 border-electric-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono">Loading original document...</span>
                </div>
              )}

              <div
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                }}
                className="max-w-full max-h-full flex items-center justify-center origin-center"
              >
                <img
                  src={filePath}
                  alt={title}
                  onLoad={() => setImageLoaded(true)}
                  className="max-h-[66vh] max-w-full w-auto h-auto object-contain rounded shadow-2xl border border-slate-700/50"
                  draggable={false}
                />
              </div>

              {/* Drag indicator if zoomed */}
              {zoomLevel > 1 && (
                <div className="absolute bottom-3 left-4 px-3 py-1 bg-canvas-900/80 backdrop-blur border border-slate-700 rounded-full text-[11px] font-mono text-slate-300 pointer-events-none">
                  Drag with mouse to pan
                </div>
              )}
            </div>

            {/* Metadata Footer */}
            <div className="px-4 sm:px-6 py-3 bg-canvas-850 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
                {issuer && (
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-electric-400" />
                    <span><strong className="text-slate-200">Issuer:</strong> {issuer}</span>
                  </div>
                )}
                {issueDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyanGlow-400" />
                    <span><strong className="text-slate-200">Date:</strong> {issueDate}</span>
                  </div>
                )}
                {signatory && (
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong className="text-slate-200">Signatory:</strong> {signatory}</span>
                  </div>
                )}
                {credentialId && (
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-electric-400" />
                    <span>ID: {credentialId}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {verificationUrl && (
                  <a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-electric-400 hover:text-cyanGlow-400 transition font-medium"
                  >
                    <span>Verify Online</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-400 font-mono text-[11px]">Original Verified File</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
