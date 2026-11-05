"use client";

import React, { useState } from "react";
import { Code2, Mail, Copy, Check, Globe } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SwarmBuildBlock } from "../swarm/SwarmBuildBlock";
import { ContactDispatchForm } from "./ContactDispatchForm";

export function ContactSection() {
  const { profile } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SwarmBuildBlock
          id="contact-info-panel"
          label="SECTION_05 // CONTACT"
          accentColor="#FDE047"
          className="lg:col-span-5"
        >
          <div className="h-full rounded-xl bg-white brutal-card p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#FDE047] border border-zinc-900 shadow-[2px_2px_0px_#18181b] font-mono text-xs font-bold uppercase mb-3.5">
                <Mail className="w-3.5 h-3.5" />
                <span>05 // INITIALIZE COLLABORATION</span>
              </div>
              <h2 className="text-2xl font-extrabold text-zinc-950 mb-2">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                Open for full-stack engineering roles, freelance contracts, and
                creative interactive web platforms. Feel free to connect directly.
              </p>

              <div
                className="p-3.5 rounded-lg bg-[#FAF8F5] border border-zinc-900 shadow-[2px_2px_0px_#18181b] mb-4 flex items-center justify-between gap-2"
                data-interactive="true"
              >
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-zinc-500 uppercase">
                    Direct Email
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-bold text-zinc-900 truncate">
                    {profile.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="brutal-btn px-2.5 py-1 rounded bg-[#FDE047] text-zinc-900 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div
              className="pt-4 border-t-2 border-zinc-900 flex flex-wrap items-center gap-2.5"
              data-interactive="true"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-white font-mono text-xs font-bold text-zinc-900"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>GitHub (@Bangnus)</span>
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-md bg-[#FAF8F5] font-mono text-xs font-bold text-zinc-900"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>IG (@anxs_ov)</span>
              </a>
            </div>
          </div>
        </SwarmBuildBlock>

        <SwarmBuildBlock
          id="contact-form-panel"
          label="DISPATCH_FORM"
          accentColor="#FDE047"
          className="lg:col-span-7"
        >
          <ContactDispatchForm />
        </SwarmBuildBlock>
      </div>
    </section>
  );
}
