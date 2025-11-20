"use client";

import React, { useState } from "react";
import ConsentModal from "../../../components/ConsentModal";

export default function FAQPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <main className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">FAQ</h1>
        <p className="mt-2 text-sm text-zinc-600">Frequently asked questions with an option to be contacted.</p>

        <div className="mt-6 rounded bg-white p-6">
          <p>How do I reset my password? Lorem ipsum...</p>
          <div className="mt-4">
            <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => setOpen(true)}>Send me a follow-up</button>
          </div>
        </div>
      </main>
      <ConsentModal open={open} onClose={() => setOpen(false)} channel="faq" consentType="email" surface="faq-page" />
    </div>
  );
}
