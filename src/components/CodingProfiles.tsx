import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Code2,
  Terminal,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { Tilt3DCard } from './3d/Tilt3DCard';

export const CodingProfiles: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const profiles = [
    {
      name: 'GitHub',
      handle: 'Roshini147',
      url: 'https://github.com/Roshini147',
      description: 'Repositories for Full-Stack applications, academic projects, and open source exploration.',
      icon: <Github className="w-5 h-5 text-white" />,
    },
    {
      name: 'LinkedIn',
      handle: 'roshini-a-156324338',
      url: 'https://www.linkedin.com/in/roshini-a-156324338',
      description: 'Professional engineering network, industry endorsements, and career milestones.',
      icon: <Linkedin className="w-5 h-5 text-[#0a66c2]" />,
    },
    {
      name: 'LeetCode',
      handle: 'WqnEbyLC83',
      url: 'https://leetcode.com/u/WqnEbyLC83/',
      description: 'Data Structures and Algorithms practice, optimizing time and space complexities.',
      icon: <Code2 className="w-5 h-5 text-[#ffa116]" />,
    },
    {
      name: 'HackerRank',
      handle: 'roshini120075',
      url: 'https://www.hackerrank.com/profile/roshini120075',
      description: 'Problem solving badges, domain certifications, and competitive programming.',
      icon: <Terminal className="w-5 h-5 text-[#00ea64]" />,
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="profiles" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Online Presence
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Profiles & Networks
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Verified links across algorithmic problem solving platforms, source repositories, and professional networks.
          </p>
        </div>

        {/* 3D Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {profiles.map((profile, idx) => (
            <Tilt3DCard key={profile.name} maxTilt={6}>
              <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/10 hover:border-white/20 transition-colors flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      {profile.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-0.5">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-blue-400 mb-3 truncate">
                    @{profile.handle}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {profile.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/20 text-xs font-medium transition"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(profile.url, idx)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                    title="Copy URL"
                    aria-label="Copy URL"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
