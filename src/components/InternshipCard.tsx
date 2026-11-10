import React from 'react';
import { Eye } from 'lucide-react';
import { InternshipItem, DocumentInfo } from '../types';
import { Tilt3DCard } from './3d/Tilt3DCard';

interface InternshipCardProps {
  internship: InternshipItem;
  onViewDocument: (doc: DocumentInfo, company: string, role: string) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onViewDocument,
}) => {
  return (
    <Tilt3DCard maxTilt={6}>
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1017] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between h-full group">
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 mb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                  {internship.mode}
                </span>
                <span className="text-xs text-slate-400">
                  {internship.location}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                {internship.role}
              </h3>

              <div className="text-sm font-medium text-blue-400 mt-0.5">
                {internship.company}
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs font-medium text-slate-300 px-3 py-1 rounded-lg bg-white/5 border border-white/5 inline-block">
                {internship.displayPeriod}
              </span>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-5 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Responsibilities
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {internship.responsibilities.map((resp, idx) => (
                <li key={idx} className="leading-relaxed">
                  • {resp}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          {internship.technologies && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {internship.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Certificate Button (Offer letter removed per request) */}
        <div className="pt-4 border-t border-white/5">
          {internship.completionCertificate.isAvailable ? (
            <button
              type="button"
              onClick={() =>
                onViewDocument(
                  internship.completionCertificate,
                  internship.company,
                  internship.role
                )
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all duration-200 shadow-sm"
            >
              <span>View Certificate</span>
              <Eye className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-full py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-500 text-xs text-center font-medium">
              Certificate Pending
            </div>
          )}
        </div>
      </div>
    </Tilt3DCard>
  );
};
