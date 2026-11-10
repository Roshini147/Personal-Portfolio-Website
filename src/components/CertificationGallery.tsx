import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Calendar,
  ExternalLink,
  Eye,
  Download,
  ShieldCheck,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { certifications } from '../data/portfolioData';
import { CertificateItem } from '../types';

interface CertificationGalleryProps {
  onViewCertificate: (cert: CertificateItem) => void;
}

export const CertificationGallery: React.FC<CertificationGalleryProps> = ({
  onViewCertificate,
}) => {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-900/40">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Accredited Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            PROFESSIONAL <span className="text-gradient-cyan">CERTIFICATIONS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl">
            Verified technical certifications from world-class industry leaders: Infosys, Microsoft, Google Cloud, IBM, Accenture, and HP.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex flex-col justify-between rounded-2xl bg-canvas-900 border border-slate-800 hover:border-electric-500/40 hover:bg-canvas-850 shadow-card-subtle hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
            >
              <div>
                {/* Certificate Thumbnail Preview Container */}
                <div
                  onClick={() => onViewCertificate(cert)}
                  className="relative aspect-[16/11] bg-canvas-950 border-b border-slate-800 overflow-hidden cursor-pointer group/thumb"
                >
                  <img
                    src={cert.imagePath}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/thumb:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-canvas-950/40 group-hover/thumb:bg-canvas-950/20 transition-colors" />

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity bg-canvas-950/60 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-600 text-white font-semibold text-xs shadow-glow-sm">
                      <Eye className="w-4 h-4" />
                      <span>Inspect Certificate</span>
                    </span>
                  </div>

                  {/* Verified Badge pill */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-mono flex items-center gap-1 shadow-md">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-cyanGlow-400">
                      {cert.issuer}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {cert.issueDate}
                    </span>
                  </div>

                  <h3
                    onClick={() => onViewCertificate(cert)}
                    className="text-lg font-bold text-white hover:text-cyanGlow-300 transition cursor-pointer mb-2 leading-snug"
                  >
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {cert.summary}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60 text-[10px] font-mono text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 py-4 bg-canvas-950/60 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => onViewCertificate(cert)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-electric-600/20 hover:bg-electric-600 text-electric-300 hover:text-white border border-electric-500/30 text-xs font-semibold transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>

                {cert.verificationUrl && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="External Verification Link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
