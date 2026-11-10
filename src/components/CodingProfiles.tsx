import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Code2,
  Terminal,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { socialLinks } from '../data/portfolioData';

export const CodingProfiles: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const profiles = [
    {
      name: 'GitHub',
      handle: 'Roshini147',
      url: 'https://github.com/Roshini147',
      description: 'Repositories for Full-Stack applications, academic projects, and open source exploration.',
      icon: <Github className="w-6 h-6 text-white" />,
      accentColor: 'from-slate-700 to-slate-900',
      borderColor: 'border-slate-700',
      badge: 'Code Repository',
    },
    {
      name: 'LinkedIn',
      handle: 'roshini-a-156324338',
      url: 'https://www.linkedin.com/in/roshini-a-156324338',
      description: 'Professional engineering network, industry endorsements, and career milestones.',
      icon: <Linkedin className="w-6 h-6 text-[#0a66c2]" />,
      accentColor: 'from-[#0a66c2]/20 to-canvas-950',
      borderColor: 'border-[#0a66c2]/40',
      badge: 'Professional Network',
    },
    {
      name: 'LeetCode',
      handle: 'WqnEbyLC83',
      url: 'https://leetcode.com/u/WqnEbyLC83/',
      description: 'Data Structures and Algorithms practice, optimizing time and space complexities.',
      icon: <Code2 className="w-6 h-6 text-[#ffa116]" />,
      accentColor: 'from-[#ffa116]/20 to-canvas-950',
      borderColor: 'border-[#ffa116]/40',
      badge: 'Algorithm Practice',
    },
    {
      name: 'HackerRank',
      handle: 'roshini120075',
      url: 'https://www.hackerrank.com/profile/roshini120075',
      description: 'Problem solving badges, domain certifications, and competitive programming.',
      icon: <Terminal className="w-6 h-6 text-[#00ea64]" />,
      accentColor: 'from-[#00ea64]/20 to-canvas-950',
      borderColor: 'border-[#00ea64]/40',
      badge: 'Domain Verification',
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="profiles" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-900/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            CODING PROFILES & <span className="text-gradient-cyan">SOCIALS</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl">
            Explore my verified engineering profiles across algorithmic platforms, code repositories, and professional networks.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {profiles.map((profile, idx) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl bg-canvas-900 border ${profile.borderColor} hover:bg-canvas-850 shadow-card-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-canvas-950 border border-slate-800 group-hover:scale-105 transition-transform">
                    {profile.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {profile.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {profile.name}
                </h3>
                <p className="text-xs font-mono text-cyanGlow-400 mb-3 truncate">
                  @{profile.handle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {profile.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-electric-600/20 hover:bg-electric-600 text-electric-300 hover:text-white border border-electric-500/30 text-xs font-semibold transition"
                >
                  <span>Visit Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(profile.url, idx)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                  title="Copy Profile URL"
                  aria-label="Copy URL"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
