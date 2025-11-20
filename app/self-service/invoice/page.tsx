"use client";

import React, { useState } from "react";
import ConsentModal from "../../../components/ConsentModal";

export default function InvoicePage() {
  const [open, setOpen] = useState(false);

  const charges = [
    { label: "Pirelli Cinturato P7 (x4)", amount: 612 },
    { label: "Mount & balance", amount: 120 },
    { label: "Alignment calibration", amount: 95 },
    { label: "Shop fees & disposal", amount: 28 },
  ];
  const total = charges.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 pb-20 pt-16">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
            Invoice walkthrough · Demo
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Sample invoice with consent capture
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Review the invoice, then launch the consent modal. Accepting or
              declining consent writes an entry that appears in the dashboard
              ledger.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-lg">
            <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-blue-500 via-blue-400 to-blue-600" />
            <div className="px-6 pb-6 pt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
                    Invoice
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-slate-900">
                    #RR-10487 · 2025-11-14
                  </h2>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>Service advisor: Morgan T.</p>
                  <p>Bay: Alignment B2</p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="px-4 py-3 text-left">Description</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {charges.map((item) => (
                      <tr key={item.label}>
                        <td className="px-4 py-3 text-slate-700">
                          {item.label}
                        </td>
                        <td className="px-4 py-3 text-right text-slate-900">
                          ${item.amount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50">
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                        Total due
                      </td>
                      <td className="px-4 py-3 text-right text-lg font-semibold text-slate-900">
                        ${total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl bg-slate-100/70 p-4 text-xs text-slate-600">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    Note
                  </span>
                  Pricing and services are fixed for the demo and do not reflect
                  live data.
                </div>
                <p>
                  Use the consent button below to simulate sending documents or
                  reminders through a preferred channel.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
                >
                  Open consent modal
                </button>
                <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                  Download invoice PDF (stub)
                </button>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                How to test this screen
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Work through the steps below to create a sample consent record
                and verify it in the dashboard.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                  1
                </span>
                Review the invoice table and adjust the conversation notes as
                needed.
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                  2
                </span>
                Trigger the consent modal to document the communication
                preference.
              </li>
              <li className="flex gap-3 text-slate-600">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                  3
                </span>
                Navigate to the dashboard and confirm the new entry appears in
                the ledger.
              </li>
            </ul>
            <div className="rounded-2xl bg-slate-100/80 p-5 text-xs text-slate-600 shadow">
              Tip: Use the clear logs button on the dashboard if you want to
              reset the data for another walkthrough.
            </div>
          </aside>
        </section>
      </main>

      <ConsentModal
        open={open}
        onClose={() => setOpen(false)}
        channel="invoice"
        consentType="sms"
        surface="invoice-page"
      />
    </div>
  );
}
