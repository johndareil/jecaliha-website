import { useState } from "react";
import { Send, CircleCheck } from "lucide-react";
import { COMPANY, SERVICE_OPTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

const EMPTY = { name: "", email: "", phone: "", service: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!form.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  if (!form.phone.trim()) errors.phone = "Please enter your phone number.";
  if (!form.service) errors.service = "Please select the service you need.";
  if (!form.message.trim()) errors.message = "Please tell us about your project.";
  return errors;
}

const inputBase =
  "w-full rounded-lg border bg-white/[0.04] px-4 py-3 text-sm text-pearl placeholder:text-pearl/35 outline-none transition-colors duration-300 focus:border-gold focus:ring-1 focus:ring-gold/60";

export default function ContactForm({ id = "contact-form" }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject = `Free Quote Request — ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Phone Number: ${form.phone.trim()}`,
      `Services Needed: ${form.service}`,
      "",
      "Project details:",
      form.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const fieldClass = (field) =>
    cn(inputBase, errors[field] ? "border-red-500 ring-1 ring-red-500/60" : "border-white/12");

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name} htmlFor={`${id}-name`}>
          <input
            id={`${id}-name`}
            type="text"
            value={form.name}
            onChange={update("name")}
            placeholder="Juan Dela Cruz"
            className={fieldClass("name")}
          />
        </Field>
        <Field label="Email Address" error={errors.email} htmlFor={`${id}-email`}>
          <input
            id={`${id}-email`}
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@email.com"
            className={fieldClass("email")}
          />
        </Field>
        <Field label="Phone Number" error={errors.phone} htmlFor={`${id}-phone`}>
          <input
            id={`${id}-phone`}
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="0917 000 0000"
            className={fieldClass("phone")}
          />
        </Field>
        <Field label="Services Needed" error={errors.service} htmlFor={`${id}-service`}>
          <select
            id={`${id}-service`}
            value={form.service}
            onChange={update("service")}
            className={cn(fieldClass("service"), "appearance-none")}
          >
            <option value="" className="bg-basalt">
              Select a service
            </option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-basalt">
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Project Details" error={errors.message} htmlFor={`${id}-message`}>
        <textarea
          id={`${id}-message`}
          rows={5}
          value={form.message}
          onChange={update("message")}
          placeholder="Tell us about your lot, timeline, and what you'd like to build."
          className={cn(fieldClass("message"), "resize-none")}
        />
      </Field>

      <div className="space-y-4">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3.5 font-heading text-xs font-semibold uppercase tracking-[0.18em] text-basalt transition-all duration-300 hover:bg-gold-soft hover:shadow-gold-glow"
        >
          <Send className="h-4 w-4" />
          Send Message
        </button>
        {sent && (
          <p className="flex items-center gap-2 text-sm text-gold">
            <CircleCheck className="h-4 w-4" />
            Validation passed — your email app is opening with the request.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({ label, error, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-pearl/70"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs font-medium text-red-400">{error}</p>}
    </div>
  );
}