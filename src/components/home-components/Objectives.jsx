"use client";

import React, { useEffect, useState } from "react";
import { getAllObjectivesApi } from "@/axios/api";
import { motion } from "framer-motion";

const SkeletonObjectives = () => (
  <div className="space-y-6 animate-pulse max-w-4xl mx-auto">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-40 bg-gray-100 rounded-xl shadow-md" />
    ))}
  </div>
);

export default function Objectives() {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchObjectives = async () => {
    try {
      const res = await getAllObjectivesApi();
      if (res.data.success) setObjectives(res.data.result);
    } catch (err) {
      console.log("Error fetching objectives:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) return <SkeletonObjectives />;
  if (!objectives.length) return null;

  return (
    <section className="max-w-7xl mx-auto ">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="px-6 mb-2 flex justify-center"
      >
        <div className="text-center">
          <h1 className="text-[28px] sm:text-[32px] md:text-[40px] font-extrabold">
            Strategic Objectives
          </h1>
          <span className="block h-1 w-1/2 mx-auto my-3 bg-linear-to-r from-[#11b658] to-[#186f3e] rounded"></span>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {objectives.map((obj, idx) => (
          <motion.div
            key={obj._id}
            variants={cardVariants}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex flex-col p-6">
              <span className="mb-3 text-4xl lg:text-5xl font-bold text-transparent [-webkit-text-stroke:2px_#186f3e] pointer-events-none">
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <h3 className="font-bold text-xl md:text-2xl wrap-break-word mt-auto mb-auto">
                {obj.title}
              </h3>
            </div>

            {/* Description */}
            <div className="px-6 pb-6 text-[15px] text-justify flex flex-col mt-auto mb-auto text-[#151515]">
              <div dangerouslySetInnerHTML={{ __html: obj.description }} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
