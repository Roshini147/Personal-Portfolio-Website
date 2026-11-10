import React, { useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import { Tilt3DCard } from './3d/Tilt3DCard';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.category === activeTab);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Skills & Technologies
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            A comprehensive overview of programming languages, frontend and backend frameworks, databases, and developer tools.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveTab(cat.category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === cat.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <Tilt3DCard key={cat.category} maxTilt={6}>
              <div className="p-6 rounded-2xl bg-[#0d1017] border border-white/10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                    <h3 className="text-base font-semibold text-white">
                      {cat.title}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {cat.skills.length} skills
                    </span>
                  </div>

                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-200">
                            {skill.name}
                          </span>
                          {skill.level && (
                            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {skill.level}
                            </span>
                          )}
                        </div>
                        {skill.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-normal">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
