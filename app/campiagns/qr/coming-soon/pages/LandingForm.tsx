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
  const [isUpdate, setUpdate] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const [formData, setFormData] = useState<LeadPayload>({
    name: "",
    phone: "",
    location: "",
    area: "",
    source: "",
    userType: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get("area") || "Your Area";
    const sourceParam = params.get("source");

    setFormData((prev) => ({
      ...prev,
      area: areaParam,
      source: sourceParam === "qr" ? "qr" : "link",
    }));

    setArea(areaParam);
  }, []);

  // ✅ FIXED handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let error = "";

    // Name validation
    if (name === "name") {
      if (value && !/^[a-zA-Z\s]+$/.test(value)) {
        error = "Only letters and spaces allowed";
      }
    }

    // Phone validation
    if (name === "phone") {
      if (value && !/^\d+$/.test(value)) {
        error = "Only numbers allowed";
      } else if (value.length > 10) {
        error = "Max 10 digits allowed";
      } else if (value.length > 0 && value.length < 10) {
        error = "Enter 10 digit number";
      }
    }

    // Location validation
    if (name === "location") {
      if (value && !/^[a-zA-Z\s]+$/.test(value)) {
        error = "Only letters and spaces allowed";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ FIXED handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.location) {
      alert("Please fill all fields");
      return;
    }

    if (errors.name || errors.phone || errors.location) {
      alert("Please fix errors before submitting");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    if (!formData.userType) {
      alert("Please select Owner or Renter");
      return;
    }

    try {
      setLoading(true);

      const result = await submitLead(formData);
      const data = result.data;

      const isUpdate =
        new Date(data.updatedAt).getTime() >
        new Date(data.createdAt).getTime();

      setUpdate(isUpdate);
      setSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted)
    return <SuccessMessage area={area} isUpdate={isUpdate} />;

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
          {errors.name && (
            <p className="text-xs text-red-400 mt-1">{errors.name}</p>
          )}

          <InputField
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
          )}

          <InputField
            name="location"
            placeholder="Your Location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && (
            <p className="text-xs text-red-400 mt-1">{errors.location}</p>
          )}

          <div className="flex w-full gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, userType: "owner" }))
              }
              className={`flex-1 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 font-medium ${
                formData.userType === "owner"
                  ? "bg-white text-black border-white-400 shadow-lg scale-[1.03]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
              }`}
            >
              Owner
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, userType: "renter" }))
              }
              className={`flex-1 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 font-medium ${
                formData.userType === "renter"
                  ? "bg-white text-black border-white-400 shadow-lg scale-[1.03]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
              }`}
            >
              Renter
            </button>
          </div>

          <Button loading={loading}>Join Waitlist</Button>

          <p className="text-xs text-gray-400 text-center mt-4 font-bold">
            We respect your privacy. No spam.
          </p>
        </form>
      </div>
    </div>
  );
}