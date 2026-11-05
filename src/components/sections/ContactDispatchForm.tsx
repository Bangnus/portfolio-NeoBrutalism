"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactDispatchForm() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    projectType: "Full-Stack Web Platform",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({
        name: "",
        email: "",
        projectType: "Full-Stack Web Platform",
        message: "",
      });
    }, 400);
  };

  return (
    <div
      className="h-full rounded-xl bg-white brutal-card p-6 sm:p-7"
      data-interactive="true"
    >
      {contactSubmitted ? (
        <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center p-6">
          <div className="w-12 h-12 rounded-lg bg-[#FDE047] border-2 border-zinc-900 shadow-[3px_3px_0px_#18181b] flex items-center justify-center text-zinc-950 mb-3.5">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-zinc-950 mb-1.5">
            Message Sent Successfully
          </h3>
          <p className="text-sm text-zinc-600 max-w-sm mb-5">
            Thank you for reaching out. Peerapat will review your message and
            respond shortly.
          </p>
          <button
            type="button"
            onClick={() => setContactSubmitted(false)}
            className="brutal-btn px-4 py-2 rounded-md bg-[#FDE047] font-mono text-xs font-bold text-zinc-900 cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs font-bold text-zinc-800 uppercase mb-1.5">
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
                className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-zinc-900 shadow-[2px_2px_0px_#18181b] focus:bg-white focus:outline-none text-sm font-medium text-zinc-900"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-bold text-zinc-800 uppercase mb-1.5">
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
                className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-zinc-900 shadow-[2px_2px_0px_#18181b] focus:bg-white focus:outline-none text-sm font-medium text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-xs font-bold text-zinc-800 uppercase mb-1.5">
              Project Scope
            </label>
            <select
              value={contactForm.projectType}
              onChange={(e) =>
                setContactForm({ ...contactForm, projectType: e.target.value })
              }
              className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-zinc-900 shadow-[2px_2px_0px_#18181b] focus:bg-white focus:outline-none text-sm font-medium text-zinc-900 cursor-pointer"
            >
              <option>Full-Stack Web Platform</option>
              <option>Frontend / Next.js Development</option>
              <option>Interactive UI & Web App</option>
              <option>Full-Stack Engineering Role</option>
            </select>
          </div>

          <div>
            <label className="block font-mono text-xs font-bold text-zinc-800 uppercase mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              required
              value={contactForm.message}
              onChange={(e) =>
                setContactForm({ ...contactForm, message: e.target.value })
              }
              placeholder="Tell me about your project, timeline, or opportunity..."
              className="w-full px-3 py-2 rounded-lg bg-[#FAF8F5] border border-zinc-900 shadow-[2px_2px_0px_#18181b] focus:bg-white focus:outline-none text-sm font-medium text-zinc-900 resize-none"
            />
          </div>

          <button
            type="submit"
            className="brutal-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#FDE047] text-zinc-900 font-mono text-xs font-bold uppercase cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>
        </form>
      )}
    </div>
  );
}
