import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy",
  description: "How this RENKAV website handles your information.",
};
export default function Privacy() {
  return (
    <>
      <section className="masthead">
        <div className="container-main">
          <p className="eyebrow text-[#9fe4cd] mb-5 sm:mb-6 entry-1">PRIVACY BY DESIGN</p>
          <h1 className="display text-balance entry-2">
            <span className="font-reveal-line">
              <span className="font-reveal-inner">Clear about your data.</span>
            </span>
          </h1>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-main max-w-3xl! space-y-8 bodycopy text-pretty">
          <div className="scroll-reveal">
            <h2 className="subheading text-[#12243d] mb-4 text-balance">
              Your inquiry stays with you
            </h2>
            <p>
              The contact form prepares an email draft on your device. Form
              values are not uploaded to a RENKAV form backend or stored by this
              application. They remain on the page until you navigate away or
              reload. Your email application and provider handle any message you
              choose to send. Clipboard access happens only when you select
              “Copy draft.”
            </p>
          </div>
          <div className="scroll-reveal" data-delay="1">
            <h2 className="subheading text-[#12243d] mb-4">
              A minimal website
            </h2>
            <p>
              This source includes no analytics, advertising trackers,
              third-party embeds, or tracking cookies. Fonts are served with the
              website. If you choose “Reduce motion,” the site saves that
              preference in your browser’s local storage. You can remove it
              through your browser’s site-data settings.
            </p>
          </div>
          <div className="scroll-reveal" data-delay="2">
            <h2 className="subheading text-[#12243d] mb-4">
              Hosting and email
            </h2>
            <p>
              A hosting provider may process technical request data, such as IP
              addresses and access logs, to deliver the website. This source
              does not configure their retention policies. Email correspondence
              is handled separately from this website. Hosting details, the
              legal entity, and correspondence-retention terms must be confirmed
              before public launch.
            </p>
          </div>
          <div className="scroll-reveal" data-delay="3">
            <h2 className="subheading text-[#12243d] mb-4">Questions?</h2>
            <p>
              Contact{" "}
              <a
                href="mailto:gitanshu@renkav.online"
                className="underline break-all"
              >
                gitanshu@renkav.online
              </a>{" "}
              about this website or information you have shared by email.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
