"use client";

import Link from "next/link";
import ChatbotWidget from "../components/ChatbotWidget";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-md">
              RR
            </div>
            <div className="leading-tight">
              <p className="text-lg font-semibold">RoadRunner Tire & Auto</p>
              <p className="text-xs text-slate-500">
                TCPA Consent Capture Demo
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="#services" className="transition hover:text-blue-600">
              Services
            </Link>
            <Link href="#experience" className="transition hover:text-blue-600">
              Why RoadRunner
            </Link>
            <Link href="#contact" className="transition hover:text-blue-600">
              Contact
            </Link>
            <Link
              href="/self-service/faq"
              className="transition hover:text-blue-600"
            >
              FAQ
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
            >
              Compliance Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-6 pb-24 pt-14">
        <section className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-8">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                RoadRunner Tire & Auto consent workflow demo
              </h1>
              <p className="max-w-xl text-lg text-slate-600">
                Use this sandbox to explore how consent modals, chatbot
                interactions, and dashboards work together. Each action writes
                to local storage so you can review the data in the compliance
                dashboard.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/self-service/invoice"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700"
              >
                Open invoice flow
              </Link>
              <Link
                href="/self-service/warranty"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Open warranty flow
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Review consent ledger
              </Link>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                How to try the demo
              </h2>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  Visit any flow and trigger the consent modal.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  Approve or decline consent to create sample log entries.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  Open the dashboard to inspect the stored artifacts.
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-linear-to-br from-blue-100 via-white to-amber-50 shadow-lg" />
            <div className="flex h-full flex-col gap-6 rounded-3xl bg-white p-8 shadow-xl">
              <div>
                <p className="text-xs uppercase tracking-[0.2rem] text-blue-600">
                  Demo checklist
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                  Key areas to explore
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  These links mirror typical customer touchpoints. They are
                  scoped for demonstration only.
                </p>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    1
                  </span>
                  Launch the chatbot on this page and record a consent response.
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    2
                  </span>
                  Submit a sample invoice payment and view the disclosure text.
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    3
                  </span>
                  Inspect the consent ledger in the dashboard once you are done.
                </li>
              </ul>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                This environment is local-only and resets when browser storage
                is cleared.
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="space-y-10">
          <div className="flex flex-col gap-3 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-600">
              Demo modules
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Screens included in this project
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600">
              Each card links to a sample surface that records consent choices.
              Browse them in any order to generate data for the dashboard.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Invoice payment demo",
                description:
                  "Invoice demo that captures consent before payment submission.",
                href: "/self-service/invoice",
              },
              {
                title: "Alignment follow-up demo",
                description:
                  "Warranty workflow that stores acknowledgement for future outreach.",
                href: "/self-service/warranty",
              },
              {
                title: "Inspection report demo",
                description:
                  "Inspection-style invoice view with disclosure callouts.",
                href: "/self-service/invoice",
              },
              {
                title: "Warranty registration demo",
                description:
                  "See how warranty registration stores the disclosure reference.",
                href: "/self-service/warranty",
              },
              {
                title: "Reengagement sequence",
                description:
                  "Email and SMS reengagement sequence with modal consent capture.",
                href: "/reengagement",
              },
              {
                title: "Survey flow demo",
                description:
                  "Record a survey response and decide whether to grant permission for follow-up.",
                href: "/survey",
              },
            ].map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    ●
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {service.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  View demo surface
                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="grid gap-8 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-lg lg:grid-cols-[1fr_1.1fr]"
        >
          <div className="flex flex-col gap-6">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-600">
              What to expect
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              Data captured by the demo
            </h2>
            <p className="text-sm text-slate-600">
              The flows write sample consent artifacts to local storage,
              including disclosure IDs, timestamps, and originating surfaces.
              Review the data after trying each surface.
            </p>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                Consent artifacts stored locally with metadata ready for export.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                Disclosure text pulled from a simple library for reuse across
                surfaces.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                Dashboard view that makes the stored events easy to inspect.
              </li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Live Consent Timeline",
                description:
                  "Visualize opt-in, opt-out, and revocation events per customer in seconds.",
                href: "/dashboard",
              },
              {
                title: "Disclosure Library",
                description:
                  "Preview, version, and attach disclosures to any touchpoint flow.",
                href: "/dashboard",
              },
              {
                title: "Audit-Ready CSV",
                description:
                  "Export comprehensive audit trails without involving engineering.",
                href: "/dashboard",
              },
              {
                title: "Compliance Simulator",
                description:
                  "Test an outreach plan before marketing hits send.",
                href: "/dashboard",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md"
              >
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-slate-900">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600">{card.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                  Open dashboard
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="grid gap-10 rounded-3xl bg-linear-to-br from-slate-900 via-slate-800 to-blue-900 p-10 text-white lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Where to go next</h2>
            <p className="max-w-xl text-sm text-slate-200">
              Use these links as a checklist while you explore. Refreshing the
              browser or clearing storage resets the data.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Open dashboard
              </Link>
              <Link
                href="/reengagement"
                className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View reengagement demo
              </Link>
            </div>
          </div>
          <div className="grid gap-4 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                Reset the demo
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                Clear your browser storage
              </p>
              <p className="mt-1 text-xs text-slate-300">
                This removes consent logs and chatbot progress.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                Need real data?
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                Replace the stubbed API calls
              </p>
              <p className="mt-1 text-xs text-slate-300">
                See README for integration notes.
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                Privacy
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                No network requests are made
              </p>
              <p className="mt-1 text-xs text-slate-300">
                All interactions stay in your browser.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-4 border-t border-slate-200/70 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} RoadRunner Tire & Auto · Demo experience
          for showcasing TCPA-compliant consent capture.
        </footer>
      </main>

      <ChatbotWidget />
    </div>
  );
}
