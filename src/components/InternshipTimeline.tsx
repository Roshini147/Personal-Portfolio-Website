import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Building2, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { internshipExperiences } from '../data/portfolioData';
import { InternshipCard } from './InternshipCard';
import { DocumentInfo } from '../types';

interface InternshipTimelineProps {
  onViewDocument: (doc: DocumentInfo, company: string, role: string, discrepancy?: string) => void;
}

export const InternshipTimeline: React.FC<InternshipTimelineProps> = ({
  onViewDocument,
}) => {
  const [filter, setFilter] = useState<'all' | 'verified_docs'>('all');

  const displayedInternships =
    filter === 'all'
      ? internshipExperiences
      : internshipExperiences.filter(
          (item) => item.offerLetter.isAvailable || item.completionCertificate.isAvailable
        );

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Practical Industry Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            INTERNSHIP <span className="text-gradient-cyan">EXPERIENCE</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl">
            Real-world professional software engineering and AI internships. Every record includes interactive access to official offer letters and completion certificates.
          </p>
        </div>

        {/* Verification Guarantee Pill */}
        <div className="max-w-3xl mx-auto mb-10 p-4 rounded-xl bg-canvas-900 border border-slate-800 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>Authenticity Guarantee:</strong> Official documents are directly rendered from original uploaded files. Click any available document button to inspect in full resolution with zoom and download.
            </span>
          </div>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayedInternships.map((internship, idx) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <InternshipCard
                internship={internship}
                onViewDocument={onViewDocument}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
