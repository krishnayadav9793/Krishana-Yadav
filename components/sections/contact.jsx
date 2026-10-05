"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  Award,
  Sparkles,
  Copy,
  Check,
  Terminal,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import MagneticButton from "@/components/ui/magnetic-button";

export default function ContactSection() {
  const [btnText, setBtnText] = useState("Transmit Message");
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'sending' | null
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("karanyadav21398@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstname || !formData.email || !formData.message) {
      setStatus("error");
      setBtnText("Please fill out all required fields.");
      await sleep(2000);
      setBtnText("Transmit Message");
      setStatus(null);
      return;
    }

    try {
      setStatus("sending");
      setBtnText("Transmitting Protocol...");

      const mailBody = `${formData.firstname} ${formData.lastname}\n\nGmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const sub = "Response from portfolio website";

      const payloadAdmin = {
        toMail: "karanyadav21398@gmail.com",
        subject: sub,
        massage: mailBody,
      };

      await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadAdmin),
      });

      const responseTextUser = `Dear ${formData.firstname},\n\nThank you for taking the time to respond through my website. I truly appreciate you reaching out.\n\nI’m especially grateful for the advice you shared. Your insights are valuable and will definitely help me improve and move in the right direction.\n\nThank you once again for your support and guidance. I look forward to staying connected.\n\nWarm regards,\nKrishana Yadav`;

      const payloadUser = {
        toMail: formData.email,
        subject: "Thank You for Your Response",
        massage: responseTextUser,
      };

      await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadUser),
      });

      setStatus("success");
      setBtnText("Message Dispatched Successfully!");
      setFormData({ firstname: "", lastname: "", email: "", message: "" });

      await sleep(3500);
      setBtnText("Transmit Message");
      setStatus(null);
    } catch (err) {
      console.error("Mail submission error:", err);
      setStatus("error");
      setBtnText("Transmission Failed");
      await sleep(3000);
      setBtnText("Transmit Message");
      setStatus(null);
    }
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-background text-foreground border-t border-black/[0.04] dark:border-white/[0.04] transition-colors duration-300">
      {/* Background Lighting */}
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-indigo-500/[0.04] to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-indigo-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <SectionHeader
          badge="06 // TRANSMISSION & NETWORK"
          title="Let's Connect"
          description="Feel free to write a message or suggestion. I will respond to your queries as soon as possible."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info & Social Presence (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-[0_12px_32px_rgba(15,23,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-left space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                <span>OPEN FOR OPPORTUNITIES</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                <Sparkles size={22} className="text-indigo-600 dark:text-indigo-400" />
                <span>Let's Build Together</span>
              </h3>

              <p className="text-sm font-sans font-light text-slate-600 dark:text-neutral-300 leading-relaxed">
                Whether you are looking to hire, discuss competitive coding problems, collaborate on a new project, or just share valuable advice - my inbox is always open.
              </p>

              {/* Direct Clickable Email Card with Copy Action */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono uppercase tracking-wider">Email Address</p>
                      <a
                        href="mailto:karanyadav21398@gmail.com"
                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors font-mono"
                      >
                        karanyadav21398@gmail.com
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-xl bg-white dark:bg-white/[0.04] hover:bg-slate-100 dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check size={14} className="text-emerald-500 dark:text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Preserved Social Presence Badges */}
            <div className="space-y-3 pt-6 border-t border-slate-200/80 dark:border-white/[0.06]">
              <p className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-widest">
                Digital Presence
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://github.com/krishnayadav9793"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={14} />
                  <span>Twitter</span>
                </a>

                <a
                  href="https://codeforces.com/profile/krishna_yadav_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.03] hover:bg-slate-200 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
                  aria-label="Codeforces Profile"
                >
                  <Award size={14} />
                  <span>Codeforces</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-tech Engineering Message Console (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-white dark:bg-[#090a12]/80 border border-slate-200/80 dark:border-white/[0.08] shadow-[0_12px_32px_rgba(15,23,42,0.04)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.5)] text-left"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200/80 dark:border-white/[0.06] font-mono text-xs text-slate-500 dark:text-neutral-400">
              <span className="flex items-center gap-2 text-slate-900 dark:text-white font-semibold">
                <Terminal size={14} className="text-indigo-600 dark:text-indigo-400" />
                SECURE_TRANSMIT_CONSOLE
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">STATUS: IDLE</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="firstname" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-medium">
                    First Name <span className="text-indigo-600 dark:text-indigo-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#050507] text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#050507] focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-600 dark:focus:ring-indigo-400 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="lastname" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#050507] text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#050507] focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-600 dark:focus:ring-indigo-400 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-medium">
                  Email Address <span className="text-indigo-600 dark:text-indigo-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#050507] text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#050507] focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-600 dark:focus:ring-indigo-400 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-medium">
                  Message / Suggestions <span className="text-indigo-600 dark:text-indigo-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write details of your message..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#050507] text-slate-900 dark:text-white focus:bg-white dark:focus:bg-[#050507] focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-1 focus:ring-indigo-600 dark:focus:ring-indigo-400 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-neutral-600 resize-none"
                />
              </div>

              {/* Status Notifications */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2 text-xs font-mono"
                >
                  <CheckCircle2 size={16} />
                  <span>Success! Your response has been dispatched. Check your inbox.</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center gap-2 text-xs font-mono"
                >
                  <AlertCircle size={16} />
                  <span>Error processing request. Check inputs and try again.</span>
                </motion.div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md ${
                  status === "sending"
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white cursor-pointer active:scale-[0.99] shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                }`}
              >
                <Send size={15} className={status === "sending" ? "animate-pulse" : ""} />
                <span>{btnText}</span>
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
