import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  CheckCircle,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Real mailto submission fallback with encoded parameters
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}\n\nSent via Roshini A Portfolio Contact Form`
    );

    const mailtoUrl = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setSubmittedFeedback(
      `Your email client has been launched with your inquiry addressed to ${personalInfo.email}. If it didn't open automatically, you can also copy the email directly!`
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-canvas-950">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-electric-950/70 border border-electric-600/30 text-electric-400 font-mono text-xs uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight max-w-3xl">
            LET&apos;S BUILD SOMETHING <span className="text-gradient-cyan">GREAT TOGETHER.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-electric-500 to-cyanGlow-400 rounded-full mt-4" />
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl">
            Have an idea, opportunity, or project in mind? Let&apos;s connect and turn it into something meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-2xl bg-canvas-900 border border-slate-800 shadow-card-subtle space-y-6">
              <h3 className="text-xl font-bold text-white tracking-wide">
                Direct Contact Channels
              </h3>

              <div className="space-y-4">
                {/* Email item */}
                <div className="p-4 rounded-xl bg-canvas-950/80 border border-slate-800 flex items-start justify-between gap-3 group">
                  <div className="flex items-start gap-3 truncate">
                    <div className="p-2.5 rounded-lg bg-electric-950 border border-electric-600/30 text-electric-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs text-slate-400 font-medium">Email Address</div>
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-sm font-semibold text-slate-200 hover:text-cyanGlow-400 transition truncate block"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shrink-0"
                    title="Copy Email"
                    aria-label="Copy Email"
                  >
                    {copiedEmail ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone item */}
                <div className="p-4 rounded-xl bg-canvas-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyanGlow-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Phone & WhatsApp</div>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm font-semibold text-slate-200 hover:text-cyanGlow-400 transition"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Location item */}
                <div className="p-4 rounded-xl bg-canvas-950/80 border border-slate-800 flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Location</div>
                    <div className="text-sm font-semibold text-slate-200">
                      {personalInfo.location}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      (Open to Relocation & Remote Roles)
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Social Buttons */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs font-mono uppercase text-slate-400 mb-3">
                  Connect on Socials
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/roshini-a-156324338"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-[#0a66c2] text-slate-300 hover:text-white border border-slate-700 hover:border-transparent text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/Roshini147"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-canvas-900 border border-slate-800 shadow-card-subtle space-y-5"
            >
              <h3 className="text-xl font-bold text-white tracking-wide mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Fill in the details below. This generates an instant direct communication link.
              </p>

              {/* Feedback Alert if submitted */}
              {submittedFeedback && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>{submittedFeedback}</div>
                </div>
              )}

              {/* Name & Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name <span className="text-cyanGlow-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className={`w-full px-4 py-2.5 rounded-xl bg-canvas-950 border ${
                      errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyanGlow-400'
                    } text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email <span className="text-cyanGlow-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-canvas-950 border ${
                      errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-cyanGlow-400'
                    } text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subject <span className="text-cyanGlow-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full-Stack Developer Opportunity / Project Inquiry"
                  className={`w-full px-4 py-2.5 rounded-xl bg-canvas-950 border ${
                    errors.subject ? 'border-rose-500' : 'border-slate-800 focus:border-cyanGlow-400'
                  } text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Message <span className="text-cyanGlow-400">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your requirements, timelines, or role..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-canvas-950 border ${
                    errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-cyanGlow-400'
                  } text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition resize-none`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-electric-600 to-cyanGlow-600 hover:from-electric-500 hover:to-cyanGlow-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Roshini A</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
