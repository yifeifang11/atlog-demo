"use client";

import React, { useState } from "react";
import ConsentModal from "../../../components/ConsentModal";

export default function FAQPage() {
  const [open, setOpen] = useState(false);

  const questions = [
    {
      q: "How do I pick tires for winter conditions?",
      a: "Use the VIN and driving conditions to filter recommendations. Consent is required before any follow-up message is sent.",
    },
    {
      q: "Can I reschedule an appointment via SMS?",
      a: "Reply RESCHEDULE to any reminder text. The system records the consent event before updating the calendar.",
    },
    {
      q: "Do you rotate tires purchased elsewhere?",
      a: "Yes. Once consent is granted, torque specs and warranty notes can be shared by email or SMS.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 pb-20 pt-16">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow">
            FAQ demo | RoadRunner Tire & Auto
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              FAQs connected to consent logging
            </h1>
            <p className="max-w-2xl text-sm text-slate-600">
              This screen shows how self-service answers can hand off to a
              consent modal. Trigger the modal to add a record for the
              dashboard.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <article className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900">
              Popular topics
            </h2>
            <div className="space-y-3">
              {questions.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700"
                >
                  <p className="font-semibold text-slate-900">{item.q}</p>
                  <p className="mt-2 text-xs text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </article>

          <aside className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Try the handoff
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                Use the button below to open the consent modal and record a
                follow-up request.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100/80 p-4 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">Sample request</p>
              <p className="mt-2">
                "Please send the torque specs for my Tacoma. Email is the best
                channel for me."
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
            >
              Open consent modal
            </button>
            <div className="rounded-2xl bg-slate-100/80 p-5 text-xs text-slate-600 shadow">
              Tip: Once you have tested the flow, clear the consent logs from
              the dashboard to start again.
            </div>
          </aside>
        </section>
      </main>

      <ConsentModal
        open={open}
        onClose={() => setOpen(false)}
        channel="faq"
        consentType="email"
        surface="faq-page"
      />
    </div>
  );
}
