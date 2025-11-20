export const CONSENT_STORAGE_KEY = "consentLogs";

export type Channel =
  | "chatbot"
  | "email"
  | "sms"
  | "invoice"
  | "warranty"
  | "faq"
  | "survey";

export type ConsentType = "call" | "sms" | "email";

export type ConsentLog = {
  id: string;
  consumerId: string;
  channel: Channel;
  consentType: ConsentType;
  optedIn: boolean;
  timestamp: number;
  userAction: string;
  disclosureId: string;
  metadata: {
    surface: string;
    ipAddress?: string;
    deviceInfo?: string;
  };
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getConsentLogs(): ConsentLog[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY) || "[]";
    return JSON.parse(raw) as ConsentLog[];
  } catch (e) {
    return [];
  }
}

export function saveConsentLogs(logs: ConsentLog[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(logs));
  // dispatch event for hooks/listeners
  window.dispatchEvent(new Event("consentLogsUpdated"));
}

export function generateDummyMetadata(consumerId?: string) {
  const ip = `${Math.floor(Math.random() * 200)}.${Math.floor(
    Math.random() * 200
  )}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`;
  const devices = [
    "iPhone 14 / iOS 17.0",
    "MacBook Pro / macOS 14",
    "Windows 11 / Chrome",
    "Android Pixel / Android 14",
  ];
  const deviceInfo = devices[Math.floor(Math.random() * devices.length)];
  return {
    ipAddress: ip,
    deviceInfo,
    consumerId: consumerId || uuidv4(),
  };
}

export function addConsentLog(partial: Partial<ConsentLog> & { channel: Channel; consentType: ConsentType; optedIn: boolean; userAction: string; disclosureId: string; metadata?: Partial<ConsentLog["metadata"]>; consumerId?: string; surface?: string; }) {
  const now = Date.now();
  const consumerId = partial.consumerId || uuidv4();
  const metadata = {
    surface: partial.surface || (partial.metadata && partial.metadata.surface) || "unknown",
    ipAddress: partial.metadata?.ipAddress,
    deviceInfo: partial.metadata?.deviceInfo,
  } as ConsentLog["metadata"];

  const log: ConsentLog = {
    id: uuidv4(),
    consumerId,
    channel: partial.channel,
    consentType: partial.consentType,
    optedIn: partial.optedIn,
    timestamp: now,
    userAction: partial.userAction,
    disclosureId: partial.disclosureId,
    metadata,
  };

  const logs = getConsentLogs();
  logs.unshift(log);
  saveConsentLogs(logs);
  return log;
}
