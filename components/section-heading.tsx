import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  description,
  light = false,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-[760px] scroll-reveal split">
      <p
        className={`eyebrow s-overline mb-4 sm:mb-5 ${
          light ? "text-[#a2e5d0]" : "text-[#08766c]"
        }`}
      >
        <span className="line">
          <span className="line-inner">{kicker}</span>
        </span>
      </p>
      <h2
        className={`heading split-title text-balance ${
          light ? "text-white" : "text-[#0d141e]"
        }`}
      >
        <span className="line">
          <span className="line-inner">{title}</span>
        </span>
      </h2>
      {description && (
        <p
          className={`mt-4 sm:mt-5 text-[16px] md:text-[17px] leading-[1.7] text-pretty max-w-[65ch] split-text ${
            light ? "text-[#c4d5dc]" : "text-[#566978]"
          }`}
        >
          <span className="line">
            <span className="line-inner">{description}</span>
          </span>
        </p>
      )}
    </div>
  );
}
