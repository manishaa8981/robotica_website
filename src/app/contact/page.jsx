"use client";

import { Mail, MapPin, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import { getInstitutionProfileApi, sendContactFormApi } from "../../axios/api";
import ContactInfoCard from "./ContactInfoCard";
import FloatingInput from "./FloatingInput";
import FloatingTextarea from "./FloatingTextarea";
const ContactUs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBeingSubmitted, setIsBeingSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    const isValidMobile = /^\d{10}$/.test(formData.mobileNumber);
    if (!isValidMobile) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsBeingSubmitted(true);
    try {
      const response = await sendContactFormApi(formData);
      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobileNumber: "",
          message: "",
        });
        setTimeout(() => setSuccessMessage(""), 1500);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setIsBeingSubmitted(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInstitutionProfileApi();
        if (!response.data?.success) throw new Error("Failed to fetch data");
        setData(response.data.result);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 animate-pulse">
          <div className="text-center mb-16">
            <div className="h-10 w-64 bg-white/10 rounded-lg mb-4 mx-auto" />
            <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto" />
          </div>
          <div className="grid gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10"
              >
                <div className="h-6 w-32 bg-white/10 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="h-4 w-5/6 bg-white/10 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 hero-bg pb-10">
      <section
        className="
        group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl max-w-7xl w-full max-h-max overflow-hidden grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-14 p-10 sm:grid-cols-1
        "
      >
        {/* Left Info Panel */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-3">
              Let&apos;s Connect
            </h1>
            <p className="text-sm md:text-base text-gray-100 mb-8 max-w-md">
              We&apos;d love to hear from you. Whether you have a question about
              admissions, labs, or partnerships, our team will get back to you
              as soon as possible.
            </p>

            <div className="space-y-5 ">
              <ContactInfoCard
                icon={<MapPin className="w-6 h-6  text-primary-dark" />}
                label="Location"
                value={data?.location || "Not Available"}
              />
              <ContactInfoCard
                icon={<PhoneCall className="w-6 h-6 text-primary-dark" />}
                label="Phone"
                value={data?.number || "Not Available"}
              />
              <ContactInfoCard
                icon={<Mail className="w-6 h-6 text-primary-dark" />}
                label="Email"
                value={data?.email || "Not Available"}
              />
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-white bg-white overflow-hidden h-48 sm:h-56 md:h-64">
            {data?.locationForMap ? (
              <>
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <div className="w-9 h-9 border-4 border-d7c097/80 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-300 text-xs sm:text-sm">
                      Loading map...
                    </span>
                  </div>
                )}
                <iframe
                  src={data.locationForMap}
                  title="Map"
                  aria-label="Institution Map"
                  className="w-full h-full border-0"
                  onLoad={() => setIsLoading(false)}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 text-sm italic">
                Map not available
              </div>
            )}
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Send us a message
            </h2>
            <p className="text-sm md:text-base text-gray-100">
              Share a few details and we&apos;ll reach out with the next steps.
            </p>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-d7c097/10 border border-green text-white bg-green-600 text-sm">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-400/20 border border-red-400/40 text-red-200 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-h-max pr-0 lg:pr-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FloatingInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <FloatingInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <FloatingInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FloatingInput
                label="Mobile Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            <FloatingTextarea
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              disabled={isBeingSubmitted}
              className="
                mt-2 w-full py-3.5 md:py-4 rounded-4xl btn-primary font-semibold btn-primary:hover border-2 border-white"
            >
              {isBeingSubmitted ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
