import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="py-36 container-main text-center">
      <p className="eyebrow text-[#08766c] mb-6">404 · PAGE NOT FOUND</p>
      <h1 className="heading">Page not found.</h1>
      <p className="bodycopy mt-5 mb-9 max-w-xl mx-auto">
        The page you’re looking for may have moved or doesn’t exist.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn btn-dark">
          <ArrowLeft size={17} aria-hidden="true" /> Back to RENKAV
        </Link>
        <Link href="/ventures" className="btn btn-outline">
          Explore ELEVEN <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
