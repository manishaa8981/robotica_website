"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdmissionsApi } from "../../axios/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
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
    <main className="w-full text--primary-soft mt-10 ">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-soft mb-8 text-center leading-tight">
        {data.mainTitle}
      </h1>
      <section className="relative mb-10 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-texture-lab.jpg')" }}
        />

        {/* Overlay */}
        <div className="relative h-60 md:h-64 lg:h-72 flex items-center justify-center backdrop-blur-md bg-[rgba(101,100,99,0.1)]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            {data.load && (
              <p className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-primary text-sm text-primary-dark bg-primary-soft">
                <span className="inline-block h-2 w-2 rounded-full bg-primary-dark" />
                {Array.isArray(data.load) ? data.load.join(" • ") : data.load}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ---------------------- CONTENT CARDS ---------------------- */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            {/* ---------------------- CARD 1: Prerequisites ---------------------- */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-primary-soft p-6 md:p-7 shadow-sm"
            >
              <p className="font-bold uppercase  text-primary mb-2">
                Prerequisites
              </p>

              <h2 className="font-bold text-lg text-black mb-3">
                Who this programme is for
              </h2>

              <p className="text-sm text-gray-900 mb-4">
                Check if your background, skills, and interests match what we
                expect from incoming learners.
              </p>

              <ul className="space-y-3 text-m text-black">
                {data.prerequisites?.map((p, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ---------------------- CARD 2: Grading & Assessment ---------------------- */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-primary-soft p-6 md:p-7 shadow-sm"
            >
              <p className="font-bold uppercase text-primary  mb-2">
                Grading & Assessment
              </p>

              <h2 className="font-bold text-lg text-black mb-3">
                How you'll be evaluated
              </h2>

              <p className="text-sm text-gray-900 mb-4">
                You&apos;ll be evaluated through a blend of projects, practical
                work, and checks for understanding.
              </p>

              <ul className="space-y-3 text-m text-black">
                {data.grading?.map((g, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-primary" />
                    {g}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ---------------------- CARD 3: Badges & Credentials ---------------------- */}
            <motion.div
              variants={fadeUp}
              className="rounded-2xl bg-primary-soft p-6 md:p-7 flex flex-col justify-between shadow-sm"
            >
              <div>
                <p className="font-bold uppercase text-primary  mb-2">
                  Badges & Credentials
                </p>

                <h2 className="font-bold text-lg text-black mb-3">
                  What you leave with
                </h2>

                <p className="text-sm text-gray-900 mb-4">
                  Showcase your skills with credentials that highlight your
                  hands-on experience.
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {data.badges?.map((b, i) => (
                    <span
                      key={i}
                      className="text-sm px-5 py-2 rounded-full text-white bg-primary border border-white/20"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-green text-sm text-black">
                <p className="mb-3">
                  Ready to take the next step towards this programme?
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full btn-primary text-black text-sm btn-primary:hover hover:text-black transition"
                >
                  Talk to our admissions team{" "}
                  <MoveRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
