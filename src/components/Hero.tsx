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
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 3D Geometric Canvas */}
      <Hero3DCanvas />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Location pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-6"
        >
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>{personalInfo.location}</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4"
        >
          ROSHINI A
        </motion.h1>

        {/* Roles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base font-medium text-slate-300 mb-5"
        >
          <span className="text-blue-400 font-semibold">Full-Stack Developer</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">Software Development Enthusiast</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-300">AI & Machine Learning Enthusiast</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg font-medium text-slate-400 italic mb-6 max-w-2xl"
        >
          &ldquo;{personalInfo.tagline}&rdquo;
        </motion.p>

        {/* Introduction */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8"
        >
          {personalInfo.shortBio}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-10 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
          >
            <span>Explore My Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onOpenResumeModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Download Resume</span>
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-3"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition"
            >
              {getSocialIcon(social.name)}
            </a>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl pt-6 border-t border-white/10"
        >
          {personalInfo.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-center"
            >
              <div className="text-xl sm:text-2xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Down Chevron */}
        <div className="mt-8 text-slate-500 animate-bounce">
          <a href="#about" aria-label="Scroll to About">
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
