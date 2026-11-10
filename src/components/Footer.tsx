import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface FooterProps {
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResumeModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 pt-14 pb-12 px-4 sm:px-6 lg:px-8 relative bg-[#07080c]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div>
            <a href="#home" className="text-white font-semibold text-lg hover:text-blue-400 transition">
              ROSHINI A
            </a>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Computer Science Engineering Student & Full-Stack Developer — Chennai, India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#education" className="hover:text-white transition">Education</a>
            <a href="#experience" className="hover:text-white transition">Experience</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#certifications" className="hover:text-white transition">Certifications</a>
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="hover:text-blue-400 transition"
            >
              Resume
            </button>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Roshini A. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
