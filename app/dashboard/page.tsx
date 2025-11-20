"use client";

import React, { useMemo, useState } from "react";
import useConsentLogs from "../../hooks/useConsentLogs";
import { generateDummyMetadata, saveConsentLogs } from "../../lib/consent";
import { getDisclosureById } from "../../lib/disclosures";

export default function DashboardPage() {
  const { logs } = useConsentLogs();
  const [selected, setSelected] = useState<any>(null);

  const summary = useMemo(() => {
    const total = logs.length;
    const optedIn = logs.filter((l) => l.optedIn).length;
    const optedOut = logs.filter((l) => !l.optedIn).length;
    return { total, optedIn, optedOut };
  }, [logs]);

  const latestTimestamp = useMemo(() => {
    if (logs.length === 0) return null;
    return logs.reduce((latest, current) => {
      return current.timestamp > latest ? current.timestamp : latest;
    }, logs[0].timestamp);
  }, [logs]);

  const surfaceBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    logs.forEach((log) => {
      const key = log.metadata.surface;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([surface, count]) => ({ surface, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [logs]);

  const detailOverlay = selected
    ? (() => {
        const metadata = generateDummyMetadata(selected.consumerId);
        const disclosure = getDisclosureById(selected.disclosureId);
        return (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 px-4 pb-6 pt-10 sm:items-center">
            <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Consent detail
                  </h3>
                  <p className="text-xs text-slate-500">
                    Consumer {selected.consumerId} responded on{" "}
                    {new Date(selected.timestamp).toLocaleString()}.
                  </p>
                </div>
                <button
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
              <dl className="mt-5 grid gap-4 text-xs text-slate-600 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <dt className="font-semibold text-slate-800">Channel</dt>
                  <dd className="mt-1">{selected.channel}</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <dt className="font-semibold text-slate-800">Consent type</dt>
                  <dd className="mt-1">{selected.consentType}</dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <dt className="font-semibold text-slate-800">Status</dt>
                  <dd className="mt-1">
                    {selected.optedIn ? "Opt-In" : "Opt-Out"}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <dt className="font-semibold text-slate-800">Surface</dt>
                  <dd className="mt-1">{selected.metadata.surface}</dd>
                </div>
              </dl>
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50/60 p-4 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">
                  Synthetic metadata
                </p>
                <pre className="mt-2 whitespace-pre-wrap text-[11px] leading-5 text-slate-700">
                  {JSON.stringify(metadata, null, 2)}
                </pre>
              </div>
              {disclosure && (
                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">
                    Disclosure text
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-slate-700">
                    {disclosure.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })()
    : null;

  function exportCSV() {
    const header =
      [
        "id",
        "consumerId",
        "channel",
        "consentType",
        "status",
        "timestamp",
        "userAction",
        "disclosureId",
        "surface",
        "ipAddress",
        "deviceInfo",
      ].join(",") + "\n";
    const rows = logs
      .map((l) => {
        const meta = generateDummyMetadata(l.consumerId);
        const status = l.optedIn ? "Opt-In" : "Opt-Out";
        return [
          l.id,
          l.consumerId,
          l.channel,
          l.consentType,
          status,
          new Date(l.timestamp).toISOString(),
          l.userAction,
          l.disclosureId,
          l.metadata.surface,
          meta.ipAddress,
          meta.deviceInfo,
        ]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",");
      })
      .join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tcp_audit_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function clearLogs() {
    if (typeof window === "undefined") return;
    const confirmed = window.confirm(
      "Clear all consent logs? This cannot be undone."
    );
    if (!confirmed) return;
    saveConsentLogs([]);
    localStorage.removeItem("chatbot-consent-status");
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 pb-20 pt-16">
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6">
        <header className="space-y-4">
          <p className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow">
            Dashboard demo | RoadRunner Tire & Auto
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Consent events recorded in this browser
              </h1>
              <p className="max-w-2xl text-sm text-slate-600">
                Use the controls to export or clear data while you experiment
                with the other demo surfaces.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-black"
                onClick={exportCSV}
              >
                Download TCPA Audit Report
              </button>
              <button
                className="rounded-full border border-red-200 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                onClick={clearLogs}
              >
                Clear Logs
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total events
            </p>
            <p className="mt-3 text-3xl font-bold text-slate-900">
              {summary.total}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Includes all consent decisions captured during this session.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Opted in
            </p>
            <p className="mt-3 text-3xl font-bold text-emerald-700">
              {summary.optedIn}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Handled via the consent modal surfaces.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Opted out
            </p>
            <p className="mt-3 text-3xl font-bold text-rose-700">
              {summary.optedOut}
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Useful for testing revocation handling.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Event ledger
              </h2>
              <p className="text-xs text-slate-500">
                Click any row for disclosure, metadata, and audit notes.
              </p>
            </div>
            {latestTimestamp && (
              <p className="text-xs text-slate-500">
                Last event {new Date(latestTimestamp).toLocaleString()}
              </p>
            )}
          </div>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-slate-100 text-left">
                <tr>
                  <th className="px-4 py-3">Consumer ID</th>
                  <th className="px-4 py-3">Channel</th>
                  <th className="px-4 py-3">Consent type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">User action</th>
                  <th className="px-4 py-3">Disclosure ID</th>
                  <th className="px-4 py-3">Surface</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                  const isActive = selected?.id === log.id;
                  return (
                    <tr
                      key={log.id}
                      className={`border-t transition hover:bg-blue-50/50 ${
                        isActive ? "bg-blue-100/40" : "bg-white"
                      }`}
                      onClick={() => setSelected(log)}
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-700">
                        {log.consumerId}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {log.channel}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {log.consentType}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            log.optedIn
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {log.optedIn ? "Opt-In" : "Opt-Out"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {log.userAction}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {log.disclosureId}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {log.metadata.surface}
                      </td>
                    </tr>
                  );
                })}
                {logs.length === 0 && (
                  <tr>
                    <td
                      className="px-4 py-5 text-center text-xs text-slate-500"
                      colSpan={8}
                    >
                      No consent activity captured yet. Trigger any modal to
                      populate the ledger.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow">
            <h3 className="text-base font-semibold text-slate-900">
              Top surfaces
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Shows which demo screens have created the most entries.
            </p>
            <div className="mt-4 space-y-3 text-xs text-slate-600">
              {surfaceBreakdown.length > 0 ? (
                surfaceBreakdown.map((item) => (
                  <div
                    key={item.surface}
                    className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
                  >
                    <p className="font-semibold text-slate-900">
                      {item.surface}
                    </p>
                    <p className="mt-1">{item.count} recorded events</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500">
                  Surfaces will populate once logs are captured.
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-xs text-slate-600 shadow">
              <p className="font-semibold text-slate-800">Data hygiene</p>
              <p className="mt-2">
                Downloadable CSV mirrors the live ledger with ISO timestamps,
                declared disclosure IDs, and synthetic device metadata for
                auditing.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 text-xs text-slate-600 shadow">
              Tip: Use clear logs before each new walkthrough so the ledger
              reflects only the scenario you are testing.
            </div>
          </div>
        </section>

        {detailOverlay}
      </main>
    </div>
  );
}
