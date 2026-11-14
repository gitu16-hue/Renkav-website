import Link from "next/link";
export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="RENKAV Technologies homepage"
      className="inline-flex items-center gap-3 group"
    >
      <span
        className={`relative inline-flex h-10 w-10 items-center justify-center rounded-md border ${inverse ? "border-white/20 bg-white/10" : "border-[#0d141e]/20 bg-[#0d141e]"}`}
        aria-hidden="true"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path
            d="M4 21V5h9c4.6 0 7 2.2 7 6.1 0 2.3-1.1 3.9-3.1 4.9L22 21h-5.1l-4.4-4.6H8.3V21H4Zm4.3-8.3h4.6c1.8 0 2.7-.6 2.7-1.9s-.9-1.9-2.7-1.9H8.3v3.8Z"
            fill="#a2e5d0"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <strong
          className={`text-[18px] font-black tracking-[.18em] ${inverse ? "text-white" : "text-[#0d141e]"}`}
        >
          RENKAV
        </strong>
        <small
          className={`mt-[6px] text-[8px] font-bold tracking-[.34em] ${inverse ? "text-[#a2e5d0]" : "text-[#08766c]"}`}
        >
          TECHNOLOGIES
        </small>
      </span>
    </Link>
  );
}
