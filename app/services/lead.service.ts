import { LeadPayload } from "@/app/types/lead";

export const submitLead = async (data: LeadPayload) => {
  console.log("API Payload:", data); // ✅ DEBUG

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

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    console.error("Backend Error:", result); // ✅ IMPORTANT
    throw new Error(result.message || JSON.stringify(result));
  }

  return result;
};