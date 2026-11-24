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
    <footer className="border-t border-cream-100/10 pt-14 pb-12 px-4 sm:px-6 lg:px-8 relative bg-[#031114]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-cream-100/5">
          <div>
            <a href="#home" className="text-cream-50 font-semibold text-lg hover:text-coral-400 transition">
              ROSHINI A
            </a>
            <p className="text-xs text-cream-400 mt-1 max-w-sm">
              Computer Science Engineering Student & Full-Stack Developer — Chennai, India
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-cream-300">
            <a href="#about" className="hover:text-coral-400 transition">About</a>
            <a href="#skills" className="hover:text-coral-400 transition">Skills</a>
            <a href="#education" className="hover:text-coral-400 transition">Education</a>
            <a href="#experience" className="hover:text-coral-400 transition">Experience</a>
            <a href="#projects" className="hover:text-coral-400 transition">Projects</a>
            <a href="#certifications" className="hover:text-coral-400 transition">Certifications</a>
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="hover:text-coral-400 transition cursor-pointer"
            >
              Resume
            </button>
            <a href="#contact" className="hover:text-coral-400 transition">Contact</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-500">
          <div>
            © {new Date().getFullYear()} Roshini A. All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-cream-400 hover:text-coral-400 transition cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
