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
    <div className="max-w-[720px]">
      <p
        className={`eyebrow mb-6 ${light ? "text-[#a2e5d0]" : "text-[#08766c]"}`}
      >
        {kicker}
      </p>
      <h2 className={`heading ${light ? "text-white" : "text-[#0d141e]"}`}>
        {title}
      </h2>
      {description && (
        <p
          className={`mt-6 text-[16px] leading-8 ${light ? "text-[#c4d5dc]" : "text-[#566978]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
