import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Phone, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { AGENCY_INFO } from '../data/agencyData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    countryCode: '+1',
    phone: '',
    role: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please provide your name and email address.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#ec4899', '#3b82f6', '#10b981'],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 1200);
  };

  return (
    <section id="contact" className="pt-12 sm:pt-16 pb-24 sm:pb-32 relative bg-slate-100/70 dark:bg-[#0E091D]/90 border-t border-purple-200/60 dark:border-purple-900/30 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Proposal Request Form with Slide-Up on Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8 rounded-3xl glass-panel p-8 sm:p-12 border border-purple-200 dark:border-purple-500/25 shadow-xl relative"
          >
            <div className="mb-8 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
                Tell us about your project.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                  We'll send a tailored proposal.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-[1.618]">
                Itemized pricing, technical milestones, and realistic timelines within 24 hours.
              </p>
            </div>

            {status === 'success' ? (
              <div className="p-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-400/40 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Proposal Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-purple-200 max-w-md mx-auto leading-[1.618]">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.name}</span>. Our technical leads are reviewing your project scope and preparing your proposal for{' '}
                  <span className="font-mono text-purple-700 dark:text-purple-300">{formData.email}</span>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        subject: '',
                        email: '',
                        countryCode: '+1',
                        phone: '',
                        role: '',
                        service: '',
                        message: '',
                      });
                    }}
                    className="px-7 py-3 rounded-full bg-purple-100 dark:bg-purple-900/60 hover:bg-purple-200 dark:hover:bg-purple-800/80 border border-purple-300 dark:border-purple-500/40 text-xs font-semibold text-purple-900 dark:text-white tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-500/50 text-red-700 dark:text-red-200 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Your name: <span className="text-fuchsia-600 dark:text-fuchsia-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Subject:
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Replatforming Shopify Store & Scaling Ads"
                    className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Your email: <span className="text-fuchsia-600 dark:text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Phone number:
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="px-3.5 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-800 dark:text-purple-200 text-sm focus:outline-none focus:border-purple-400 cursor-pointer font-mono shadow-xs"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+880">🇧🇩 +880</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+41">🇨🇭 +41</option>
                        <option value="+49">🇩🇪 +49</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 555-0199"
                        className="flex-grow px-4 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 font-mono shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Role and Service Dropdowns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Your role:
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-400 cursor-pointer shadow-xs"
                    >
                      <option value="">Select an option</option>
                      <option value="Founder / CEO">Founder / CEO</option>
                      <option value="Marketing Director">Marketing Director / CMO</option>
                      <option value="E-Commerce Manager">E-Commerce Manager</option>
                      <option value="CTO / Tech Lead">CTO / Technical Lead</option>
                      <option value="Operations Manager">Operations / Product Manager</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Service interest:
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-400 cursor-pointer shadow-xs"
                    >
                      <option value="">Select an option</option>
                      <option value="Web Design & Development">Web Design & Development</option>
                      <option value="Shopify Store Design">Shopify Store Design & Development</option>
                      <option value="Custom Software">Custom Software Solutions</option>
                      <option value="SEO, AEO & GEO">SEO, AEO & GEO</option>
                      <option value="Agentic SEO">Agentic SEO</option>
                      <option value="PPC Advertising">PPC Advertising (Google Ads)</option>
                      <option value="Meta Ads">Meta Ads (Facebook & Instagram)</option>
                      <option value="Full-Funnel Growth">Full-Funnel Joined-Up Plan</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Your message (optional):
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your brand, current timeline, and specific goals..."
                    className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-[#120B24] border border-purple-200 dark:border-purple-500/25 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none shadow-xs"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="glow-pill-btn px-9 py-4 rounded-full text-white text-xs font-bold tracking-widest uppercase inline-flex items-center gap-2 group cursor-pointer disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>PREPARING PROPOSAL...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT PROPOSAL REQUEST</span>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Client Quote Card & Direct Contact Channels with Slide-Up on Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 space-y-8"
          >
            {/* Client Quote Card */}
            <div className="rounded-3xl glass-panel p-9 border border-purple-200 dark:border-purple-500/25 relative overflow-hidden group shadow-lg">
              <div className="text-xs font-semibold tracking-wider text-purple-700 dark:text-purple-400 uppercase mb-6 flex items-center justify-between">
                <span>Client Result</span>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/30">
                  Verified Result
                </span>
              </div>

              {/* Avatar "A" */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-md mx-auto mb-5">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0B0716] flex items-center justify-center">
                  <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-300 dark:to-pink-300">
                    A
                  </span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-[1.618] text-center italic mb-6">
                "From SEO to paid media, Error Sync handles everything for us. Our monthly qualified leads have doubled since launch."
              </blockquote>

              <div className="text-center pt-5 border-t border-purple-200/60 dark:border-purple-900/40">
                <div className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                  Abdullah Shoaib
                </div>
                <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                  CEO, Energy Solutions
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="rounded-2xl glass-panel p-7 border border-purple-200 dark:border-purple-500/20 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300">
                Direct Channels & Availability
              </h4>

              <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
                <a
                  href={`mailto:${AGENCY_INFO.contact.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/30 hover:border-purple-400 hover:text-purple-700 dark:hover:text-white transition-all"
                >
                  <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  <span className="font-mono">{AGENCY_INFO.contact.email}</span>
                </a>

                <a
                  href="tel:+13322812151"
                  className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/30 hover:border-purple-400 hover:text-purple-700 dark:hover:text-white transition-all"
                >
                  <Phone className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400 shrink-0" />
                  <span className="font-mono">{AGENCY_INFO.contact.phones[1].display} (US)</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
