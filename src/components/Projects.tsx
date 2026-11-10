import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Shield,
  Activity,
  MapPin,
  CheckCircle2,
  Code
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import { ProjectItem } from '../types';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            PROJECTS & <span className="text-gradient-cyan">INNOVATIONS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl">
            Real software systems, AI-powered prototypes, and full-stack solutions built to solve complex problems.
          </p>
        </div>

        {/* Featured Project Banner: HAZARDIQ */}
        {projects.find((p) => p.featured) && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-canvas-900 via-canvas-900 to-canvas-850 border border-electric-500/40 shadow-2xl shadow-electric-950/30 relative overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-electric-600/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-md bg-electric-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                    Featured Flagship Project
                  </span>
                  <span className="px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
                    ★ Working Prototype
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  HAZARDIQ — AI & GIS-Based Disaster Decision-Support Platform
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  An AI-powered, GIS-based disaster decision-support platform designed to help municipal authorities, disaster response agencies, and emergency personnel prioritize relief actions, analyze community vulnerability, and evaluate safe shelter availability in real-time.
                </p>

                {/* Key Bullet points */}
                <div className="space-y-2 pt-2">
                  {[
                    'Dynamic vulnerability index computation combining weather APIs, terrain risk, and demographic density.',
                    'Real-time safe shelter capacity tracker and emergency supply dispatch prioritizer.',
                    'Integration of live field reports, geospatial mapping layers, and automated rescue routing.',
                  ].map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyanGlow-400 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack pills */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {['React.js', 'Python', 'Machine Learning', 'GIS / Spatial Data', 'REST APIs', 'Tailwind CSS'].map(
                    (tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-canvas-950 border border-slate-700/80 text-xs font-mono text-cyanGlow-300"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* Action buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="https://github.com/Roshini147"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-600 hover:bg-electric-500 text-white font-semibold text-xs tracking-wide shadow-glow-sm transition"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Profile</span>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs tracking-wide transition"
                  >
                    <span>Request Technical Demo</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Architectural Visual Preview */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-2xl bg-canvas-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyanGlow-400" />
                      HAZARDIQ Architecture
                    </span>
                    <span className="text-emerald-400">Status: Active</span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-cyanGlow-400" />
                        1. GIS & Spatial Ingestion
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Ingests weather telemetry, hazard flood plains, and population vulnerability parameters.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-electric-400" />
                        2. AI Risk Evaluation Engine
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Predictive algorithms score sector threat levels and calculate priority evacuation queues.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        3. Command Dispatch Matrix
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Real-time interface for disaster management authorities to allocate shelters and relief.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects
            .filter((p) => !p.featured)
            .map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-7 rounded-2xl bg-canvas-900 border border-slate-800 hover:border-slate-700 shadow-card-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-cyanGlow-400">
                      {proj.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
                      {proj.status}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2">
                    {proj.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-400 mb-6">
                    {proj.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-electric-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800 mb-4">
                    {proj.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-canvas-950 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/Roshini147"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-electric-400 hover:text-cyanGlow-400 transition"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code on GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
