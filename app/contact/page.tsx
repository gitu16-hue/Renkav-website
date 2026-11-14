import type { Metadata } from "next";
import { Mail, ArrowUpRight, ShieldAlert } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RENKAV Technologies about ELEVEN, partnerships, research or general business inquiries.",
};

const prompts = [
  {
    title: "Product inquiry.",
    detail:
      "Tell us what you’re trying to accomplish, how you do it today, and what gets in the way.",
  },
  {
    title: "Partnership or research.",
    detail:
      "Tell us who you are and what you’d like to explore together.",
  },
  {
    title: "Investor or incubator inquiry.",
    detail:
      "Share your organization and the kind of conversation you have in mind.",
  },
];

export default function Contact() {
  return (
    <>
      <section className="masthead">
        <div className="container-main relative z-10">
          <div className="entry-1">
            <p className="eyebrow text-[#a2e5d0] mb-6 flex items-center gap-2">
              <span className="status-dot" aria-hidden="true" />
              <span>CONTACT RENKAV</span>
            </p>
          </div>
          <h1 className="display entry-2 max-w-[820px]">Let’s talk.</h1>
          <p className="entry-3 mt-7 text-[#c4d5dc] max-w-2xl text-lg leading-8">
            Get in touch about ELEVEN, a potential partnership, or a general
            business inquiry.
          </p>
        </div>
      </section>

      <section className="section-pad bg-[#f8faf7]">
        <div className="container-main grid lg:grid-cols-[.88fr_1.12fr] gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow text-[#08766c] mb-4">DIRECT CONTACT</p>
            <h2 className="subheading text-[#0d141e]">Reach us by email.</h2>
            <a
              href="mailto:gitanshu@renkav.online"
              className="mt-6 inline-flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#e2e8e3] hover:border-[#08766c] transition-colors group shadow-sm"
            >
              <span className="w-11 h-11 rounded-lg bg-[#eef7f3] flex items-center justify-center text-[#08766c] shrink-0">
                <Mail size={20} aria-hidden="true" />
              </span>
              <span className="text-sm md:text-base font-bold text-[#0d141e] group-hover:text-[#08766c] break-all">
                Email Gitanshu · gitanshu@renkav.online{" "}
                <ArrowUpRight
                  size={15}
                  className="inline"
                  aria-hidden="true"
                />
              </span>
            </a>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#0d141e] mb-4">
                What to include
              </h3>
              <div className="space-y-4">
                {prompts.map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border border-[#e2e8e3] rounded-xl p-5 shadow-sm"
                  >
                    <p className="text-sm font-bold text-[#0d141e]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[#566978] leading-6 mt-1">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border border-[#d4e3dc] bg-[#edf5f0] rounded-xl p-5 flex gap-3.5 items-start">
              <ShieldAlert
                color="#08766c"
                size={20}
                className="shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-xs leading-6 text-[#334e59]">
                Please don’t include passwords, confidential files or sensitive
                customer information.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
