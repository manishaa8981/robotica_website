"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getAdmissionsApi } from "../../axios/api";
// import { ErrorHandler } from "@/components/error/ErrorHandler";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function AdmissionsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdmissionsApi()
      .then((res) => {
        if (res.data?.success) setData(res.data.result);
      })
      .catch((err) => {
        // ignore "no data yet"
        if (err?.response?.status !== 404) ErrorHandler(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-[60vh] bg-[#020726] text-white flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-white border-t-transparent animate-spin" />
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-[60vh] bg-[#020726] text-white flex items-center justify-center px-4">
        <p className="text-sm md:text-base text-gray-300 text-center">
          Admissions information is not available at the moment. Please check
          back later.
        </p>
      </main>
    );
  }

  return (
    <main className="w-full bg-beige text-navy">
      {/* Hero */}
      <section
        className="relative h-60  md:pt-10 md:pb-10"
        style={{
          backgroundColor: "rgba(245, 241, 230, 0.6)",
          backgroundImage: `url('/bg-texture-lab.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl text-center sm:text-[40px] md:text-[48px] lg:text-5xl font-extrabold leading-tight mb-4 text-amber-100">
              {data.mainTitle}
            </h1>

            {data.load && (
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-green-600 text-xs sm:text-sm text-navy mb-4 mx-auto">
                <span className="inline-block h-2 w-2 rounded-full bg-green-600" />
                {Array.isArray(data.load) ? data.load.join(" • ") : data.load}
              </p>
            )}

            {/* <p className="text-m md:text-base text-center text-gray-600 max-w-xl mx-auto">
              Understand who this programme is for, how you&apos;ll be assessed,
              and what credentials you&apos;ll walk away with when you complete
              it.
            </p> */}
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="pb-10 pt-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* Prerequisites */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-green-600 bg-green/100 p-6 md:p-7 flex flex-col"
            >
              <p className="font-bold uppercase tracking-[0.18em] text-[#00E285] mb-2">
                Prerequisites
              </p>
              <h2 className="font-semibold text-lg text-beige mb-3">
                Who this programme is for
              </h2>
              <p className="text-xs text-amber-100 mb-4">
                Check if your background, skills, and interests match what we
                expect from incoming learners.
              </p>
              <ul className="space-y-2.5 text-sm text-beige">
                {(data.prerequisites || []).map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[7px] inline-block h-6px w-6px rounded-full bg-[#00E285]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Grading & Assessment */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-green-600 bg-green/100 p-6 md:p-7 flex flex-col"
            >
              <p className="font-bold uppercase tracking-[0.18em] text-[#00E285] mb-2">
                Grading & Assessment
              </p>
              <h2 className="font-semibold text-beige text-lg mb-3">
                How you&apos;ll be evaluated
              </h2>
              <p className="text-xs text-amber-100 mb-4">
                You&apos;ll be evaluated through a blend of projects, practical
                work, and checks for understanding.
              </p>
              <ul className="space-y-2.5 text-sm text-[#E5E7EB]">
                {(data.grading || []).map((g, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[7px] inline-block h-6px w-6px rounded-full bg-[#00E285]" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Badges & credentials */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl border border-green-600 bg-green/100 p-6 md:p-7 flex flex-col justify-between"
            >
              <div>
                <p className="font-bold uppercase tracking-[0.18em] text-[#00E285] mb-2">
                  Badges & Credentials
                </p>
                <h2 className="font-semibold text-beige text-lg mb-3">
                  What you leave with
                </h2>
                <p className="text-xs text-amber-100 mb-4">
                  Showcase your skills with credentials that highlight your
                  hands-on experience and readiness for industry.
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(data.badges || []).map((b, i) => (
                    <span
                      key={i}
                      className="text-11px px-3 py-1 rounded-full text-beige bg-white/10 border border-white/15"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tiny CTA block at bottom */}
              <div className="mt-6 pt-4 border-t border-[#00E285] text-xs text-gray-200">
                <p className="mb-2">
                  Ready to take the next step towards this programme?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-d7c097 hover:bg-d7c097 text-12px font-semibold text-[#020617] transition-colors"
                >
                  Talk to our admissions team
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Fees & Scholarships */}
      <section className="pb-10 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-0">
          <div className="rounded-2xl border border-green-600 bg-green/100 p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-beige mb-6">
              Fees & Scholarships
            </h2>

            <ul className="space-y-3 text-sm text-beige">
              <li className="flex gap-2">
                <span className="mt-7px h-6px w-6px rounded-full bg-[#00E285]" />
                <span>
                  <strong>Annual Tuition:</strong> USD $4,000
                </span>
              </li>

              <li className="flex gap-2">
                <span className="mt-7px h-6px w-6px rounded-full bg-[#00E285]" />
                <span>
                  <strong>South Asian Scholarship:</strong> 50% tuition for the
                  first 20 students (max 5 scholarships per country)
                </span>
              </li>

              <li className="flex gap-2">
                <span className="mt-7px h-6px w-6px rounded-full bg-[#00E285]" />
                <span>
                  <strong>Total Seats (Feb 2026):</strong> 50
                </span>
              </li>

              <li className="flex gap-2">
                <span className="mt-7px h-6px w-6px rounded-full bg-[#00E285]" />
                <span>
                  <strong>South Asia Agent Model:</strong>
                </span>
              </li>

              <li className="ml-6 flex gap-2 text-amber-100">
                <span className="mt-7px h-6px w-6px rounded-full bg-[#00E285]" />
                <span>
                  <strong>Referral Fee:</strong> 20% of tuition fee per enrolled
                  student
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
