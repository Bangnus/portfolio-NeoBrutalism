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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        <SwarmBuildBlock
          id="contact-info-panel"
          label="SECTION_05 // CONTACT"
          accentColor="#FDE047"
          className="lg:col-span-5"
        >
          <div className="h-full rounded-2xl bg-[#FDE047] brutal-card p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-zinc-950 shadow-[2px_2px_0px_#09090b] font-mono text-xs font-black uppercase mb-4">
                <Mail className="w-4 h-4" />
                <span>05 // INITIALIZE COLLABORATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 mb-3">
                Let&apos;s Build Something Extraordinary.
              </h2>
              <p className="text-sm font-medium text-zinc-800 leading-relaxed mb-6">
                Whether you need a bold Neo-Brutalist web experience or a
                full-stack Next.js platform—reach out directly below.
              </p>

              <div
                className="p-4 rounded-xl bg-white border-[2.5px] border-zinc-950 shadow-[4px_4px_0px_#09090b] mb-4 flex items-center justify-between gap-2"
                data-interactive="true"
              >
                <div className="min-w-0">
                  <div className="font-mono text-[10px] font-bold text-zinc-500 uppercase">
                    Direct Email
                  </div>
                  <div className="font-mono text-sm font-black text-zinc-950 truncate">
                    {profile.email}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="brutal-btn px-3 py-1.5 rounded-lg bg-[#4ADE80] text-zinc-950 font-mono text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0"
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
              className="pt-4 border-t-[2.5px] border-zinc-950 flex flex-wrap items-center gap-3"
              data-interactive="true"
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white font-mono text-xs font-black text-zinc-950"
              >
                <Code2 className="w-4 h-4" />
                <span>GitHub (@Bangnus)</span>
              </a>
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FF5E5B] font-mono text-xs font-black text-white"
              >
                <Globe className="w-4 h-4" />
                <span>IG (@anxs_ov)</span>
              </a>
            </div>
          </div>
        </SwarmBuildBlock>

        <SwarmBuildBlock
          id="contact-form-panel"
          label="DISPATCH_FORM"
          accentColor="#38BDF8"
          className="lg:col-span-7"
        >
          <ContactDispatchForm />
        </SwarmBuildBlock>
      </div>
    </section>
  );
}
