import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Code2,
  Terminal,
  MapPin,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Hero3DCanvas } from './3d/Hero3DCanvas';
import { personalInfo, socialLinks } from '../data/portfolioData';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'GitHub':
        return <Github className="w-5 h-5" />;
      case 'LinkedIn':
        return <Linkedin className="w-5 h-5" />;
      case 'LeetCode':
        return <Code2 className="w-5 h-5" />;
      case 'HackerRank':
        return <Terminal className="w-5 h-5" />;
      default:
        return <Terminal className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-grid-subtle overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <Hero3DCanvas />

      {/* Radial Ambient Glow */}
      <div className="absolute inset-0 bg-radial-ambient pointer-events-none" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-glow-sm text-xs font-mono text-slate-300 mb-6 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">Available for Opportunities</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyanGlow-400 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {personalInfo.location}
          </span>
        </motion.div>

        {/* Name Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white font-display mb-4"
        >
          ROSHINI <span className="text-gradient-cyan">A</span>
        </motion.h1>

        {/* Roles Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-medium text-slate-300 mb-6 max-w-3xl"
        >
          <span className="px-3 py-1 rounded-md bg-electric-950/60 border border-electric-600/30 text-electric-300 font-mono text-xs sm:text-sm">
            Full-Stack Developer
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-700/60 text-slate-300 font-mono text-xs sm:text-sm">
            Software Development Enthusiast
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="px-3 py-1 rounded-md bg-cyan-950/50 border border-cyan-500/30 text-cyanGlow-300 font-mono text-xs sm:text-sm">
            AI & Machine Learning Enthusiast
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl font-semibold text-gradient-electric italic tracking-wide mb-4 font-mono"
        >
          &ldquo;{personalInfo.tagline}&rdquo;
        </motion.p>

        {/* Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal"
        >
          {personalInfo.shortBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-gradient-to-r from-electric-600 to-cyanGlow-600 hover:from-electric-500 hover:to-cyanGlow-500 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onOpenResumeModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-electric-500/50 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-cyanGlow-400" />
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex items-center gap-3 sm:gap-4"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              title={social.label}
              className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-cyanGlow-500/40 hover:shadow-glow-sm transition-all duration-300 transform hover:-translate-y-1"
            >
              {getSocialIcon(social.name)}
            </a>
          ))}
        </motion.div>

        {/* Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl pt-8 border-t border-slate-800/80"
        >
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-canvas-900/60 border border-slate-800/80 backdrop-blur-sm text-center"
            >
              <div className="text-xl sm:text-2xl font-bold font-mono text-cyanGlow-400">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="mt-10 animate-bounce text-slate-500">
          <a href="#about" aria-label="Scroll to About Me">
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
