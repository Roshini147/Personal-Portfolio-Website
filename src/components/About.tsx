import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Layers,
  Cpu,
  Globe2,
  CheckCircle2,
  Download,
  Terminal,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface AboutProps {
  onOpenResumeModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-900/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profile & Engineering Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            ABOUT <span className="text-gradient-cyan">ME</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Portrait & Personal Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Decorative cyber corner accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyanGlow-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-electric-500 z-20 pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-canvas-900 shadow-2xl shadow-black/80 group">
                <img
                  src={personalInfo.profileImage}
                  alt="Roshini A - Full-Stack Developer"
                  className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas-950 via-transparent to-transparent opacity-60" />
                
                {/* Floating badge over image */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-canvas-900/90 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">ROSHINI A</h4>
                      <p className="text-xs text-cyanGlow-400 font-mono">B.E. Computer Science</p>
                    </div>
                    <span className="px-2 py-1 rounded bg-electric-950 text-[11px] font-mono text-electric-300 border border-electric-600/30">
                      CGPA 8.89
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick details card below image */}
              <div className="mt-5 w-full p-5 rounded-2xl bg-canvas-850 border border-slate-800 shadow-card-subtle space-y-3 text-xs">
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <GraduationCap className="w-4 h-4 text-electric-400" /> Institution:
                  </span>
                  <span className="font-semibold text-slate-200">J.N.N. Institute of Eng.</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4 text-cyanGlow-400" /> Location:
                  </span>
                  <span className="font-semibold text-slate-200">{personalInfo.location}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Globe2 className="w-4 h-4 text-emerald-400" /> Languages:
                  </span>
                  <span className="font-semibold text-slate-200">English, Tamil, Japanese (Beg.)</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={onOpenResumeModal}
                    className="w-full py-2.5 px-3 rounded-lg bg-electric-600/20 hover:bg-electric-600 text-electric-300 hover:text-white border border-electric-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View & Download Resume</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Professional Biography & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Bio paragraphs */}
            <div className="space-y-4 text-slate-300 leading-relaxed text-base sm:text-lg">
              <p className="text-white font-medium">
                {personalInfo.about.p1}
              </p>
              <p>
                {personalInfo.about.p2}
              </p>
              <p>
                {personalInfo.about.p3}
              </p>
              <p className="text-cyanGlow-300 font-mono text-sm sm:text-base border-l-2 border-cyanGlow-400 pl-4 py-1 italic bg-cyan-950/20 rounded-r-lg">
                &ldquo;{personalInfo.about.p4}&rdquo;
              </p>
            </div>

            {/* Core Competencies highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-canvas-850/80 border border-slate-800 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-electric-950 border border-electric-600/30 flex items-center justify-center text-electric-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Full-Stack Execution</h4>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  End-to-end architecture from React client layers to Java / Node RESTful APIs and MongoDB / MySQL schemas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas-850/80 border border-slate-800 hover:border-slate-700 transition">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyanGlow-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">AI & Machine Learning</h4>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Practical model development, data preprocessing, exploratory analysis, and integration with modern cloud AI APIs.
                </p>
              </div>
            </div>

            {/* Key Strengths list from resume */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Core Professional Traits
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Problem Solving',
                  'Adaptability',
                  'Teamwork',
                  'Innovation',
                  'Technical Communication',
                  'Clean Code Architecture',
                ].map((trait, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-cyanGlow-400" />
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
