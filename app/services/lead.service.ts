import { LeadPayload } from "@/app/types/lead";

export const submitLead = async (data: LeadPayload) => {
  const response = await fetch(
    "https://api.qr.examresults.org.in/api/submissions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    // backend ka actual error message throw karo
    throw new Error(result.message || "Failed to submit");
  }

  return result;
};