import type { Metadata } from "next";
import { CanvasParticleField } from "@/components/canvas-particle-field";
import { PagePillNav } from "@/components/page-pill-nav";
import { DiagonalMarqueeRibbon } from "@/components/diagonal-marquee-ribbon";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this RENKAV website handles your information.",
};

export default function Privacy() {
  return (
    <>
      <PagePillNav />

      <section className="masthead relative overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <CanvasParticleField />
        <div className="container-main relative z-10">
          <p className="eyebrow text-[#a2e5d0] mb-5 sm:mb-6 entry-1">PRIVACY BY DESIGN</p>
          <h1 className="display text-balance text-white entry-2">
            <span className="font-reveal-line">
              <span className="font-reveal-inner">Clear about your data.</span>
            </span>
          </h1>
        </div>
      </section>

      <section className="section-pad bg-[#050505] text-white border-t border-white/10">
        <div className="container-main max-w-3xl! space-y-8 text-pretty">
          <div className="scroll-reveal rounded-3xl border border-white/10 bg-[#090d14] p-7 sm:p-9">
            <h2 className="subheading text-white mb-4 text-balance">
              Your inquiry stays with you
            </h2>
            <p className="text-[#9eb3be] leading-relaxed">
              The contact form prepares an email draft on your device. Form
              values are not uploaded to a RENKAV form backend or stored by this
              application. They remain on the page until you navigate away or
              reload. Your email application and provider handle any message you
              choose to send. Clipboard access happens only when you select
              “Copy draft.”
            </p>
          </div>
          <div className="scroll-reveal rounded-3xl border border-white/10 bg-[#090d14] p-7 sm:p-9" data-delay="1">
            <h2 className="subheading text-white mb-4">
              A minimal website
            </h2>
            <p className="text-[#9eb3be] leading-relaxed">
              This source includes no analytics, advertising trackers,
              third-party embeds, or tracking cookies. Fonts are served with the
              website. If you choose “Reduce motion,” the site saves that
              preference in your browser’s local storage. You can remove it
              through your browser’s site-data settings.
            </p>
          </div>
          <div className="scroll-reveal rounded-3xl border border-white/10 bg-[#090d14] p-7 sm:p-9" data-delay="2">
            <h2 className="subheading text-white mb-4">
              Hosting and email
            </h2>
            <p className="text-[#9eb3be] leading-relaxed">
              A hosting provider may process technical request data, such as IP
              addresses and access logs, to deliver the website. This source
              does not configure their retention policies. Email correspondence
              is handled separately from this website. Hosting details, the
              legal entity, and correspondence-retention terms must be confirmed
              before public launch.
            </p>
          </div>
          <div className="scroll-reveal rounded-3xl border border-white/10 bg-[#090d14] p-7 sm:p-9" data-delay="3">
            <h2 className="subheading text-white mb-4">Questions?</h2>
            <p className="text-[#9eb3be] leading-relaxed">
              Contact{" "}
              <a
                href="mailto:gitanshu@renkav.online"
                className="underline text-[#a2e5d0] hover:text-white break-all"
              >
                gitanshu@renkav.online
              </a>{" "}
              about this website or information you have shared by email.
            </p>
          </div>
        </div>
      </section>

      <DiagonalMarqueeRibbon />
    </>
  );
}
