"use client";

import React, { useState } from "react";
import ConsentModal from "../../components/ConsentModal";

export default function SurveyPage() {
  const [step, setStep] = useState(1);
  const [openConsent, setOpenConsent] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <main className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">Churn Survey</h1>
        <p className="mt-2 text-sm text-zinc-600">Tell us why you left (demo).</p>

        {step === 1 && (
          <div className="mt-6 rounded bg-white p-6">
            <h3 className="font-medium">Why did you leave?</h3>
            <ul className="mt-3 space-y-2">
              <li><button className="p-2" onClick={() => setStep(2)}>Pricing</button></li>
              <li><button className="p-2" onClick={() => setStep(2)}>Missing features</button></li>
              <li><button className="p-2" onClick={() => setStep(2)}>Other</button></li>
            </ul>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 rounded bg-white p-6">
            <h3 className="font-medium">Would you like to be recontacted?</h3>
            <p className="mt-2 text-sm text-zinc-600">Optional: allow us to message you about offers.</p>
            <div className="mt-4 flex gap-3">
              <button className="rounded px-4 py-2" onClick={() => setOpenConsent(true)}>Yes — request contact</button>
              <button className="rounded bg-gray-200 px-4 py-2" onClick={() => setStep(3)}>No thanks</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 rounded bg-white p-6">Thank you for the feedback.</div>
        )}
      </main>

      <ConsentModal open={openConsent} onClose={() => { setOpenConsent(false); setStep(3); }} channel="survey" consentType="sms" surface="survey-final-step" />
    </div>
  );
}
