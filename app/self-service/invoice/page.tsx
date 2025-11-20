"use client";

import React, { useState } from "react";
import ConsentModal from "../../../components/ConsentModal";

export default function InvoicePage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <main className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">Invoice</h1>
        <p className="mt-2 text-sm text-zinc-600">Example invoice content with a prompt to contact the customer.</p>

        <div className="mt-6 rounded bg-white p-6">
          <p>Invoice #1234 — Total: $123.45</p>
          <div className="mt-4">
            <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => setOpen(true)}>Want us to contact you?</button>
          </div>
        </div>
      </main>
      <ConsentModal open={open} onClose={() => setOpen(false)} channel="invoice" consentType="sms" surface="invoice-page" />
    </div>
  );
}
