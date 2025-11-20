"use client";

import React, { useState } from "react";
import ConsentModal from "../../components/ConsentModal";

export default function SurveyPage() {
  const [step, setStep] = useState(1);
  const [openConsent, setOpenConsent] = useState(false);
  const [reason, setReason] = useState<string | null>(null);

  const steps = [
    { id: 1, label: "Reason", detail: "Record why the customer churned." },
    { id: 2, label: "Consent", detail: "Ask whether follow-up is allowed." },
    { id: 3, label: "Review", detail: "Confirm what was saved to storage." },
  ];

  const reasons = [
    {
      title: "Pricing clarity",
      description: "Quotes felt higher than expected or financing was unclear.",
    },
    {
      title: "Feature gaps",
      description: "Service reminders, pick up, or warranty coordination was missing.",
    },
    {
      title: "Life changes",
      description: "Sold the vehicle or moved out of our service area.",
    },
  ];

  function selectReason(value: string) {
    setReason(value);
    setStep(2);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 pb-20 pt-16">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow">
            Survey demo | RoadRunner Tire & Auto
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Sample churn survey with consent step</h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Walk through the survey to create a consent record. Feel free to restart the flow as many times as needed.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <article className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">{step}</span>
              <span>{steps[step - 1].label}</span>
            </div>
            <p className="text-sm text-slate-600">{steps[step - 1].detail}</p>

            {step === 1 && (
              <div className="space-y-3">
                {reasons.map((entry) => (
                  <button
                    key={entry.title}
                    className="flex w-full flex-col items-start gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-left text-sm text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
                    onClick={() => selectReason(entry.title)}
                  >
                    <span className="font-semibold text-slate-900">{entry.title}</span>
                    <span className="text-xs">{entry.description}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4 text-xs text-blue-700">
                  <p className="font-semibold text-blue-900">Follow-up preference</p>
                  <p className="mt-2">You selected: {reason}. Choose whether to store permission for future outreach.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setOpenConsent(true)}
                    className="flex-1 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
                  >
                    Request follow-up
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    No thanks
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Opt-in responses save the disclosure ID, timestamp, and surface so you can review them later.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-sm text-emerald-700">
                  <p className="font-semibold text-emerald-900">Feedback recorded</p>
                  <p className="mt-2 text-xs text-emerald-700">The stored entry includes the selected reason and whether permission was granted.</p>
                </div>
                <button
                  onClick={() => {
                    setStep(1);
                    setReason(null);
                  }}
                  className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Start another survey
                </button>
              </div>
            )}
          </article>

          <aside className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <div>
              <h3 className="text-base font-semibold text-slate-900">How to test the survey</h3>
              <p className="mt-1 text-xs text-slate-600">
                Complete the steps, then inspect the dashboard to confirm the new log entry.
              </p>
            </div>
            <div className="grid gap-3 text-xs text-slate-600">
              <div className="rounded-2xl bg-slate-100/80 p-4">
                <p className="font-semibold text-slate-800">What gets stored</p>
                <p className="mt-1">Reason selected, consent status, timestamp, disclosure ID, and surface identifier.</p>
              </div>
              <div className="rounded-2xl bg-slate-100/80 p-4">
                <p className="font-semibold text-slate-800">Resetting the data</p>
                <p className="mt-1">Use the clear logs button on the dashboard whenever you want to start fresh.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-slate-100/80 p-5 text-xs text-slate-600 shadow">
              Tip: Switch between opt-in and opt-out responses to see how the ledger reflects each scenario.
            </div>
          </aside>
        </section>
      </main>

      <ConsentModal
        open={openConsent}
        onClose={() => {
          setOpenConsent(false);
          setStep(3);
        }}
        channel="survey"
        consentType="sms"
        surface="survey-final-step"
      />
    </div>
  );
}
