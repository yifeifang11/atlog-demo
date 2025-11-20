"use client";

import React, { useEffect, useMemo, useState } from "react";
import ConsentModal from "./ConsentModal";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
};

type ScriptOption = {
  id: string;
  label: string;
  next: number | null;
  followUp?: string;
};

type ScriptStep = {
  id: number;
  bot: string;
  options: ScriptOption[];
};

function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [consented, setConsented] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const script = useMemo<ScriptStep[]>(
    () => [
      {
        id: 0,
        bot: "Hi there! Are you looking for new tires or help with service today?",
        options: [
          { id: "need-tires", label: "New tires", next: 1 },
          { id: "need-service", label: "Service questions", next: 2 },
        ],
      },
      {
        id: 1,
        bot: "Great news — our RoadRunner all-season tires are buy 3 get 1 free this week. Want to schedule an install?",
        options: [
          {
            id: "schedule-install",
            label: "Yes, schedule me",
            next: null,
            followUp: "Awesome! A service advisor will text you available times within the hour.",
          },
          {
            id: "more-info",
            label: "Send me more tire details",
            next: 3,
          },
        ],
      },
      {
        id: 2,
        bot: "We can help with alignments, brake inspections, and oil changes. Should a technician reach out?",
        options: [
          {
            id: "have-tech-call",
            label: "Yes, have them call",
            next: null,
            followUp: "Perfect. Expect a quick call from RoadRunner Tire & Auto in the next 30 minutes.",
          },
          {
            id: "just-info",
            label: "Just send me the info",
            next: 3,
          },
        ],
      },
      {
        id: 3,
        bot: "You got it. We'll email details along with current offers. Anything else I can help with?",
        options: [
          {
            id: "all-set",
            label: "No, I'm all set",
            next: null,
            followUp: "Glad I could help. Chat again anytime or stop by RoadRunner Tire & Auto!",
          },
          {
            id: "something-else",
            label: "Actually, I have another question",
            next: 0,
            followUp: "No problem — let's keep going!",
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("chatbot-consent-status") : null;
    if (!stored) return;
    if (stored === "opted-in") {
      setConsented(true);
    } else if (stored === "opted-out") {
      setConsented(false);
    }
  }, []);

  useEffect(() => {
    if (consented === true) {
      localStorage.setItem("chatbot-consent-status", "opted-in");
    } else if (consented === false) {
      localStorage.setItem("chatbot-consent-status", "opted-out");
      setMessages([]);
      setStepIndex(0);
    } else {
      localStorage.removeItem("chatbot-consent-status");
    }
  }, [consented]);

  function startConversation() {
    const firstStep = script[0];
    setMessages([{ id: makeId("bot"), from: "bot", text: firstStep.bot }]);
    setStepIndex(0);
  }

  function handleOption(option: ScriptOption) {
    setMessages((prev) => {
      const updated = [...prev, { id: makeId("user"), from: "user", text: option.label }];

      if (option.next === null) {
        updated.push({
          id: makeId("bot"),
          from: "bot",
          text: option.followUp || "Happy to help! Reach out anytime.",
        });
        return updated;
      }

      if (option.followUp) {
        updated.push({ id: makeId("bot"), from: "bot", text: option.followUp });
      }

      const nextStep = script[option.next];
      updated.push({ id: makeId("bot"), from: "bot", text: nextStep.bot });
      return updated;
    });

    if (option.next === null) {
      setStepIndex(-1);
    } else {
      setStepIndex(option.next);
    }
  }

  function toggleChat() {
    setOpen((prev) => {
      const nextValue = !prev;
      if (!prev) {
        if (consented === null) {
          setShowConsent(true);
        } else if (consented && messages.length === 0) {
          startConversation();
        }
      }
      return nextValue;
    });
  }

  function handleConsentDecision(decision: boolean) {
    setConsented(decision);
    setShowConsent(false);

    if (decision) {
      setOpen(true);
      startConversation();
    } else {
      setOpen(false);
    }
  }

  function restartChat() {
    startConversation();
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div className="flex flex-col items-end">
          {open && (
            <div className="mb-2 w-80 rounded-md bg-white p-4 shadow-lg">
              {consented === true ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 text-sm">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={
                          msg.from === "bot"
                            ? "max-w-[85%] rounded bg-blue-50 px-3 py-2 text-blue-900"
                            : "ml-auto max-w-[85%] rounded bg-zinc-900 px-3 py-2 text-white"
                        }
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {stepIndex >= 0 && script[stepIndex] && (
                    <div className="flex flex-col gap-2">
                      {script[stepIndex].options.map((option) => (
                        <button
                          key={option.id}
                          className="rounded border px-3 py-2 text-left text-sm hover:border-blue-200 hover:bg-blue-50"
                          onClick={() => handleOption(option)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {stepIndex === -1 && (
                    <button className="rounded border px-3 py-2 text-sm" onClick={restartChat}>
                      Restart conversation
                    </button>
                  )}
                </div>
              ) : consented === false ? (
                <div className="flex flex-col gap-3 text-sm text-zinc-700">
                  <p>Understood — we won&apos;t send messages right now. If you want to chat, grant consent below.</p>
                  <button
                    className="rounded bg-blue-600 px-3 py-2 text-white"
                    onClick={() => setShowConsent(true)}
                  >
                    Grant consent
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 text-sm text-zinc-700">
                  <p>We just need your permission to send messages about your visit.</p>
                  <button
                    className="rounded bg-blue-600 px-3 py-2 text-white"
                    onClick={() => setShowConsent(true)}
                  >
                    Review TCPA disclosure
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleChat}
            className="h-12 w-12 rounded-full bg-blue-600 text-white shadow-lg"
            aria-label="Open chat"
          >
            💬
          </button>
        </div>
      </div>

      <ConsentModal
        open={showConsent}
        onClose={() => setShowConsent(false)}
        channel="chatbot"
        consentType="sms"
        surface="chatbot-widget"
        disclosureId="tcpadisclosure-v1"
        onDecision={handleConsentDecision}
      />
    </>
  );
}
