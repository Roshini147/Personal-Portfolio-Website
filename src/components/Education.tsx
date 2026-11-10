import React from 'react';
import { educationHistory } from '../data/portfolioData';
import { Tilt3DCard } from './3d/Tilt3DCard';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Academics
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {educationHistory.map((edu, idx) => (
            <Tilt3DCard key={idx} maxTilt={5}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1017] border border-white/10 hover:border-white/20 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-white/5">
                  <div>
                    <span className="text-xs font-medium text-blue-400">
                      {edu.period}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {edu.institution} — {edu.location}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="text-sm font-bold text-white px-2.5 py-1 rounded bg-white/5 border border-white/10">
                      {edu.score}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">
                      {edu.scoreLabel}
                    </p>
                  </div>
                </div>

                {edu.highlights && (
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {edu.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
