"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Send, CheckCircle2, AlertCircle, Github, Linkedin, Twitter, Award, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [btnText, setBtnText] = useState("Send Message");
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'sending' | null
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstname || !formData.email || !formData.message) {
      setStatus("error");
      setBtnText("Please fill out all required fields.");
      await sleep(2000);
      setBtnText("Send Message");
      setStatus(null);
      return;
    }

    try {
      setStatus("sending");
      setBtnText("Transmitting Data...");

      const mailBody = `${formData.firstname} ${formData.lastname}\n\nGmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      const sub = "Response from portfolio website";
      
      const payloadAdmin = {
        toMail: "karanyadav21398@gmail.com",
        subject: sub,
        massage: mailBody
      };

      const resAdmin = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadAdmin)
      });

      const responseTextUser = `Dear ${formData.firstname},\n\nThank you for taking the time to respond through my website. I truly appreciate you reaching out.\n\nI’m especially grateful for the advice you shared. Your insights are valuable and will definitely help me improve and move in the right direction.\n\nThank you once again for your support and guidance. I look forward to staying connected.\n\nWarm regards,\nKrishana Yadav`;
      
      const payloadUser = {
        toMail: formData.email,
        subject: "Thank You for Your Response",
        massage: responseTextUser
      };

      await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadUser)
      });

      setStatus("success");
      setBtnText("Message Sent Successfully!");
      setFormData({ firstname: "", lastname: "", email: "", message: "" });
      
      await sleep(3000);
      setBtnText("Send Message");
      setStatus(null);
    } catch (e) {
      console.error("Mail submission error:", e);
      setStatus("error");
      setBtnText("Transmission Failed");
      await sleep(3000);
      setBtnText("Send Message");
      setStatus(null);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-background">
      {/* Background spotlights */}
      <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-neutral-400">
            Let's Connect
          </h2>
          <div className="w-16 h-1 bg-indigo-500 rounded-full" />
          <p className="text-base text-muted-foreground font-sans font-light max-w-lg">
            Feel free to write a message or suggestion. I will respond to your queries as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left Column: Quick Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40 space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display tracking-tight text-foreground flex items-center gap-2">
                <Sparkles size={20} className="text-indigo-500" /> Let's Build Together
              </h3>
              <p className="text-sm font-sans font-light text-muted-foreground leading-relaxed">
                Whether you are looking to hire, discuss competitive coding problems, collaborate on a new project, or just share valuable advice - my inbox is always open.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-indigo-500">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground font-mono uppercase">Email Address</p>
                    <a href="mailto:karanyadav21398@gmail.com" className="text-sm font-semibold hover:text-indigo-500 transition-colors">
                      karanyadav21398@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Panel */}
            <div className="space-y-3 pt-6 border-t border-border/40">
              <p className="text-xs font-mono font-semibold text-indigo-500 uppercase tracking-widest">
                Digital Presence
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/krishnayadav9793"
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105 transition-all"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://codeforces.com/profile/krishna_yadav_"
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-105 transition-all"
                  aria-label="Codeforces Profile"
                >
                  <Award size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-neutral-100/60 dark:bg-neutral-900/50 border border-border/40 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 text-left">
                  <label htmlFor="firstname" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    First Name <span className="text-indigo-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 outline-none transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label htmlFor="lastname" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 outline-none transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Email Address <span className="text-indigo-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 outline-none transition-all placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-2 text-left">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  Message / Suggestions <span className="text-indigo-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write details of your message..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-border bg-background focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 outline-none transition-all placeholder:text-muted-foreground/50 resize-none"
                />
              </div>

              {/* Status Alert */}
              {status === "success" && (
                <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2 text-sm">
                  <CheckCircle2 size={16} />
                  <span>Success! Your response has been dispatched. Check inbox.</span>
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl flex items-center gap-2 text-sm">
                  <AlertCircle size={16} />
                  <span>Error processing request. Check inputs and try again.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 shadow-md ${
                  status === "sending"
                    ? "bg-neutral-300 dark:bg-neutral-800 text-muted-foreground cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer active:scale-[0.98]"
                }`}
              >
                <Send size={16} className={`${status === "sending" ? "animate-pulse" : ""}`} />
                {btnText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
