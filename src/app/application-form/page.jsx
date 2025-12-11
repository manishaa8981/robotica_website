// src/app/application-form/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitApplicationApi } from "../../axios/api"; // later when backend is ready

const levels = [
  "20-hour School Explorer (Class 8–10)",
  "100-hour Foundation (Class 11–12 / First Year)",
  "6-Month Graduate Accelerator",
  "2-Year Diploma in Robotics & Automation",
];

export default function ApplicationFormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    level: "",
    schoolOrCollege: "",
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await submitApplicationApi(formData);

      if (res?.data?.success) {
        alert("Your application has been submitted! We will contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          level: "",
          schoolOrCollege: "",
          city: "",
          message: "",
        });
        router.push("/"); // or keep them on the same page if you prefer
      } else {
        alert(res?.data?.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-white  py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-dark text-center">
          Application Form
        </h1>
        <p className="text-center text-black mb-10 max-w-2xl mx-auto">
          Apply for our Robotics & Automation programmes. Fill in your details
          and our admissions team will reach out with the next steps.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-black border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
        >
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-black bg-white border border-white/10 focus:outline-none focus:border-primary-soft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-lg px-3 text-black py-2 bg-white border border-white/10 focus:outline-none focus:border-primary-soft"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-black bg-white border border-white/10 focus:outline-none focus:border-primary-soft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                required
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-black bg-white border border-white/10 focus:outline-none focus:border-primary-soft"
              />
            </div>
          </div>

          {/* Programme / Level */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Programme you are applying for *
            </label>
            <select
              name="level"
              required
              value={formData.level}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 text-black bg-white text-black border border-white/10 focus:outline-none focus:border-primary-soft"
            >
              <option value="">Select a programme</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* School/College + City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                School / College
              </label>
              <input
                type="text"
                name="schoolOrCollege"
                value={formData.schoolOrCollege}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-black bg-white border border-white/10 focus:outline-none focus:border-primary-soft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                City / Country
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 text-black bg-white border border-white/10 focus:outline-none focus:border-primary-soft"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tell us about your interest in Robotics
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg px-3 py-2 text-black bg-white border border-white/10 focus:outline-none focus:border-primary-soft"
              placeholder="Share any prior experience, why you want to join, etc."
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary btn-primary:hover text-white px-8 py-3 border-2 border-white rounded-full font-semibold disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
