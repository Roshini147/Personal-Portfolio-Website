import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { educationHistory } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-900/30">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            EDUCATION <span className="text-gradient-cyan">TIMELINE</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-slate-800 space-y-12 ml-2 sm:ml-4">
          {educationHistory.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-canvas-950 border-2 border-electric-500 group-hover:border-cyanGlow-400 flex items-center justify-center transition-colors">
                <div className="w-2 h-2 rounded-full bg-electric-400 group-hover:bg-cyanGlow-300 transition-colors" />
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-canvas-900/90 border border-slate-800 hover:border-slate-700 hover:bg-canvas-850 shadow-card-subtle transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-semibold text-cyanGlow-400 flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-sm font-medium text-electric-400">
                        {edu.field}
                      </p>
                    )}
                  </div>

                  {/* Grade Badge */}
                  <div className="sm:text-right shrink-0">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-electric-950/80 border border-electric-500/40 text-electric-300">
                      <Award className="w-4 h-4 text-cyanGlow-400" />
                      <span className="text-sm font-bold font-mono">{edu.score}</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-1">
                      {edu.scoreLabel}
                    </p>
                  </div>
                </div>

                {/* Institution & Location */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mb-4">
                  <span className="font-semibold text-slate-200">
                    {edu.institution}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin className="w-3 h-3 text-cyanGlow-400" />
                    {edu.location}
                  </span>
                </div>

                {/* Highlights */}
                {edu.highlights && (
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {edu.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
