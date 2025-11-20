"use client";

import React from "react";
import { addConsentLog } from "../lib/consent";
import { getDisclosureById } from "../lib/disclosures";

type Props = {
  open: boolean;
  onClose: () => void;
  channel:
    | "chatbot"
    | "email"
    | "sms"
    | "invoice"
    | "warranty"
    | "faq"
    | "survey";
  consentType?: "call" | "sms" | "email";
  surface?: string;
  disclosureId?: string;
  onDecision?: (optedIn: boolean) => void;
};

export default function ConsentModal({
  open,
  onClose,
  channel,
  consentType = "sms",
  surface = "unknown",
  disclosureId = "tcpadisclosure-v1",
  onDecision,
}: Props) {
  if (!open) return null;

  const disclosure = getDisclosureById(disclosureId);

  function handle(decision: boolean) {
    addConsentLog({
      channel,
      consentType,
      optedIn: decision,
      userAction: decision ? "clicked_yes" : "clicked_no",
      disclosureId: disclosure.id,
      metadata: { surface },
    });
    onDecision?.(decision);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[min(720px,96%)] rounded bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold">TCPA Consent</h3>
        <p className="mt-2 text-sm text-zinc-700">{disclosure.text}</p>
        <div className="mt-4 flex justify-end gap-3">
          <button className="rounded px-4 py-2" onClick={() => handle(false)}>
            No
          </button>
          <button
            className="rounded bg-blue-600 px-4 py-2 text-white"
            onClick={() => handle(true)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
