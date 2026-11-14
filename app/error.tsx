"use client";
import Link from "next/link";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-pad">
      <div className="container-main max-w-3xl!">
        <p className="eyebrow text-[#0b8071] mb-6">LET’S TRY AGAIN</p>
        <h1 className="heading">This page couldn’t load.</h1>
        <p className="bodycopy mt-6">
          Please try again, or return to the homepage.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <button type="button" className="btn btn-dark" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
