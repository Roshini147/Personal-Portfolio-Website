import React from 'react';
import { Github } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { Tilt3DCard } from './3d/Tilt3DCard';

export const Projects: React.FC = () => {
  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Projects
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Key software projects, prototypes, and applications developed using React, Python, Java, and modern databases.
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <Tilt3DCard maxTilt={4} className="mb-8">
            <div className="p-7 sm:p-9 rounded-2xl bg-[#0d1017] border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-medium text-blue-400">
                  {featuredProject.category}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {featuredProject.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {featuredProject.title} — AI & GIS-Based Disaster Decision-Support Platform
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-4xl">
                {featuredProject.description}
              </p>

              <div className="space-y-2 mb-6">
                {featuredProject.bulletPoints.map((point, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    • {point}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {featuredProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/Roshini147"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </Tilt3DCard>
        )}

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((proj) => (
            <Tilt3DCard key={proj.id} maxTilt={5}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#0d1017] border border-white/10 hover:border-white/20 transition-colors h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="text-blue-400 font-medium">{proj.category}</span>
                    <span>{proj.status}</span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">
                    {proj.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-400 mb-5">
                    {proj.bulletPoints.map((pt, pIdx) => (
                      <li key={pIdx}>• {pt}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mb-4">
                    {proj.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-xs text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://github.com/Roshini147"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repositories</span>
                  </a>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
