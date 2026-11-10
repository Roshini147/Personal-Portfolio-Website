import React from 'react';
import { internshipExperiences } from '../data/portfolioData';
import { InternshipCard } from './InternshipCard';
import { DocumentInfo } from '../types';

interface InternshipTimelineProps {
  onViewDocument: (doc: DocumentInfo, company: string, role: string) => void;
}

export const InternshipTimeline: React.FC<InternshipTimelineProps> = ({
  onViewDocument,
}) => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Internship Experience
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Practical development experience across software engineering, full-stack web applications, and artificial intelligence.
          </p>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {internshipExperiences.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onViewDocument={onViewDocument}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
