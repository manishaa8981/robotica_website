"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LuEye, LuTarget } from "react-icons/lu";
import { getMottoContentApi } from "../../axios/api";

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

  if (loading) {
    return (
      <section className="w-full bg-soft pt-10 px-4 lg:pt-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto mb-20 relative z-10 sm:px-6 lg:px-0 animate-pulse">
          {/* Title */}
          <div className="text-center mb-10 lg:mb-10">
            <div className="h-12 sm:h-14 lg:h-16 w-3/4 sm:w-2/3 mx-auto bg-black/10 rounded-2xl mb-4" />
            <div className="h-4 w-44 mx-auto bg-black/10 rounded-lg" />
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Vision + Mission cards skeleton */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-2">
              {/* Card 1 */}
              <div className="rounded-3xl p-8 bg-white/70 shadow-lg border border-black/5">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-black/10 shrink-0" />
                  <div className="flex-1">
                    <div className="h-7 w-44 bg-black/10 rounded-lg mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-black/10 rounded" />
                      <div className="h-4 w-11/12 bg-black/10 rounded" />
                      <div className="h-4 w-9/12 bg-black/10 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-3xl p-8 bg-white/70 shadow-lg border border-black/5">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-black/10 shrink-0" />
                  <div className="flex-1">
                    <div className="h-7 w-44 bg-black/10 rounded-lg mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-black/10 rounded" />
                      <div className="h-4 w-11/12 bg-black/10 rounded" />
                      <div className="h-4 w-9/12 bg-black/10 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Image skeleton */}
            <div className="relative order-1 lg:order-1">
              <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[460px]">
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden bg-black/10 shadow-[0_20px_40px_rgba(76,18,132,0.15)]" />
              </div>
            </div>
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

  const imageSrc = "/cc.jpg";

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
    <section className="w-full bg-soft pt-10 px-4 lg:pt-10 relative overflow-hidden ">
      <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      <div className="max-w-7xl mx-auto mb-20 relative z-10  sm:px-6 lg:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-center mb-10 lg:mb-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
            {heading}
          </h1>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Mission & Vision Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-2"
          >
            {/* Vision Card */}
            <motion.div
              variants={scaleIn}
              className="card group rounded-3xl p-8 shadow-lg shadow-beige-50 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="  icon w-16 h-16 rounded-full flex items-center justify-center shadow-sm shadow-green-100/50 group-hover:scale-110 transition-transform duration-300">
                    <LuEye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    Our Vision
                  </h3>
                  <p className="text-black leading-relaxed sm:text-[15px]">{visionText}</p>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              variants={scaleIn}
              className="card group  rounded-3xl p-8 shadow-lg shadow-beige-50 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div
                    className=" icon  w-16 h-16 rounded-full  flex items-center justify-center shadow-[0_20px_40px_rgba(76,18,132,0.15)]
 group-hover:scale-110 transition-transform duration-300"
                  >
                    <LuTarget className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-3">
                    Our Mission
                  </h3>
                  <p className="text-black leading-relaxed">{missionText}</p>
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

          {/* Right Column - Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-1 lg:order-1"
          >
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[460px]">
              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute inset-0 rounded-[3rem] overflow-hidden  shadow-[0_20px_40px_rgba(76,18,132,0.15)]"
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
        </div>
      </div>
    </section>
  );
}
