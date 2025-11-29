"use client";

import { getMottoContentApi } from "../../axios/api";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuEye, LuTarget } from "react-icons/lu";

export default function MottoPage() {
  const [mottoData, setMottoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotto = async () => {
      try {
        const res = await getMottoContentApi();
        if (res.data?.success) {
          setMottoData(res.data.result);
        }
      } catch (err) {
        console.log("Error fetching motto:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMotto();
  }, []);

  // Skeleton Loader
  if (loading) {
    return (
      <section className="w-full py-20 px-4 bg-linear-to-br from-slate-50 via-white to-teal-50/30">
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="text-center mb-16">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-4 mx-auto" />
            <div className="h-12 w-96 bg-gray-200 rounded-lg mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 w-32 bg-gray-200 rounded" />
                      <div className="h-4 w-full bg-gray-200 rounded" />
                      <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded-3xl" />
          </div>
        </div>
      </section>
    );
  }

  if (!mottoData) return null;

  const heading = mottoData.motoTitle || "Our Mission & Vision";
  const missionText =
    mottoData?.mission?.text ||
    "Empowering innovation and excellence through dedicated service and continuous improvement.";
  const visionText =
    mottoData?.vision?.text ||
    "To be a global leader in delivering transformative solutions that create lasting value.";

  const imageSrc = "/missionvision.jpg";

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-10 lg:py-10 px-4  relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-10 lg:mb-10"
        >
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full mb-6"
          >
            <LuSparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-teal-700">
              Who We Are
            </span>
          </motion.div> */}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {heading}
          </h1>

          <div className="flex justify-center gap-2 mt-6">
            <span className="w-2 h-2 rounded-full bg-green" />
            <span className="w-8 h-2 rounded-full bg-green" />
            <span className="w-2 h-2 rounded-full bg-green" />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Right Column - Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full h-[500px] lg:h-[500px]">
              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 rounded-[3rem] overflow-hidden shadow-xl"
              >
                <Image
                  src={imageSrc}
                  alt="Mission and Vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-teal-600/20 to-transparent" />
              </motion.div>

              {/* Floating accent cards */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <LuSparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Excellence</div>
                    <div className="font-bold text-gray-900">Guaranteed</div>
                  </div>
                </div>
              </motion.div> */}

              {/* <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <LuTarget className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Goal-Driven</div>
                    <div className="font-bold text-gray-900">Approach</div>
                  </div>
                </div>
              </motion.div> */}
            </div>
          </motion.div>

          {/* Left Column - Mission & Vision Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Vision Card */}
            <motion.div
              variants={scaleIn}
              className="group bg-white rounded-3xl p-8 shadow-lg  hover:shadow-sm transition-all duration-300 border border-gray-200 hover:border-teal-100"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center shadow-sm shadow-green-100/50 group-hover:scale-110 transition-transform duration-300">
                    <LuEye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Our Vision
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{visionText}</p>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={scaleIn}
              className="group bg-white rounded-3xl p-8 shadow-lg  hover:shadow-sm transition-all duration-300 border border-gray-200 hover:border-teal-100"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full bg-green flex items-center justify-center shadow-lg shadow-green-200/50 group-hover:scale-110 transition-transform duration-100">
                    <LuTarget className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{missionText}</p>
                </div>
              </div>
            </motion.div>

            {/* Stats or Additional Info */}
            {/* <motion.div
              variants={scaleIn}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              <div className="text-center p-4 bg-white/80 backdrop-blur rounded-2xl border border-gray-100">
                <div className="text-2xl font-bold text-teal-600 mb-1">10+</div>
                <div className="text-xs text-gray-600">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur rounded-2xl border border-gray-100">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  500+
                </div>
                <div className="text-xs text-gray-600">Projects Done</div>
              </div>
              <div className="text-center p-4 bg-white/80 backdrop-blur rounded-2xl border border-gray-100">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  98%
                </div>
                <div className="text-xs text-gray-600">Client Satisfaction</div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
