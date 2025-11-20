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

  const touches = [
    {
      title: "Reengagement email",
      body: "Send a sample message and record an email consent decision.",
      channel: "email",
      action: () => openFor("email"),
      accent: "from-blue-500/10 via-blue-200/10 to-blue-50",
    },
    {
      title: "Follow-up SMS",
      body: "Simulate a reminder that requests permission for text outreach.",
      channel: "sms",
      action: () => openFor("sms"),
      accent: "from-emerald-500/10 via-emerald-200/10 to-emerald-50",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-200 pb-20 pt-16">
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
            Reengagement sequence demo
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Email and SMS flow used in this demo</h1>
            <p className="max-w-2xl text-sm text-slate-600">
              Use the cards below to open the consent modal for each channel. Accepting or declining consent will write an entry that you can inspect in the dashboard.
            </p>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            {touches.map((touch) => (
              <article
                key={touch.title}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`absolute inset-0 -z-10 bg-linear-to-br ${touch.accent}`} />
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {touch.channel.toUpperCase()}
                  </span>
                  <button
                    onClick={touch.action}
                    className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
                  >
                    Launch consent modal
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-slate-900">{touch.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{touch.body}</p>
                <div className="mt-4 rounded-2xl border border-white/70 bg-white/70 p-4 text-sm text-slate-700 shadow-inner">
                  <p className="font-semibold text-slate-900">Preview copy:</p>
                  {touch.channel === "email" ? (
                    <div className="mt-2 space-y-1 text-xs">
                      <p>Subject: Maintaining your service reminders</p>
                      <p>Hi Alex, this is RoadRunner Tire & Auto. Reply YES to keep getting updates or manage your preferences below.</p>
                    </div>
                  ) : (
                    <div className="mt-2 space-y-1 text-xs">
                      <p>RoadRunner Tire & Auto: Reply YES to receive future texts about your service reminder. Reply STOP to opt out.</p>
                      <p className="text-slate-500">Disclosure text is appended automatically in the consent modal.</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <aside className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">Demo walkthrough</h3>
              <p className="text-sm text-slate-600">
                Sample the two touchpoints, then move to the dashboard to view the audit record. Use this checklist as you go.
              </p>
            </div>
            <ol className="space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">1</span>
                Launch the email modal and confirm or decline consent.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">2</span>
                Repeat the process for the SMS variant.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">3</span>
                Open the dashboard to verify that both events are logged.
              </li>
            </ol>
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-sm text-blue-800">
              Tip: Use the clear logs button in the dashboard when you want to restart the walkthrough.
            </div>
          </aside>
        </section>
      </main>

      <ConsentModal
        open={open}
        onClose={() => setOpen(false)}
        channel={modalProps.channel}
        consentType={modalProps.consentType}
        surface={modalProps.surface}
        disclosureId={modalProps.disclosureId || "tcpadisclosure-v1"}
      />
    </div>
  );
}
