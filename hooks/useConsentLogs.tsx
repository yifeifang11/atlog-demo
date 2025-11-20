"use client";

import { useEffect, useState } from "react";
import { getConsentLogs } from "../lib/consent";
import type { ConsentLog } from "../lib/consent";

export default function useConsentLogs() {
  const [logs, setLogs] = useState<ConsentLog[]>(() => getConsentLogs());

  useEffect(() => {
    function onUpdate() {
      setLogs(getConsentLogs());
    }

    window.addEventListener("consentLogsUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("consentLogsUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  return {
    logs,
    refresh: () => setLogs(getConsentLogs()),
  };
}
