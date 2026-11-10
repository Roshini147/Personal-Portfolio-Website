import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  documentType: string;
  filePath: string;
  issueDate?: string;
  issuer?: string;
  signatory?: string;
  credentialId?: string;
  verificationUrl?: string;
  notes?: string;
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
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasError, setHasError] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setHasError(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, filePath]);

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

  const toggleFullscreen = () => {
    if (!modalRef.current) return;
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.6));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0e111a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#141824] border-b border-white/10">
              <div className="truncate pr-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                    {documentType}
                  </span>
                  {credentialId && (
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      ID: {credentialId}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-white truncate">
                  {title}
                </h3>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.6}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition disabled:opacity-30"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3.5}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition disabled:opacity-30"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleRotate}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition hidden sm:inline-flex"
                  title="Rotate"
                  aria-label="Rotate"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition hidden sm:inline-flex"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  aria-label="Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <a
                  href={filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition hidden sm:inline-flex"
                  title="Open in New Tab"
                  aria-label="Open in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 text-xs font-medium"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition ml-1"
                  title="Close (Esc)"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Image Area */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative flex-1 min-h-[50vh] max-h-[70vh] bg-[#07090f] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none ${
                zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
              }`}
            >
              {hasError ? (
                <div className="text-center p-6 space-y-3">
                  <p className="text-sm text-slate-300">Unable to preview document directly.</p>
                  <a
                    href={filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium"
                  >
                    <span>Open Document File Directly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel}) rotate(${rotation}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  }}
                  className="max-w-full max-h-full flex items-center justify-center origin-center"
                >
                  <img
                    ref={imgRef}
                    src={filePath}
                    alt={title}
                    onError={() => setHasError(true)}
                    className="max-h-[66vh] max-w-full w-auto h-auto object-contain rounded border border-white/10 shadow-xl"
                    draggable={false}
                  />
                </div>
              )}

              {zoomLevel > 1 && !hasError && (
                <div className="absolute bottom-3 left-4 px-3 py-1 bg-black/70 border border-white/10 rounded-full text-xs text-slate-300 pointer-events-none">
                  Drag to pan
                </div>
              )}
            </div>

            {/* Footer Information */}
            <div className="px-5 py-3 bg-[#141824] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                {issuer && (
                  <span>
                    <strong className="text-slate-300">Issuer:</strong> {issuer}
                  </span>
                )}
                {issueDate && (
                  <span>
                    <strong className="text-slate-300">Date:</strong> {issueDate}
                  </span>
                )}
                {signatory && (
                  <span>
                    <strong className="text-slate-300">Signatory:</strong> {signatory}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {verificationUrl && (
                  <a
                    href={verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition font-medium inline-flex items-center gap-1"
                  >
                    <span>Verify Online</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <a
                  href={filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition text-xs"
                >
                  Direct File Link
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
