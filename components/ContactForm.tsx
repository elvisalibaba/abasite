"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const organization = String(form.get("organization") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const subject = String(form.get("subject") || "Demande de contact").trim();
    const message = String(form.get("message") || "").trim();

    const body = [
      `Nom : ${name}`,
      `Organisation : ${organization || "Non précisée"}`,
      `Téléphone : ${phone || "Non précisé"}`,
      `E-mail : ${email}`,
      "",
      message
    ].join("\n");

    window.location.href = `mailto:contact@aba.cd?subject=${encodeURIComponent(`[Site ABA] ${subject}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>
          <span>Nom complet *</span>
          <input required name="name" type="text" autoComplete="name" />
        </label>
        <label>
          <span>Organisation</span>
          <input name="organization" type="text" autoComplete="organization" />
        </label>
        <label>
          <span>Adresse e-mail *</span>
          <input required name="email" type="email" autoComplete="email" />
        </label>
        <label>
          <span>Téléphone</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
      </div>
      <label>
        <span>Objet *</span>
        <select required name="subject" defaultValue="">
          <option value="" disabled>Sélectionner un sujet</option>
          <option>Demande de présentation</option>
          <option>Projet de transformation numérique</option>
          <option>Biométrie et identité numérique</option>
          <option>Audit et gouvernance des données</option>
          <option>Infrastructure et déploiement</option>
          <option>Partenariat institutionnel</option>
          <option>Autre demande</option>
        </select>
      </label>
      <label>
        <span>Votre message *</span>
        <textarea required name="message" rows={7} />
      </label>
      <div className="form-footer">
        <p>En envoyant ce formulaire, votre application de messagerie s’ouvrira avec le message préparé.</p>
        <button className="button primary" type="submit">Préparer le message</button>
      </div>
      {sent ? <p className="form-notice">Le message a été préparé dans votre application de messagerie.</p> : null}
    </form>
  );
}
