"use client";

import Link from "next/link";
import ChatbotWidget from "../components/ChatbotWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-zinc-900 text-white font-bold">RR</div>
            <div>
              <div className="text-xl font-bold">RoadRunner Tire & Auto</div>
              <div className="text-xs text-zinc-500">Tires • Alignments • Repairs</div>
            </div>
          </div>

          <nav>
            <ul className="flex items-center gap-6 text-sm">
              <li><Link href="/self-service/faq" className="hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/self-service/invoice" className="hover:text-blue-600">Invoice</Link></li>
              <li><Link href="/self-service/warranty" className="hover:text-blue-600">Warranty</Link></li>
              <li><Link href="/dashboard" className="rounded bg-zinc-900 px-3 py-1 text-white">Dashboard</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl p-8">
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-4xl font-extrabold leading-tight">Get back on the road faster with RoadRunner Tires</h1>
            <p className="text-lg text-zinc-600">Quality tires, fast service, and friendly technicians. Book a service, view invoices, or get warranty help — all demo flows include TCPA consent capture.</p>

            <div className="flex gap-3">
              <Link href="/self-service/faq" className="rounded bg-blue-600 px-4 py-2 text-white">View FAQ</Link>
              <Link href="/self-service/invoice" className="rounded border px-4 py-2">View Invoice</Link>
            </div>
          </div>

          <div className="rounded border p-6">
            <h3 className="text-lg font-semibold">Current Offers</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-700">
              <li>Free alignment with purchase of 4 tires</li>
              <li>10% off brake service this month</li>
            </ul>

            <div className="mt-4">
              <button className="rounded bg-zinc-900 px-4 py-2 text-white">Book Appointment</button>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Services</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded border bg-white p-4">Tire Sales</div>
            <div className="rounded border bg-white p-4">Alignments</div>
            <div className="rounded border bg-white p-4">Repairs & Inspections</div>
          </div>
        </section>

        <footer className="mt-12 border-t pt-6 text-sm text-zinc-600">© {new Date().getFullYear()} RoadRunner Tire & Auto — Demo site. All consent events are stored locally for demo purposes.</footer>
      </main>

      <ChatbotWidget />
    </div>
  );
}
