import React from 'react';
import {
  Code2,
  Github,
  Linkedin,
  Terminal,
  Heart,
  ArrowUp,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolioData';

interface FooterProps {
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'GitHub':
        return <Github className="w-4 h-4" />;
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4" />;
      case 'LeetCode':
        return <Code2 className="w-4 h-4" />;
      case 'HackerRank':
        return <Terminal className="w-4 h-4" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-canvas-950 border-t border-slate-800/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="flex items-center gap-2.5 text-white font-bold text-xl font-display">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-600 to-cyanGlow-500 p-[1px]">
                <div className="w-full h-full bg-canvas-950 rounded-lg flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-cyanGlow-400" />
                </div>
              </div>
              <span>
                ROSHINI<span className="text-electric-500 font-mono">.A</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Full-Stack Developer and Computer Science Engineering student passionate about engineering scalable, responsive web solutions and AI-driven systems.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-cyanGlow-400">
              <MapPin className="w-3.5 h-3.5" />
              <span>{personalInfo.location}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Portfolio
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <a href="#home" className="hover:text-cyanGlow-400 transition">Home</a>
              <a href="#about" className="hover:text-cyanGlow-400 transition">About Me</a>
              <a href="#skills" className="hover:text-cyanGlow-400 transition">Skills</a>
              <a href="#education" className="hover:text-cyanGlow-400 transition">Education</a>
              <a href="#experience" className="hover:text-cyanGlow-400 transition">Internships</a>
              <a href="#projects" className="hover:text-cyanGlow-400 transition">Projects</a>
              <a href="#certifications" className="hover:text-cyanGlow-400 transition">Certifications</a>
              <a href="#contact" className="hover:text-cyanGlow-400 transition">Contact</a>
            </div>
          </div>

          {/* Socials & Resume */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Connect & Verify
            </h4>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="p-2.5 rounded-xl bg-canvas-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyanGlow-500/40 hover:bg-slate-800 transition"
                >
                  {getSocialIcon(s.name)}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-electric-500/40 text-xs font-semibold text-slate-200 hover:text-white transition"
            >
              <span>Inspect Resume (PDF/Image)</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ROSHINI A. All rights reserved. Built with precision, React, and Three.js.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyanGlow-400 transition font-mono text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
