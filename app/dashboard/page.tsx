"use client";

import React, { useMemo, useState } from "react";
import useConsentLogs from "../../hooks/useConsentLogs";
import { generateDummyMetadata } from "../../lib/consent";
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

  function exportCSV() {
    const header = ["id","consumerId","channel","consentType","status","timestamp","userAction","disclosureId","surface","ipAddress","deviceInfo"].join(",") + "\n";
    const rows = logs.map((l) => {
      const meta = generateDummyMetadata(l.consumerId);
      const status = l.optedIn ? "Opt-In" : "Opt-Out";
      return [l.id,l.consumerId,l.channel,l.consentType,status,new Date(l.timestamp).toISOString(),l.userAction,l.disclosureId,l.metadata.surface,meta.ipAddress,meta.deviceInfo].map((v)=>`"${String(v).replace(/"/g,'""')}"`).join(",");
    }).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tcp_audit_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <main className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-semibold">TCPA Compliance Dashboard (Demo)</h1>

        <div className="mt-6 flex gap-4">
          <div className="rounded bg-white p-4">Total events: <div className="text-lg font-bold">{summary.total}</div></div>
          <div className="rounded bg-white p-4">Opted in: <div className="text-lg font-bold">{summary.optedIn}</div></div>
          <div className="rounded bg-white p-4">Opted out: <div className="text-lg font-bold">{summary.optedOut}</div></div>
          <div className="ml-auto"><button className="rounded bg-zinc-800 px-4 py-2 text-white" onClick={exportCSV}>Download TCPA Audit Report (CSV)</button></div>
        </div>

        <div className="mt-6 overflow-x-auto rounded bg-white">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-zinc-100 text-left">
              <tr>
                <th className="px-3 py-2">consumerId</th>
                <th className="px-3 py-2">channel</th>
                <th className="px-3 py-2">consentType</th>
                <th className="px-3 py-2">status</th>
                <th className="px-3 py-2">timestamp</th>
                <th className="px-3 py-2">userAction</th>
                <th className="px-3 py-2">disclosureId</th>
                <th className="px-3 py-2">metadata.surface</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id} className="cursor-pointer border-t" onClick={() => setSelected(l)}>
                  <td className="px-3 py-2">{l.consumerId}</td>
                  <td className="px-3 py-2">{l.channel}</td>
                  <td className="px-3 py-2">{l.consentType}</td>
                  <td className="px-3 py-2">{l.optedIn ? "Opt-In" : "Opt-Out"}</td>
                  <td className="px-3 py-2">{new Date(l.timestamp).toLocaleString()}</td>
                  <td className="px-3 py-2">{l.userAction}</td>
                  <td className="px-3 py-2">{l.disclosureId}</td>
                  <td className="px-3 py-2">{l.metadata.surface}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="w-[min(720px,96%)] rounded bg-white p-6">
              <h3 className="text-lg font-semibold">Consent Detail</h3>
              <div className="mt-2 text-sm text-zinc-700">
                <pre className="whitespace-pre-wrap">{JSON.stringify(selected,null,2)}</pre>
              </div>
              <div className="mt-4">
                <h4 className="font-medium">Synthetic metadata</h4>
                <pre className="whitespace-pre-wrap">{JSON.stringify(generateDummyMetadata(selected.consumerId),null,2)}</pre>
                <h4 className="mt-3 font-medium">Disclosure</h4>
                <div className="mt-1 text-sm text-zinc-700">{getDisclosureById(selected.disclosureId).text}</div>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="rounded bg-gray-200 px-4 py-2" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
