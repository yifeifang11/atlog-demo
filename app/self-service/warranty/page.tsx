"use client";

import React, { useState } from "react";
import ConsentModal from "../../../components/ConsentModal";

export default function WarrantyPage() {
  const [open, setOpen] = useState(false);

  const coverage = [
    {
      title: "Road hazard (sample)",
      detail:
        "Placeholder description that mirrors a typical road hazard add-on.",
    },
    {
      title: "Manufacturer defects (sample)",
      detail: "Example text showing how workmanship language could appear.",
    },
    {
      title: "Emergency roadside (sample)",
      detail:
        "Used only for demo purposes to illustrate multiple coverage tiles.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-slate-100 pb-20 pt-16">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
            Warranty registration · Demo
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Warranty workflow with consent logging
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Review the stubbed registration form, then launch the consent
              modal. The outcome is stored locally so you can verify it inside
              the dashboard.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-lg">
            <div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-emerald-500 via-emerald-400 to-teal-500" />
            <div className="grid gap-6 p-8">
              <div className="grid gap-2">
                <h2 className="text-lg font-semibold text-slate-900">
                  Owner & vehicle details
                </h2>
                <p className="text-xs text-slate-500">
                  Captured locally for demo purposes.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Full name
                  <input
                    disabled
                    placeholder="Alex Johnson"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  VIN
                  <input
                    disabled
                    placeholder="1FMCU0DG0CKB12345"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Install date
                  <input
                    disabled
                    placeholder="Nov 14, 2025"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Mileage
                  <input
                    disabled
                    placeholder="28,435"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600"
                  />
                </label>
              </div>

              <div className="rounded-2xl bg-slate-100/80 p-5 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">
                  Disclosure preview
                </p>
                <p className="mt-2">
                  "By submitting this registration, I authorize RoadRunner Tire
                  & Auto to contact me by phone and email about warranty
                  updates, recall notices, and service reminders. Message rates
                  may apply. I can revoke consent at any time."
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setOpen(true)}
                  className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
                >
                  Open consent modal
                </button>
                <button className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                  Download registration PDF (stub)
                </button>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Demo checklist
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Follow the steps below to test the consent logging portion of
                this screen.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {coverage.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-slate-100/80 p-5 text-xs text-slate-600 shadow">
              Tip: Clear logs on the dashboard when you need to reset the
              registration example.
            </div>
          </aside>
        </section>
      </main>

      <ConsentModal
        open={open}
        onClose={() => setOpen(false)}
        channel="warranty"
        consentType="call"
        surface="warranty-page"
      />
    </div>
  );
}
