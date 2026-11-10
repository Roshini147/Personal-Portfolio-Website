import React from 'react';
import {
  Briefcase,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  Award,
  AlertTriangle,
  ExternalLink,
  Clock,
  Eye,
  Info
} from 'lucide-react';
import { InternshipItem, DocumentInfo } from '../types';

interface InternshipCardProps {
  internship: InternshipItem;
  onViewDocument: (doc: DocumentInfo, company: string, role: string, discrepancy?: string) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onViewDocument,
}) => {
  return (
    <div className="relative p-6 sm:p-8 rounded-2xl bg-canvas-900 border border-slate-800 hover:border-slate-700 shadow-card-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Header: Role, Company, Mode & Discrepancy indicator */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-electric-950 border border-electric-600/40 text-electric-400 text-xs font-mono font-medium">
                {internship.mode}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyanGlow-400" />
                {internship.location}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {internship.role}
            </h3>

            <div className="text-base font-semibold text-cyanGlow-400 flex items-center gap-2 mt-0.5">
              <span>{internship.company}</span>
            </div>
          </div>

          {/* Period Badge */}
          <div className="sm:text-right shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-cyanGlow-400" />
              <span>{internship.displayPeriod}</span>
            </div>
            {internship.documentPeriod && (
              <p className="text-[11px] font-mono text-slate-400 mt-1">
                Ref: {internship.documentPeriod}
              </p>
            )}
          </div>
        </div>

        {/* Discrepancy Alert Banner */}
        {internship.hasDiscrepancy && internship.discrepancyNote && (
          <div className="mb-5 p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold text-amber-300">
                Timeline Verification Flag
              </div>
              <p className="leading-relaxed text-amber-200/90">
                {internship.discrepancyNote}
              </p>
            </div>
          </div>
        )}

        {/* Key Responsibilities */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-electric-400" />
            Key Responsibilities & Deliverables
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {internship.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-electric-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        {internship.technologies && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {internship.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-canvas-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Official Documents Section */}
      <div className="pt-4 border-t border-slate-800">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Official Verification Documents</span>
          <span className="text-[10px] text-slate-500">Original Uploads</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 1. Offer Letter Button */}
          {internship.offerLetter.isAvailable ? (
            <button
              type="button"
              onClick={() =>
                onViewDocument(
                  internship.offerLetter,
                  internship.company,
                  internship.role,
                  internship.hasDiscrepancy ? internship.discrepancyNote : undefined
                )
              }
              className="flex items-center justify-between p-3 rounded-xl bg-electric-950/40 hover:bg-electric-900/60 border border-electric-600/40 hover:border-electric-500 text-electric-300 transition-all duration-200 group/btn text-left shadow-sm"
              title="Click to view verified Offer Letter"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="p-1.5 rounded-lg bg-electric-900/80 text-electric-300 group-hover/btn:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-white truncate">
                    Offer Letter
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    ✓ Verified Document
                  </div>
                </div>
              </div>
              <Eye className="w-4 h-4 text-electric-400 shrink-0 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-slate-500 select-none cursor-not-allowed"
              title="Offer Letter not uploaded yet"
            >
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-500">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400">
                  Offer Letter
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Pending Upload
                </div>
              </div>
            </div>
          )}

          {/* 2. Completion Certificate Button */}
          {internship.completionCertificate.isAvailable ? (
            <button
              type="button"
              onClick={() =>
                onViewDocument(
                  internship.completionCertificate,
                  internship.company,
                  internship.role,
                  internship.hasDiscrepancy ? internship.discrepancyNote : undefined
                )
              }
              className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 hover:border-cyan-400 text-cyanGlow-300 transition-all duration-200 group/btn text-left shadow-sm"
              title="Click to view verified Completion Certificate"
            >
              <div className="flex items-center gap-2.5 truncate">
                <div className="p-1.5 rounded-lg bg-cyan-900/80 text-cyanGlow-300 group-hover/btn:scale-105 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-semibold text-white truncate">
                    Completion Certificate
                  </div>
                  <div className="text-[10px] text-cyanGlow-400 font-mono">
                    ✓ Verified Document
                  </div>
                </div>
              </div>
              <Eye className="w-4 h-4 text-cyanGlow-400 shrink-0 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-slate-500 select-none cursor-not-allowed"
              title="Completion Certificate not uploaded yet"
            >
              <div className="p-1.5 rounded-lg bg-slate-800 text-slate-500">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-medium text-slate-400">
                  Completion Certificate
                </div>
                <div className="text-[10px] font-mono text-slate-500">
                  Pending Upload
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
