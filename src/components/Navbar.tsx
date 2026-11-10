import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

const navLinks = [
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
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 180;

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
          ? 'bg-[#08090d]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="text-white font-semibold text-lg tracking-tight hover:text-blue-400 transition"
          >
            ROSHINI A
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Resume</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="sm:hidden p-2 rounded-lg bg-white/5 text-slate-200"
              aria-label="Resume"
            >
              <Download className="w-4 h-4 text-blue-400" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1017]/95 backdrop-blur-xl border-b border-white/10 px-5 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive ? 'text-blue-400 bg-white/5' : 'text-slate-300'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 text-sm font-medium text-slate-200 border border-white/10"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>View Resume</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="w-full text-center px-4 py-2.5 rounded-lg bg-blue-600 text-sm font-medium text-white"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
