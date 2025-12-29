"use client";

import { motion } from "framer-motion";
import { Award, Globe, GraduationCap } from "lucide-react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getWhyChooseUsApi();
        setSection(res.data?.result || null);
      } catch (error) {
        console.error(error);
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
  if (!section) return null;

  // Use separate hero image if you add it later, otherwise fall back to first item
  const heroImage = section.heroImage || section.items?.[0]?.image || null;

  return (
    <section className="w-full p-10 bg-white">
      <div className="max-w-7xl mx-auto ">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col items-center mb-10"
        >
          <h1 className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
            {section.mainTitle}
          </h1>
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
                    <div className="card rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="shrink-0">
                          <div className="icon w-16 h-16 rounded-full flex items-center justify-center shadow-sm shadow-green-100/50">
                            <Globe className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg   text-center  font-bold text-black mb-2">
                            Global Industry Alignment
                          </h3>
                          <p className="text-[15px] text-black leading-relaxed">
                            {item.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Internships */}
                  {item.internship && (
                    <div className="card rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="shrink-0">
                          <div className="icon w-16 h-16 rounded-full flex items-center justify-center shadow-sm shadow-green-100/50">
                            <GraduationCap className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg  text-center font-bold text-black mb-2">
                            Internship Opportunitites
                          </h3>
                          <p className="text-[15px] text-justify text-black leading-relaxed">
                            {item.internship}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Outcomes */}
                  {item.outcomes && (
                    <div className="card rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="shrink-0">
                          <div className="icon w-16 h-16 rounded-full flex items-center justify-center shadow-sm shadow-green-100/50">
                            <Award className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg   text-center  font-bold text-black mb-2">
                            What You&apos;ll Graduate With
                          </h3>
                          <p className="text-[15px] text-justify text-black leading-relaxed">
                            {item.outcomes}
                          </p>
                          {item.seats && (
                            <p className="icon mt-3 inline-flex items-center px-5 py-2 rounded-full text-white text-sm font-semibold hover:bg-white/20 transition">
                              <span className="text-xs font-semibold text-white">
                                Seats:&nbsp;
                              </span>
                              {item.seats}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* SECOND ROW – dark highlight card, full width */}
                {/* <div className="card text-black rounded-2xl p-7 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold leading-snug mb-3">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[15px] text-justify text-black leading-relaxed mb-4">
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
                </div> */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Big image block – full space, no padding inside */}
        {/* {heroImage && (
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
        )} */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full rounded-3xl overflow-hidden"
        >
          <video
            src="/video1.mp4"
            poster="/poster/why-choose-us.jpg"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-80 md:h-[400px] lg:h-[600px] object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
