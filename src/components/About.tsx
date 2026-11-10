import React from 'react';
import { Download, MapPin, GraduationCap, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Tilt3DCard } from './3d/Tilt3DCard';

interface AboutProps {
  onOpenResumeModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResumeModal }) => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Introduction
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About Me
          </h2>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Portrait & Identity */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Tilt3DCard maxTilt={6} className="w-full max-w-sm">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0d1017] shadow-xl">
                <div className="relative">
                  <img
                    src={personalInfo.profileImage}
                    alt="Roshini A"
                    className="w-full h-auto object-cover object-top"
                  />
                  {/* Overlay text on image */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#08090d]/90 backdrop-blur-md border border-white/10">
                    <h3 className="text-base font-bold text-white">ROSHINI A</h3>
                    {/* Explicitly colored in pure white as requested */}
                    <p className="text-xs font-medium text-white mt-0.5">
                      Full-Stack Developer
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-3 bg-[#0d1017] border-t border-white/5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-400" /> Institution
                    </span>
                    <span className="font-medium text-white">J.N.N. Institute of Eng.</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" /> Location
                    </span>
                    <span className="font-medium text-white">{personalInfo.location}</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/5 text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Globe className="w-3.5 h-3.5 text-blue-400" /> Languages
                    </span>
                    <span className="font-medium text-white">English, Tamil, Japanese</span>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenResumeModal}
                    className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View & Download Resume</span>
                  </button>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 text-base leading-relaxed">
            <p className="text-white text-lg font-medium leading-relaxed">
              {personalInfo.about.p1}
            </p>
            <p>
              {personalInfo.about.p2}
            </p>
            <p>
              {personalInfo.about.p3}
            </p>

            {/* Core Competency Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Tilt3DCard maxTilt={5}>
                <div className="p-4 rounded-xl bg-[#0d1017] border border-white/10 h-full">
                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    Full-Stack Engineering
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    End-to-end development spanning responsive React web apps, REST APIs in Node.js and Java Spring Boot, and structured databases in MySQL and MongoDB.
                  </p>
                </div>
              </Tilt3DCard>

              <Tilt3DCard maxTilt={5}>
                <div className="p-4 rounded-xl bg-[#0d1017] border border-white/10 h-full">
                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    AI & Machine Learning
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    Applied experience in data preprocessing, exploratory analysis, and AI model evaluation using Python libraries and generative AI concepts.
                  </p>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
