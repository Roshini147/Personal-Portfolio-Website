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
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Certifications
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Verified certifications from Infosys Springboard, Microsoft, HP LIFE, Google Cloud, Accenture, and IBM.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Tilt3DCard key={cert.id} maxTilt={6}>
              <div className="rounded-2xl bg-[#0d1017] border border-white/10 hover:border-white/20 transition-colors overflow-hidden flex flex-col justify-between h-full">
                <div>
                  {/* Certificate Image Thumbnail */}
                  <div
                    onClick={() => onViewCertificate(cert)}
                    className="relative aspect-[16/11] bg-[#07090f] border-b border-white/5 overflow-hidden cursor-pointer group/thumb"
                  >
                    <img
                      src={cert.imagePath}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover/thumb:bg-black/40 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover/thumb:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Certificate</span>
                      </span>
                    </div>
                  </div>

                  {/* Information */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                      <span className="font-medium text-blue-400">
                        {cert.issuer}
                      </span>
                      <span className="text-xs">
                        {cert.issueDate}
                      </span>
                    </div>

                    <h3
                      onClick={() => onViewCertificate(cert)}
                      className="text-base font-bold text-white hover:text-blue-400 transition cursor-pointer mb-2 leading-snug"
                    >
                      {cert.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {cert.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-xs text-slate-300"
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
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600/10 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/20 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
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
