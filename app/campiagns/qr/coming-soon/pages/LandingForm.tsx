"use client";

import { useEffect, useState } from "react";
import Heading from "./Heading";
import SuccessMessage from "./SuccessMessage";
import Button from "@/app/component/Button";
import { submitLead } from "@/app/services/lead.service";
import { LeadPayload } from "@/app/types/lead";
import InputField from "@/app/component/InputField";

export default function LandingForm() {
  const [area, setArea] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    phone: "",
    location: "",
    area: "",
    source: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get("area") || "Your Area"; // fallback

    setArea(areaParam);

    setFormData((prev) => ({
      ...prev,
      area: areaParam,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.location) {
      alert("Please fill all fields");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    try {
      setLoading(true);

      console.log("Submitting:", formData); // debug

      await submitLead(formData);

      setSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error.message); // actual backend message
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <SuccessMessage area={area} />;

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      <div className="shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <Heading area={area} />

        <form onSubmit={handleSubmit} className="space-y-3">
          <InputField
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <InputField
            name="location"
            placeholder="Your Location"
            value={formData.location}
            onChange={handleChange}
          />

          <Button loading={loading}>Join Waitlist</Button>

          <p className="text-xs text-gray-400 text-center mt-4">
  We respect your privacy. No spam.
</p>
        </form>
      </div>
    </div>
  );
}