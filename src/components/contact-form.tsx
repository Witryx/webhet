"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import {
  contactSchema,
  fieldErrors,
  projectTypes,
  budgets,
  timelines,
  type ContactErrors,
} from "@/lib/validation";

export function ContactForm({
  defaultType = "",
  defaultPackage = "",
}: {
  defaultType?: string;
  defaultPackage?: string;
}) {
  const form = useRef<HTMLFormElement>(null);
  const alert = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  function focusFirstError(nextErrors: ContactErrors) {
    const first = Object.keys(nextErrors)[0];
    requestAnimationFrame(() =>
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(),
    );
  }
  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    setStatus(null);
    const data = new FormData(event.currentTarget);
    const values = {
      ...Object.fromEntries(data),
      consent: data.get("consent") === "on",
    };
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors = fieldErrors(parsed.error);
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }
    setErrors({});
    setPending(true);
    busy.current = true;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (result.errors) {
        setErrors(result.errors);
        focusFirstError(result.errors);
      }
      setStatus({
        success: response.ok,
        message:
          result.message || "Odeslání se nepodařilo. Zkuste to prosím znovu.",
      });
      if (response.ok) form.current?.reset();
    } catch {
      setStatus({
        success: false,
        message:
          "Spojení se nezdařilo. Zkontrolujte připojení a zkuste to znovu. Vaše zpráva zůstala ve formuláři.",
      });
    } finally {
      setPending(false);
      busy.current = false;
      requestAnimationFrame(() => alert.current?.focus());
    }
  }
  const error = (name: keyof ContactErrors) =>
    errors[name] ? (
      <span id={`${name}-error`} className="field-error">
        {errors[name]}
      </span>
    ) : null;
  const attrs = (name: keyof ContactErrors) => ({
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  return (
    <form
      ref={form}
      className="contact-form"
      noValidate
      onSubmit={submit}
      aria-label="Poptávkový formulář"
      aria-busy={pending}
    >
      <div className="form-heading">
        <h2>Řekněte mi o svém projektu.</h2>
        <p>Pole označená * jsou povinná. Ostatní můžeme probrat později.</p>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Vaše webová adresa</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Jméno a příjmení *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jak vás mohu oslovit?"
            required
            minLength={2}
            maxLength={100}
            {...attrs("name")}
          />
          {error("name")}
        </div>
        <div className="field">
          <label htmlFor="email">E-mail *</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vas@email.cz"
            required
            maxLength={254}
            {...attrs("email")}
          />
          {error("email")}
        </div>
        <div className="field">
          <label htmlFor="phone">
            Telefon <span> / nepovinné</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+420"
            maxLength={30}
            {...attrs("phone")}
          />
          {error("phone")}
        </div>
        <div className="field">
          <label htmlFor="projectType">Co pro vás mohu udělat? *</label>
          <select
            id="projectType"
            name="projectType"
            defaultValue={defaultType}
            required
            {...attrs("projectType")}
          >
            <option value="">Vyberte typ projektu</option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {error("projectType")}
        </div>
        <div className="field">
          <label htmlFor="budget">
            Orientační rozpočet <span> / nepovinné</span>
          </label>
          <select id="budget" name="budget" {...attrs("budget")}>
            <option value="">Vyberte rozpočet</option>
            {budgets.map((budget) => (
              <option key={budget}>{budget}</option>
            ))}
          </select>
          {error("budget")}
        </div>
        <div className="field">
          <label htmlFor="timeline">
            Kdy chcete začít? <span> / nepovinné</span>
          </label>
          <select id="timeline" name="timeline" {...attrs("timeline")}>
            <option value="">Vyberte termín</option>
            {timelines.map((timeline) => (
              <option key={timeline}>{timeline}</option>
            ))}
          </select>
          {error("timeline")}
        </div>
        <div className="field full">
          <label htmlFor="message">Pár slov o projektu *</label>
          <textarea
            id="message"
            name="message"
            defaultValue={
              defaultPackage ? `Zajímá mě varianta ${defaultPackage}.\n\n` : ""
            }
            placeholder="Co děláte, co potřebujete a čeho chcete dosáhnout?"
            rows={5}
            minLength={20}
            maxLength={5000}
            required
            {...attrs("message")}
          />
          {error("message")}
        </div>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required {...attrs("consent")} />
        <span>
          Seznámil/a jsem se s{" "}
          <Link href="/ochrana-osobnich-udaju">
            informacemi o zpracování osobních údajů
          </Link>{" "}
          pro vyřízení mé poptávky. *
        </span>
      </label>
      {error("consent")}
      {status && (
        <div
          ref={alert}
          role={status.success ? "status" : "alert"}
          tabIndex={-1}
          className={`form-alert ${status.success ? "success" : ""}`}
        >
          {status.message}
        </div>
      )}
      <button
        className="button button-primary"
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <>
            Odesílám zprávu
            <LoaderCircle size={16} aria-hidden="true" />
          </>
        ) : (
          <>
            Odeslat nezávaznou poptávku
            <ArrowUpRight size={17} aria-hidden="true" />
          </>
        )}
      </button>
      <p className="form-footnote">
        Odesláním nevzniká objednávka ani závazek ke spolupráci.
      </p>
    </form>
  );
}
