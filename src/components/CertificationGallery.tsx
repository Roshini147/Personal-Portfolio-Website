import React from 'react';
import { Eye, ExternalLink } from 'lucide-react';
import { certifications } from '../data/portfolioData';
import { CertificateItem } from '../types';
import { Tilt3DCard } from './3d/Tilt3DCard';

interface CertificationGalleryProps {
  onViewCertificate: (cert: CertificateItem) => void;
}

export const CertificationGallery: React.FC<CertificationGalleryProps> = ({
  onViewCertificate,
}) => {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-coral-400 mb-2">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream-50 mb-3">
            Certifications
          </h2>
          <p className="text-sm text-cream-400 max-w-xl">
            Verified certifications from Infosys Springboard, Microsoft, HP LIFE, Google Cloud, Accenture, and IBM.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Tilt3DCard key={cert.id} maxTilt={6}>
              <div className="rounded-2xl bg-[#0b2d35]/90 border border-cream-100/10 hover:border-coral-500/30 transition-colors overflow-hidden flex flex-col justify-between h-full shadow-lg backdrop-blur-sm">
                <div>
                  {/* Certificate Image Thumbnail */}
                  <div
                    onClick={() => onViewCertificate(cert)}
                    className="relative aspect-[16/11] bg-teal-950/80 border-b border-cream-100/5 overflow-hidden cursor-pointer group/thumb"
                  >
                    <img
                      src={cert.imagePath}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#04161a]/30 group-hover/thumb:bg-[#04161a]/60 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover/thumb:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-coral-500 text-cream-50 text-xs font-semibold shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Certificate</span>
                      </span>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-cream-400 mb-1.5">
                      <span className="font-semibold text-coral-400">
                        {cert.issuer}
                      </span>
                      <span className="text-xs">
                        {cert.issueDate}
                      </span>
                    </div>

                    <h3
                      onClick={() => onViewCertificate(cert)}
                      className="text-base font-bold text-cream-50 hover:text-coral-400 transition cursor-pointer mb-2 leading-snug"
                    >
                      {cert.title}
                    </h3>

                    <p className="text-xs text-cream-300 line-clamp-2 leading-relaxed mb-4">
                      {cert.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded bg-teal-950/40 border border-teal-700/40 text-xs text-cream-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onViewCertificate(cert)}
                    className="flex-1 py-2 px-3 rounded-xl bg-coral-500/15 hover:bg-coral-500 text-coral-300 hover:text-cream-50 border border-coral-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-teal-900/60 hover:bg-teal-850 text-cream-300 hover:text-coral-400 border border-cream-100/10 transition"
                      title="Verify Online"
                      aria-label="Verify Online"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
