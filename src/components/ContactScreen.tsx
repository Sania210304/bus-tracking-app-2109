import React, { useState } from 'react';
import { TopAppBar } from './TopAppBar';

export const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'College Fleet Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F9F7F2] text-[#1A1A1A] font-['Hanken_Grotesk'] antialiased min-h-screen pt-16 pb-24">
      <TopAppBar title="Contact & Deploy" />

      <main className="flex flex-col gap-6 px-margin-mobile mt-6 max-w-3xl mx-auto">
        {/* Editorial Subheader Metadata */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-2 text-[11px] font-['JetBrains_Mono'] uppercase tracking-[0.2em] text-[#1A1A1A]/60">
          <span>VOL. 04 / COMMUNICATIONS</span>
          <span>SYSTEM INQUIRIES</span>
        </div>

        {/* Profile Card Header */}
        <div className="bg-[#E5E2DA] p-6 border border-[#1A1A1A]/15 shadow-sm flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-16 h-16 bg-[#1A1A1A] text-[#F9F7F2] font-['Playfair_Display'] font-bold text-2xl flex items-center justify-center border border-[#1A1A1A] shadow-md">
            PE
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-['Playfair_Display',serif] italic font-bold text-[#1A1A1A]">
              Precision Engineering
            </h3>
            <p className="text-xs font-['JetBrains_Mono'] uppercase tracking-wider text-[#1A1A1A]/70 mt-0.5">
              Custom Transport Logistics & Desktop Engineering
            </p>
            <p className="text-sm text-[#1A1A1A] mt-2 leading-relaxed">
              Have questions about deploying the College Bus Tracking System on your campus? Send us a message below.
            </p>
          </div>
        </div>

        {/* Form or Confirmation */}
        <div className="bg-[#EAE7E0] p-6 border border-[#1A1A1A]/15 shadow-sm">
          {submitted ? (
            <div className="py-8 text-center space-y-4 font-['JetBrains_Mono']">
              <div className="w-14 h-14 bg-[#1A1A1A] text-[#F9F7F2] border border-[#1A1A1A] flex items-center justify-center mx-auto text-2xl">
                <span className="material-symbols-outlined icon-fill-1 text-[28px]">check_circle</span>
              </div>
              <h3 className="text-2xl font-['Playfair_Display',serif] italic font-bold text-[#1A1A1A]">
                Inquiry Transmitted
              </h3>
              <p className="text-xs text-[#1A1A1A]/80 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.name}. Your message regarding "{formData.subject}" has been queued in our system log.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', organization: '', subject: 'College Fleet Inquiry', message: '' });
                }}
                className="mt-4 px-6 py-3 bg-[#1A1A1A] text-[#F9F7F2] text-xs font-['JetBrains_Mono'] uppercase tracking-[0.2em] font-bold hover:bg-[#333333] transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-['Hanken_Grotesk']">
              <h3 className="font-['JetBrains_Mono'] text-xs font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b border-[#1A1A1A]/15 pb-2">
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Project Inquiry & System Feedback</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 font-bold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Alex Vance"
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-['Hanken_Grotesk']"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@university.edu"
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-['Hanken_Grotesk']"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 font-bold">
                    Organization / College
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. State University Transport"
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-['Hanken_Grotesk']"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 font-bold">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 px-3.5 py-2.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-['Hanken_Grotesk'] cursor-pointer"
                  >
                    <option value="College Fleet Inquiry">College Fleet Inquiry</option>
                    <option value="Python System Integration">Python System Integration</option>
                    <option value="SQLite Data Logging">SQLite Data Logging</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5 font-bold">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your requirements or feedback..."
                  className="w-full bg-[#F9F7F2] border border-[#1A1A1A]/20 p-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] font-['Hanken_Grotesk'] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A1A1A] hover:bg-[#333333] text-[#F9F7F2] py-3.5 px-6 font-['JetBrains_Mono'] text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Submit Transmission</span>
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};
