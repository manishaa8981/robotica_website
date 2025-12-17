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
      <main className="w-full bg-white">
        {/* Title Skeleton */}
        <div className="pt-10 sm:pt-0 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 animate-pulse">
            <div className="h-12 sm:h-14 lg:h-16 w-3/4 sm:w-2/3 mx-auto bg-black/10 rounded-2xl mt-10 mb-4" />
            <div className="h-4 w-48 mx-auto bg-black/10 rounded-lg mb-10" />
          </div>
        </div>

        {/* Hero Banner Skeleton (background + pill) */}
        <section className="relative mb-10 overflow-hidden">
          <div className="absolute inset-0 bg-black/5" />
          <div className="relative h-60 md:h-64 lg:h-72 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-12 w-[320px] sm:w-[420px] bg-black/10 rounded-full border border-black/10" />
            </div>
          </div>
        </section>

        {/* Cards Skeleton */}
        <section className="pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 animate-pulse">
            <div className="grid gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-primary-soft p-6 md:p-7 shadow-sm"
                >
                  {/* Top label */}
                  <div className="h-4 w-32 bg-black/10 rounded mb-3" />
                  {/* Heading */}
                  <div className="h-6 w-2/3 bg-black/10 rounded mb-4" />
                  {/* Paragraph */}
                  <div className="space-y-2 mb-5">
                    <div className="h-4 w-full bg-black/10 rounded" />
                    <div className="h-4 w-5/6 bg-black/10 rounded" />
                    <div className="h-4 w-4/6 bg-black/10 rounded" />
                  </div>

                  {/* Bullets */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <div className="mt-[6px] h-2 w-2 rounded-full bg-black/10" />
                        <div className="h-4 w-full bg-black/10 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* CTA skeleton only for card 3 */}
                  {i === 3 && (
                    <div className="mt-6 pt-4 border-t border-black/10">
                      <div className="h-4 w-5/6 bg-black/10 rounded mb-3" />
                      <div className="h-10 w-56 bg-black/10 rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
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
    <main className="w-full text--primary-soft bg-white">
      <div className="pt-10 sm:pt-0 bg-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-8 text-center leading-tight mt-10">
          {data.mainTitle}
        </h1>
      </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
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
              <p className="font-bold uppercase  text-primary-dark mb-2">
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
                    <span className="mt-[6px] inline-block h-2 w-2 rounded-full bg-primary-dark" />
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
              <p className="font-bold uppercase text-primary-dark  mb-2">
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
                <p className="font-bold uppercase text-primary-dark  mb-2">
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
                      className="text-sm px-5 py-2 rounded-full text-white bg-primary-dark border border-white/20"
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
