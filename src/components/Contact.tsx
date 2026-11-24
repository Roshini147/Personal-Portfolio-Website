import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please enter your name (minimum 2 characters).';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      errs.message = 'Please enter a message (at least 8 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setFeedbackMessage(null);

    try {
      // Direct background API submission to Roshini's email using FormSubmit AJAX endpoint
      const response = await fetch('https://formsubmit.co/ajax/roshini120075@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: `New Portfolio Message: ${formData.subject.trim()}`,
          message: formData.message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && (data?.success === 'true' || data?.success === true || response.status === 200)) {
        setSubmitStatus('success');
        setFeedbackMessage(
          'Thank you for contacting me! Your message has been sent successfully.'
        );
        // Reset form upon successful delivery
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setErrors({});
      } else {
        throw new Error(data?.message || 'Submission failed');
      }
    } catch {
      setSubmitStatus('error');
      setFeedbackMessage(
        'Sorry, there was an issue sending your message. Please try again or reach out directly at roshini120075@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <p className="text-xs font-semibold uppercase tracking-wider text-coral-400 mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-cream-50 mb-3">
            Contact
          </h2>
          <p className="text-sm text-cream-400 max-w-xl">
            Have an idea, opportunity, or project in mind? Reach out below and your message will be delivered directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-4">
            <Tilt3DCard maxTilt={5}>
              <div className="p-7 rounded-2xl bg-[#0b2d35]/90 border border-cream-100/10 space-y-5 shadow-xl backdrop-blur-md">
                <h3 className="text-base font-semibold text-cream-50">
                  Direct Contact
                </h3>

                <div className="space-y-3.5 text-xs">
                  {/* Email */}
                  <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-700/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 rounded-lg bg-coral-500/15 text-coral-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-cream-400">Email</div>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="font-medium text-cream-100 hover:text-coral-400 transition truncate block"
                        >
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg bg-teal-800/50 hover:bg-teal-700/60 text-cream-300 hover:text-cream-50 transition"
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
                  <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-700/40 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-coral-500/15 text-coral-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-cream-400">Phone</div>
                      <a
                        href={`tel:${personalInfo.phone}`}
                        className="font-medium text-cream-100 hover:text-coral-400 transition"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-700/40 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-coral-500/15 text-coral-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-cream-400">Location</div>
                      <div className="font-medium text-cream-100">
                        {personalInfo.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          {/* Right Column: Background Message Form */}
          <div className="lg:col-span-7">
            <Tilt3DCard maxTilt={4}>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-7 sm:p-8 rounded-2xl bg-[#0b2d35]/90 border border-cream-100/10 space-y-4 shadow-xl backdrop-blur-md"
              >
                <h3 className="text-base font-semibold text-cream-50 mb-2">
                  Send a Message
                </h3>

                {/* Status Messages */}
                {submitStatus === 'success' && feedbackMessage && (
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                {submitStatus === 'error' && feedbackMessage && (
                  <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{feedbackMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-cream-300 mb-1">
                      Name <span className="text-coral-400">*</span>
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-teal-950/50 border border-teal-700/60 text-sm text-cream-50 placeholder-cream-600 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition disabled:opacity-50"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-coral-300 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-cream-300 mb-1">
                      Email <span className="text-coral-400">*</span>
                    </label>
                    <input
                      type="email"
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="your.email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-teal-950/50 border border-teal-700/60 text-sm text-cream-50 placeholder-cream-600 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition disabled:opacity-50"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-coral-300 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1">
                    Subject <span className="text-coral-400">*</span>
                  </label>
                  <input
                    type="text"
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-teal-950/50 border border-teal-700/60 text-sm text-cream-50 placeholder-cream-600 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition disabled:opacity-50"
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-coral-300 mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-cream-300 mb-1">
                    Message <span className="text-coral-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Your message..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-teal-950/50 border border-teal-700/60 text-sm text-cream-50 placeholder-cream-600 focus:outline-none focus:border-coral-500 focus:ring-1 focus:ring-coral-500 transition resize-none disabled:opacity-50"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-coral-300 mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-coral-500 hover:bg-coral-600 active:bg-coral-700 disabled:opacity-60 text-cream-50 font-semibold text-sm transition shadow-lg shadow-coral-500/25 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cream-50" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-cream-50" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};
