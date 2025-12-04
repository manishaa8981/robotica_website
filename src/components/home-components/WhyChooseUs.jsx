"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Timer } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getWhyChooseUsApi } from "../../axios/api";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function WhyChooseUs() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getWhyChooseUsApi();
        setSection(res.data?.result || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!section) return null;

  // Use separate hero image if you add it later, otherwise fall back to first item
  const heroImage = section.heroImage || section.items?.[0]?.image || null;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl w-full px-4 lg:px-0">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col items-center mb-10"
        >
          <h1 className="text-center text-[30px] sm:text-[36px] md:text-[44px] font-extrabold text-black">
            {section.mainTitle}
          </h1>
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span className="w-8 h-2 rounded-full bg-green" />
            <span className="w-2 h-2 rounded-full bg-green" />
          </div>
        </motion.div>

        {/* Per–item layout (like the screenshot design) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 mb-10"
        >
          {section.items?.map((item, idx) => (
            <motion.div key={idx} variants={scaleIn} className="rounded-3xl">
              {/* WRAPPER FOR THIS ITEM */}
              <div className="space-y-6">
                {/* TOP ROW – three light cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Duration */}
                  {item.duration && (
                    <div className="bg-beige rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <p className="text-xs uppercase tracking-[0.18em] text-green mb-1">
                        <Timer className="size-15" />
                      </p>
                      <h3 className="text-lg font-bold text-black mb-2">
                        Programme Duration
                      </h3>
                      <p className="text-[15px] text-black leading-relaxed">
                        {item.duration}
                      </p>
                    </div>
                  )}

                  {/* Internships */}
                  {item.internship && (
                    <div className="bg-beige rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <p className="text-xs uppercase tracking-[0.18em] text-green mb-1">
                        <GraduationCap className="size-15" />
                      </p>
                      <h3 className="text-lg font-bold text-black mb-2">
                        Industry Exposure
                      </h3>
                      <p className="text-[15px] text-justify text-black leading-relaxed">
                        {item.internship}
                      </p>
                    </div>
                  )}

                  {/* Outcomes */}
                  {item.outcomes && (
                    <div className="bg-beige rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <p className="text-xs uppercase tracking-[0.18em] text-green mb-1">
                        <Award className="size-15" />
                      </p>
                      <h3 className="text-lg font-bold text-black mb-2">
                        What You&apos;ll Graduate With
                      </h3>
                      <p className="text-[15px] text-justify text-black leading-relaxed">
                        {item.outcomes}
                      </p>
                      {item.seats && (
                        <p className="mt-3 inline-flex items-center px-5 py-2 rounded-full bg-green text-white text-sm font-semibold hover:bg-green/80 transition">
                          <span className="font-bold text-white">
                            Seats:&nbsp;
                          </span>
                          {item.seats}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* SECOND ROW – dark highlight card, full width */}
                <div className="bg-green text-white rounded-2xl p-7 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold leading-snug mb-3">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[15px] text-justify text-beige leading-relaxed mb-4">
                        {item.description}
                      </p>
                    )}
                    {item.seats && !item.outcomes && (
                      <p className="text-xs text-justify text-blue-100">
                        <span className="font-semibold text-white">
                          Seats:&nbsp;
                        </span>
                        {item.seats}
                      </p>
                    )}
                  </div>

                  {/* <div className="mt-6">
                    <button className="inline-flex items-center px-5 gap-4 py-2 rounded-full border-green bg-white text-black text-sm font-semibold hover:bg-[#d7c097]/80 transition">
                      Explore this model <MoveRight strokeWidth={1} />
                    </button>
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Big image block – full space, no padding inside */}
        {heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full rounded-3xl overflow-hidden"
          >
            <img
              src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${heroImage}`}
              alt="Operating model hero"
              width={2000}
              height={400}
              className="w-full h-80 md:h-[400px] lg:h-[600px] object-cover"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
