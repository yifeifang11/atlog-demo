export const DISCLOSURES = [
  {
    id: "tcpadisclosure-v1",
    title: "TCPA Disclosure v1",
    text: `By providing your phone number, you consent to receive marketing and transactional communications, including autodialed and prerecorded calls or texts, from Demo Company. Message and data rates may apply. Reply HELP for help or STOP to opt out.`,
  },
  {
    id: "tcpadisclosure-v2",
    title: "TCPA Disclosure v2",
    text: `You agree to receive calls and SMS messages for service and marketing purposes. Consent is not required to make a purchase. Standard message rates may apply. Text STOP to opt out.`,
  },
];

export function getDisclosureById(id: string) {
  return DISCLOSURES.find((d) => d.id === id) || DISCLOSURES[0];
}
