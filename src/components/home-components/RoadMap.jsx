"use client";

import React, { useEffect, useState } from "react";
import { getAllRoadMapsApi } from "../../axios/api";
import { motion } from "framer-motion";

export default function RoadMap() {
  const [roadMaps, setRoadMaps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRoadMaps = async () => {
    try {
      const res = await getAllRoadMapsApi();
      if (res.data.success) setRoadMaps(res.data.result);
    } catch (err) {
      console.log("Error fetching roadmap:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadMaps();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
  };

  if (!roadMaps.length) return null;

  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-soft mb-4 leading-tight">
          24 Month Roadmap
        </h1>
        <p className="text-base sm:text-lg lg:text-xl mb-16 leading-relaxed text-center text-[#151515]">
          Over the next 24 months, we will broaden our academy offerings,
          increase campus engagement, and establish new collaboration channels
          with industry and international partners. The emphasis remains on
          structured growth and measurable learner impact.
        </p>
      </motion.div>

      {/* Large screens */}
      <div className="hidden md:block relative">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-[#186f3e]/30" />
        <div className="space-y-14">
          {roadMaps.map((rm, idx) => (
            <motion.div
              key={rm._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className={`relative flex items-center justify-between gap-6 md:gap-12 ${
                idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <span className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-[#186f3e] border-4 border-white rounded-full shadow-md shadow-green-600/40" />
              {/* Card */}
              <div className="w-full md:w-[46%] bg-white border border-gray-200 rounded-xl p-6 shadow-md">
                <h2 className="font-bold text-xl md:text-2xl mb-4">
                  {rm.title}
                </h2>
                {rm.description ? (
                  <div
                    className="text-[15px] text-[#151515]"
                    dangerouslySetInnerHTML={{ __html: rm.description }}
                  />
                ) : (
                  <p className="italic text-center text-[#151515]">
                    No description provided.
                  </p>
                )}
              </div>
              <div className="hidden md:block w-[46%]" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile screens */}
      <div className="md:hidden relative pl-10 max-w-4xl mx-auto">
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#186f3e]/30" />

        <div className="space-y-8">
          {roadMaps.map((proc) => (
            <motion.div
              key={proc._id}
              className="relative group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
            >
              <span className="absolute -left-2.5 top-3 w-5 h-5 rounded-full bg-[#186f3e] border-4 border-gray-50 shadow-md shadow-green-600/50" />

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                <h2 className="font-bold text-xl md:text-2xl mb-4 mt-6">
                  {proc.title}
                </h2>

                {proc.description ? (
                  <div
                    className="text-lg max-w-none mt-2 text-[#262a2b]"
                    dangerouslySetInnerHTML={{ __html: proc.description }}
                  />
                ) : (
                  <p className="italic text-center text-[#151515]">
                    No description provided.
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
