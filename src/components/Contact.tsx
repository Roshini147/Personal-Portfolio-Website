import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { Tilt3DCard } from './3d/Tilt3DCard';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim() || formData.message.length < 8) {
      errs.message = 'Please enter a message.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`[Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    setSubmittedMessage(
      `Opening your email client to send to ${personalInfo.email}. You can also copy the email directly.`
    );
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Contact
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Have an idea, opportunity, or project in mind? Let&apos;s connect and turn it into something meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-4">
            <Tilt3DCard maxTilt={5}>
              <div className="p-7 rounded-2xl bg-[#0d1017] border border-white/10 space-y-5">
                <h3 className="text-base font-semibold text-white">
                  Direct Contact
                </h3>

                <div className="space-y-3.5 text-xs">
                  {/* Email */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 rounded-lg bg-white/5 text-blue-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-slate-400">Email</div>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="font-medium text-slate-200 hover:text-blue-400 transition truncate block"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                      title="Copy Email"
                      aria-label="Copy Email"
                    >
                      {copiedEmail ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-blue-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-400">Phone</div>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="font-medium text-slate-200 hover:text-blue-400 transition"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 text-blue-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-slate-400">Location</div>
                      <div className="font-medium text-slate-200">
                        {personalInfo.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          {/* Right Column: Message Form */}
          <div className="lg:col-span-7">
            <Tilt3DCard maxTilt={4}>
              <form
                onSubmit={handleSubmit}
                className="p-7 sm:p-8 rounded-2xl bg-[#0d1017] border border-white/10 space-y-4"
              >
                <h3 className="text-base font-semibold text-white mb-2">
                  Send a Message
                </h3>

                {submittedMessage && (
                  <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-blue-200 text-xs leading-relaxed">
                    {submittedMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition"
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    className="w-full px-3.5 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};
