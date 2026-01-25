"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { applyJobApi, getVacancyBySlugApi } from "../../../axios/api";

export default function VacancyDetailsPage() {
  const { slug } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cvLink: "",
    coverLetter: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch vacancy
  useEffect(() => {
    if (!slug) return;
    const fetchJob = async () => {
      try {
        const res = await getVacancyBySlugApi(slug);
        if (res?.data?.success) setJob(res.data.result);
        else setJob(null);
      } catch (err) {
        console.error("Vacancy fetch error:", err);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append("fullName", formData.fullName);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("coverLetter", formData.coverLetter);
      if (formData.cvFile) {
        form.append("cv", formData.cvFile);
      }
      await applyJobApi(job._id, form);

      toast.success("Application submitted successfully!");
      setModalOpen(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        cv: null,
        coverLetter: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!job) return <p className="text-center mt-10">Job not found.</p>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6 relative">
      <Toaster />
      <h1 className="text-4xl font-bold text-primary-dark">{job.jobTitle}</h1>
      <p className="text-gray-600">{job.roleObjective}</p>
      {job.location && (
        <p className="text-gray-500 mt-4">
          <strong>Location:</strong> {job.location}
        </p>
      )}
      {job.programme && (
        <p className="text-gray-500">
          <strong>Programme:</strong> {job.programme}
        </p>
      )}

      {job.keyResponsibilities?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            {job.keyResponsibilities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {job.technicalQualifications?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside space-y-1">
            {job.technicalQualifications.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {job.applicationDeadline && (
        <p className="text-gray-500">
          <strong>Application Deadline:</strong>{" "}
          {new Date(job.applicationDeadline).toLocaleDateString()}
        </p>
      )}

      {/* Apply Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="mt-6 bg-primary-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-[#14532d] transition"
      >
        Apply Now
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-2xl font-bold"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-3xl font-bold text-primary-dark mb-2">
              Apply for {job.jobTitle}
            </h2>
            <p className="text-gray-600 mb-6">
              Fill in your details and upload your CV to apply for this
              position.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none"
              />

              {/* File Upload */}
              <label className="block border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-primary-dark transition">
                <input
                  type="file"
                  name="cv"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cvFile: e.target.files[0],
                    }))
                  }
                  required
                />
                <span className="text-gray-500">
                  {formData.cvFile
                    ? formData.cvFile.name
                    : "Upload your CV (PDF only)"}
                </span>
              </label>

              <textarea
                name="coverLetter"
                placeholder="Cover Letter"
                rows={5}
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary-dark hover:bg-[#14532d] text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
