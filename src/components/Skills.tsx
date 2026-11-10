import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Layout,
  Server,
  Database,
  Wrench,
  Brain,
  Users,
  Languages,
  CheckCircle,
  Terminal,
  Cpu
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'languages':
        return <Code className="w-4 h-4 text-electric-400" />;
      case 'frontend':
        return <Layout className="w-4 h-4 text-cyanGlow-400" />;
      case 'backend':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'database':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-purple-400" />;
      case 'concepts':
        return <Brain className="w-4 h-4 text-rose-400" />;
      case 'soft':
        return <Users className="w-4 h-4 text-sky-400" />;
      case 'spoken':
        return <Languages className="w-4 h-4 text-teal-400" />;
      default:
        return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.category === activeTab);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight">
            SKILLS & <span className="text-gradient-cyan">TECHNOLOGIES</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl">
            A comprehensive overview of programming languages, modern frameworks, database systems, and core computer science foundations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              activeTab === 'all'
                ? 'bg-electric-600 text-white shadow-glow-sm'
                : 'bg-canvas-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            All Categories
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveTab(cat.category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeTab === cat.category
                  ? 'bg-electric-600 text-white shadow-glow-sm'
                  : 'bg-canvas-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {getCategoryIcon(cat.category)}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-canvas-900/80 border border-slate-800/80 hover:border-electric-500/30 hover:bg-canvas-850 shadow-card-subtle transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60">
                      {getCategoryIcon(cat.category)}
                    </div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {cat.skills.length} skills
                  </span>
                </div>

                {/* Skill items */}
                <div className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-canvas-950/60 border border-slate-800/60 group-hover:border-slate-700/60 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200 text-sm">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-cyanGlow-400 border border-slate-700/60">
                            {skill.level}
                          </span>
                        )}
                      </div>
                      {skill.description && (
                        <p className="text-xs text-slate-400 mt-1 leading-snug">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
