"use client";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Mail } from "lucide-react";

const topics = [
  "General inquiry",
  "ELEVEN",
  "Partnership or research",
  "Investor or incubator inquiry",
];

const address = "gitanshu@renkav.online";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field =
  "mt-2 w-full border border-[#c6d6cc] rounded-lg p-3.5 text-base font-normal bg-[#fbfcfb]";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const draftField = useRef<HTMLTextAreaElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const nextErrors: FieldErrors = {};
    if (!name.trim()) {
      nextErrors.name = "Enter your name.";
    }
    if (!email.trim() || !emailPattern.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!message.trim()) {
      nextErrors.message = "Enter a message.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = nextErrors.name
        ? "name"
        : nextErrors.email
          ? "email"
          : "message";
      (
        event.currentTarget.elements.namedItem(firstInvalid) as HTMLElement
      )?.focus();
      return;
    }

    setErrors({});
    const subject = `RENKAV website inquiry — ${topic}`;
    const body = `Name: ${name.trim()}\nReply-to: ${email.trim()}\nInquiry type: ${topic}\n\n${message.trim()}`;
    setDraft(`To: ${address}\nSubject: ${subject}\n\n${body}`);
    const href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (href.length > 1800) {
      setStatus(
        "Your draft is ready below. It is too long for reliable email-app links. Copy it into a new email; nothing has been submitted through this website.",
      );
      return;
    }
    setStatus(
      "Opening a draft in your email app. Nothing is submitted through this website. Review and send the message in your email app.",
    );
    window.location.href = href;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus(
        "Draft copied. Paste it into your email app, review it, and send when ready.",
      );
    } catch {
      draftField.current?.focus();
      draftField.current?.select();
      setStatus(
        "Automatic copying is unavailable. Your draft is selected below; use your device’s Copy command.",
      );
    }
  }

  return (
    <form
      className="soft-card p-6 md:p-10"
      onSubmit={submit}
      noValidate
      aria-describedby="contact-help"
      onChange={() => {
        if (draft) {
          setDraft("");
          setStatus("");
        }
      }}
    >
      <p className="eyebrow text-[#08766c] mb-3">EMAIL DRAFT</p>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#12243d] mb-3">
        Prepare an inquiry
      </h2>
      <p id="contact-help" className="text-sm leading-7 text-[#526477] mb-7">
        This opens a draft in your email app. Nothing is submitted through this
        website.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-semibold text-[#12243d]"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            value={name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Your full name"
            className={field}
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-semibold text-[#12243d]"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            required
            type="email"
            maxLength={254}
            autoComplete="email"
            value={email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="you@example.com"
            className={field}
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="field-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-topic"
          className="block text-sm font-semibold text-[#12243d]"
        >
          Inquiry type
        </label>
        <select
          id="contact-topic"
          name="topic"
          className={field}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="block text-sm font-semibold text-[#12243d]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? "contact-message-error message-count"
              : "message-count"
          }
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message)
              setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          maxLength={3500}
          rows={6}
          placeholder="Tell us about your workflow, question or inquiry…"
          className={`${field} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="field-error">
            {errors.message}
          </p>
        )}
        <p id="message-count" className="field-hint text-right">
          {message.length.toLocaleString()} / 3,500 characters
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-7">
        <button className="btn btn-dark" type="submit">
          Open email draft <ArrowUpRight size={17} aria-hidden="true" />
        </button>
        <span className="text-xs leading-6 text-[#526477] flex items-center gap-2">
          <Mail size={16} aria-hidden="true" /> This opens a draft in your email
          app. Nothing is submitted through this website.
        </span>
      </div>

      <p className="field-hint mt-4">
        If your email app doesn’t open, copy{" "}
        <a className="underline font-semibold text-[#12243d]" href={`mailto:${address}`}>
          {address}
        </a>{" "}
        and email us directly.
      </p>

      <p
        role="status"
        aria-live="polite"
        className={status ? "status-box mt-5" : "sr-only"}
      >
        {status}
      </p>

      {draft && (
        <div className="mt-5">
          <label
            htmlFor="contact-draft"
            className="block text-sm font-semibold text-[#12243d]"
          >
            Prepared draft
          </label>
          <textarea
            id="contact-draft"
            ref={draftField}
            readOnly
            value={draft}
            rows={8}
            className={field}
          />
          <button type="button" className="btn btn-outline mt-3" onClick={copy}>
            <Copy size={16} aria-hidden="true" /> Copy draft
          </button>
        </div>
      )}

      <noscript>
        <p className="field-hint mt-5">
          JavaScript is needed to prepare a draft. If your email app doesn’t
          open, copy{" "}
          <a className="underline" href={`mailto:${address}`}>
            {address}
          </a>{" "}
          and email us directly.
        </p>
      </noscript>
    </form>
  );
}
