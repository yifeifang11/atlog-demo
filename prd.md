📄 PRODUCT REQUIREMENTS DOCUMENT (PRD)
Product: TCPA Compliance Demo Site
Purpose

Create a single Next.js website demonstrating how Atlog can collect and manage TCPA-compliant consent across multiple user surfaces.
All state is stored via:

localStorage (for real user interactions)

dummy data (for fields that normally require backend systems)

This is a demo prototype, not a production system.

1. Objectives

Show how customers can provide TCPA-compliant opt-in across different touchpoints.

Demonstrate how Atlog logs, tracks, and audits consent.

Provide a dashboard that simulates a real CRM’s compliance tooling.

Keep implementation lightweight using only localStorage + mock data.

2. High-Level Features

Interactive Chatbot Widget (Global)

Reengagement Page (Email + SMS examples)

Self-Service Flows

Invoice

Warranty

FAQ

Churn Survey

TCPA Compliance Dashboard

3. Data Model

All real interactions generate a consent log stored in localStorage.

localStorage key:

consentLogs

localStorage record schema
{
  id: string,                     // uuid
  consumerId: string,             // fake or random for demo
  channel: "chatbot" | "email" | "sms" | "invoice" | 
           "warranty" | "faq" | "survey",
  consentType: "call" | "sms" | "email",
  optedIn: boolean,
  timestamp: number,
  userAction: string,             // "clicked_yes", "checked_checkbox", etc.
  disclosureId: string,           // e.g. "tcpadisclosure-v1"
  metadata: {
    surface: string,              // specific component name
    ipAddress?: string,           // dummy
    deviceInfo?: string           // dummy
  }
}

Dummy data generation

Copilot should generate synthetic values for:

IP address

deviceInfo

consumerId (unless user inputs a name/phone for demo)

These should be created automatically if not provided.

4. Pages and Components
4.1 Chatbot Widget

Purpose: Demonstrate real-time consent collection via a chatbot.

Requirements

Floating bubble (bottom-right).

On first open, show TCPA consent ask.

Clicking YES/NO logs consent event to localStorage.

Simple fake chat responses after consent captured.

Acceptance Criteria

Widget appears on all pages.

Consent log generated with correct channel="chatbot".

4.2 Reengagement Page

Route: /reengagement

Requirements

Email preview card with CTA.

SMS preview card with CTA.

CTA opens a modal with a TCPA disclosure + YES/NO buttons.

Log actions to localStorage.

Acceptance Criteria

Each CTA triggers a consent modal.

LocalStorage updated accordingly.

4.3 Self-Service Pages

Routes:

/self-service/invoice

/self-service/warranty

/self-service/faq

Requirements

Each page contains:

Basic UX flow (dummy data)

Consent prompt integrated naturally in flow

“Want us to contact you?” toggle or button

YES/NO stored to localStorage

Acceptance Criteria

Dummy content loads

Consent captured

Log includes correct channel)

4.4 Churn Survey

Route: /survey

Requirements

Simple multi-choice “Why did you leave?”

Last step = optional consent for reengagement messaging

YES/NO logs stored

Acceptance Criteria

Submission works

Consent stored in localStorage

5. TCPA Compliance Dashboard

Route: /dashboard

This is the centerpiece.

The dashboard must show both real logs (from localStorage) and generated dummy compliance metadata that would normally come from a backend CRM.

5.1 Dashboard Overview Page

Components:

Consent Summary Cards

of total events
opted in
opted out
revoked (dummy revocation events allowed for demo)

Consent Log Table (REAL DATA)
Columns:

consumerId

channel

consentType

status (Opt-In / Opt-Out)

timestamp

userAction

disclosureId

metadata (surface)

Table must read directly from localStorage.

Filter Panel
Filters by:

channel

consentType

status (opt-in / opt-out)

date range (optional)

5.2 Consent Detail Drawer (On Row Click)

Shows a detailed record.

Must show REAL DATA from localStorage:

timestamp

consentType

optedIn/optedOut

channel

userAction

surface

disclosureId

Must show DUMMY DATA (auto-generated):

IP address

device info

full disclosure text version used

simulated event trace (“received CTA → user clicked YES → logged event”)

5.3 Disclosure Version Viewer

Static list of disclosure texts.

Requirements

Show disclosureId (e.g., “tcpadisclosure-v1”)

Show exact text used

Allow clicking to preview

Acceptance Criteria

Each consent record links to the correct disclosure version.

5.4 Consent Timeline (Per Consumer)

For demo purposes:

If consumerId is repeated across events, show a timeline.

Include dummy revocation events to show lifecycle.

Requirements

Vertical timeline component

Uses real events for opt-ins/opt-outs

Uses synthetic events for revocation

5.5 Compliance Check Simulator

Small interactive card:

“If we contact this user right now, would it be TCPA-compliant?”

Inputs:

consumerId

channel you want to contact

Logic:

If latest consent for that channel is opt-in → “YES”

If latest consent is opt-out or revoked → “NO”

If no record → “NO — No valid consent on file”

All logic based purely on localStorage logs.

5.6 Audit Export (Mock)

Button: “Download TCPA Audit Report (CSV)”

Data should include:

All localStorage consent logs

Synthetic metadata

Disclosure versions

Export can be a generated CSV string.
No backend needed.

6. UI Requirements

Next.js App Router

Tailwind CSS

Clean, minimal Light Mode UI

Reusable ConsentModal component

Reusable timeline + details panel

7. Technical Requirements

All compliance logs stored via localStorage

Utility hooks:

useConsentLogs()

addConsentLog()

generateDummyMetadata()

useDisclosureVersions()

Dummy data generated at display time if missing

No external database

8. Routes Summary
/
/reengagement
/self-service/invoice
/self-service/warranty
/self-service/faq
/survey
/dashboard


Chatbot widget visible globally.

9. Non-Goals

No authentication

No true legal enforcement

No backend pipelines

No integration with real CRM or carriers

10. Success Criteria

All consent interactions write to localStorage

Dashboard accurately reads and visualizes consent lifecycle

Synthetic metadata makes the system feel “enterprise-ready”

Copilot Agent can build each component from these specs