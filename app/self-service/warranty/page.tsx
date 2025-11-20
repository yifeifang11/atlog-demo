"use client";

import React, { useState } from "react";
import ConsentModal from "../../../components/ConsentModal";

export default function WarrantyPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <main className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">Warranty</h1>
        <p className="mt-2 text-sm text-zinc-600">Warranty registration example with contact consent.</p>

        <div className="mt-6 rounded bg-white p-6">
          <p>Register your product for warranty support.</p>
          <div className="mt-4">
            <button className="rounded bg-blue-600 px-4 py-2 text-white" onClick={() => setOpen(true)}>Allow contact for support</button>
          </div>
        </div>
      </main>
      <ConsentModal open={open} onClose={() => setOpen(false)} channel="warranty" consentType="call" surface="warranty-page" />
    </div>
  );
}
