import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section spy
      const sections = navLinks.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-canvas-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-2.5 text-slate-100 font-bold tracking-tight text-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-600 to-cyanGlow-500 p-[1px] shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300">
              <div className="w-full h-full bg-canvas-950 rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-cyanGlow-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="font-display tracking-wider">
              ROSHINI<span className="text-electric-500 font-mono">.A</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-slate-800/80'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 hover:border-electric-500/50 shadow-sm transition-all duration-200"
            >
              <Download className="w-3.5 h-3.5 text-cyanGlow-400" />
              <span>Resume</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-electric-600 to-cyanGlow-600 hover:from-electric-500 hover:to-cyanGlow-500 text-white shadow-glow-sm hover:shadow-glow-md transition-all duration-200"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="sm:hidden p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
              title="Resume"
              aria-label="View Resume"
            >
              <Download className="w-4 h-4 text-cyanGlow-400" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-canvas-900/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 mt-2 shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition ${
                  isActive
                    ? 'text-cyanGlow-400 bg-slate-800'
                    : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 text-sm font-medium text-slate-200 border border-slate-700"
            >
              <Download className="w-4 h-4 text-cyanGlow-400" />
              <span>Inspect & Download Resume</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full text-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-electric-600 to-cyanGlow-600 text-sm font-medium text-white shadow-glow-sm"
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
