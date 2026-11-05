"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactDispatchForm() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Next.js Platform",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({
        name: "",
        email: "",
        projectType: "Full-Stack Next.js Platform",
        message: "",
      });
    }, 400);
  };

  return (
    <div
      className="h-full rounded-2xl bg-white brutal-card p-7"
      data-interactive="true"
    >
      {contactSubmitted ? (
        <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center p-6">
          <div className="w-14 h-14 rounded-xl bg-[#4ADE80] border-[2.5px] border-zinc-950 shadow-[4px_4px_0px_#09090b] flex items-center justify-center text-zinc-950 mb-4">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-zinc-950 mb-2">
            Message Sent!
          </h3>
          <p className="text-sm font-medium text-zinc-700 max-w-md mb-6">
            Thank you for reaching out. Peerapat will get back to you shortly.
          </p>
          <button
            type="button"
            onClick={() => setContactSubmitted(false)}
            className="brutal-btn px-4 py-2 rounded-xl bg-[#FDE047] font-mono text-xs font-black text-zinc-950 cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-black text-zinc-950 uppercase mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                placeholder="Alex Mercer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF7] border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b] focus:bg-[#FEF9C3] focus:outline-none text-sm font-mono font-bold text-zinc-950"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-black text-zinc-950 uppercase mb-1.5">
                Your Email
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                placeholder="alex@studio.dev"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF7] border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b] focus:bg-[#FEF9C3] focus:outline-none text-sm font-mono font-bold text-zinc-950"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-black text-zinc-950 uppercase mb-1.5">
              Project Scope
            </label>
            <select
              value={contactForm.projectType}
              onChange={(e) =>
                setContactForm({ ...contactForm, projectType: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF7] border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b] focus:outline-none text-sm font-mono font-bold text-zinc-950"
            >
              <option>Full-Stack Next.js Platform</option>
              <option>Interactive Neo-Brutalist Web App</option>
              <option>Design System & UI Engineering</option>
              <option>Full-Stack / Creative Dev Role</option>
            </select>
          </div>

          <div>
            <label className="block font-mono text-xs font-black text-zinc-950 uppercase mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              required
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              placeholder="Tell me about your project or opportunity..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFDF7] border-[2.5px] border-zinc-950 shadow-[3px_3px_0px_#09090b] focus:bg-[#FEF9C3] focus:outline-none text-sm font-mono font-bold text-zinc-950 resize-none"
            />
          </div>

          <button
            type="submit"
            className="brutal-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4ADE80] text-zinc-950 font-mono text-xs font-black uppercase tracking-wider cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </div>
  );
}

