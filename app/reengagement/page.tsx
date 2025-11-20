"use client";

import React, { useState } from "react";
import ConsentModal from "../../components/ConsentModal";

export default function ReengagementPage() {
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState<any>({});

  function openFor(channel: "email" | "sms") {
    setModalProps({ channel, consentType: channel === "email" ? "email" : "sms", surface: `reengagement-${channel}` });
    setOpen(true);
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <main className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold">Reengagement</h1>
        <p className="mt-2 text-sm text-zinc-600">Preview reengagement email and SMS and request consent.</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded border bg-white p-4">
            <h3 className="font-medium">Email Preview</h3>
            <p className="mt-2 text-sm text-zinc-700">We miss you — check out our new features.</p>
            <div className="mt-4">
              <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => openFor("email")}>Request Email Consent</button>
            </div>
          </div>

          <div className="rounded border bg-white p-4">
            <h3 className="font-medium">SMS Preview</h3>
            <p className="mt-2 text-sm text-zinc-700">Quick update: your account has a new offer.</p>
            <div className="mt-4">
              <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => openFor("sms")}>Request SMS Consent</button>
            </div>
          </div>
        </div>
      </main>
      <ConsentModal open={open} onClose={() => setOpen(false)} channel={modalProps.channel} consentType={modalProps.consentType} surface={modalProps.surface} disclosureId={modalProps.disclosureId || "tcpadisclosure-v1"} />
    </div>
  );
}
