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
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0b2d35]/90 border border-cream-100/10 hover:border-coral-500/30 transition-all duration-300 flex flex-col justify-between h-full group shadow-lg backdrop-blur-sm">
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 mb-4 border-b border-cream-100/5">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs px-2.5 py-0.5 rounded bg-teal-900/60 text-cream-300 border border-cream-100/10">
                  {internship.mode}
                </span>
                <span className="text-xs text-cream-400">
                  {internship.location}
                </span>
              </div>

              <h3 className="text-xl font-bold text-cream-50 tracking-tight">
                {internship.role}
              </h3>

              <div className="text-sm font-semibold text-coral-400 mt-0.5">
                {internship.company}
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs font-medium text-cream-200 px-3 py-1 rounded-lg bg-teal-900/60 border border-cream-100/10 inline-block">
                {internship.displayPeriod}
              </span>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="mb-5 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cream-400 mb-2">
              Responsibilities
            </h4>
            <ul className="space-y-1.5 text-xs text-cream-200">
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
                  className="px-2.5 py-0.5 rounded bg-teal-950/40 border border-teal-700/40 text-xs text-cream-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Certificate Button (Offer letter removed per request) */}
        <div className="pt-4 border-t border-cream-100/5">
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-coral-500 hover:bg-coral-600 active:bg-coral-700 text-cream-50 text-xs font-semibold transition-all duration-200 shadow-md shadow-coral-500/20 cursor-pointer"
            >
              <span>View Certificate</span>
              <Eye className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-full py-2.5 rounded-xl bg-teal-950/40 border border-teal-800/40 text-cream-500 text-xs text-center font-medium">
              Certificate Pending
            </div>
          )}
        </div>
      </div>
    </Tilt3DCard>
  );
};
