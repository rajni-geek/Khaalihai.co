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
    userType: "", // ✅ must be empty initially
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get("area") || "Your Area";
    const sourceParam = params.get("source");

    console.log("URL Params:", { areaParam, sourceParam }); // ✅ DEBUG

    setFormData((prev) => ({
      ...prev,
      area: areaParam,
      source: sourceParam === "qr" ? "qr" : "Link", // ✅ FIXED (case sensitive)
    }));

    setArea(areaParam);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "name" && value && !/^[a-zA-Z\s]+$/.test(value)) {
      error = "Only letters allowed";
    }

    if (name === "phone") {
      if (value && !/^\d+$/.test(value)) error = "Only numbers allowed";
      else if (value.length > 10) error = "Max 10 digits";
      else if (value.length > 0 && value.length < 10)
        error = "Enter 10 digits";
    }

    if (name === "location" && value && !/^[a-zA-Z\s]+$/.test(value)) {
      error = "Only letters allowed";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("FINAL DATA:", formData); // ✅ DEBUG

    if (!formData.name || !formData.phone || !formData.location) {
      alert("Please fill all fields");
      return;
    }

    if (errors.name || errors.phone || errors.location) {
      alert("Fix errors first");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Invalid phone");
      return;
    }

    if (!formData.userType) {
      alert("Select Owner or Renter");
      return;
    }

    try {
      setLoading(true);

      const result = await submitLead(formData);
      const data = result.data;

      const isUpdate =
        data?.updatedAt &&
        new Date(data.updatedAt).getTime() >
          new Date(data.createdAt).getTime();

      setUpdate(isUpdate);
      setSubmitted(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Submit error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted)
    return <SuccessMessage area={area} isUpdate={isUpdate} />;

  return (
    <div>
      <Heading area={area} />

      <form onSubmit={handleSubmit}>
        <InputField
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}

        <InputField
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p>{errors.phone}</p>}

        <InputField
          name="location"
          placeholder="Your Location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p>{errors.location}</p>}

        <div>
          <button
            type="button"
            onClick={() => {
              console.log("Selected owner");
              setFormData((prev) => ({ ...prev, userType: "owner" }));
            }}
          >
            Owner
          </button>

          <button
            type="button"
            onClick={() => {
              console.log("Selected renter");
              setFormData((prev) => ({ ...prev, userType: "renter" })); // ✅ FIXED
            }}
          >
            Renter
          </button>
        </div>

        <Button loading={loading}>Submit</Button>
      </form>
    </div>
  );
}