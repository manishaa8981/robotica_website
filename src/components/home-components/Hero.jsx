"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getBannerApi } from "../../axios/api";

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
  }),
};

export const HeroBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBannerApi();
        if (res.data.success) setBanners(res.data.result);
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
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
  if (!banners || banners.length === 0) return null;

  return (
    <section className="hero-bg relative w-full min-h-[85vh] sm:min-h-[70vh] flex items-center overflow-hidden py-10 sm:py-14 lg:py-10">
      {banners.map((banner) => (
        <div
          key={banner._id}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          {/* Left Column */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial="hidden"
            animate="visible"
          >
            <motion.h4
              variants={textVariant}
              custom={0}
              className="text-primary-soft font-semibold text-lg md:text-xl mb-2"
            >
              Hands-on degrees
            </motion.h4>
            <motion.h1
              variants={textVariant}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-soft leading-tight mb-6"
            >
              Build Robots. <br />
              <span className="text-yellow-500"> Build Futures.</span>
            </motion.h1>
            <motion.p
              variants={textVariant}
              custom={2}
              className="text-primary-soft text-lg md:text-xl lg:text-xl text-justify mb-8"
            >
              {banner.description}
            </motion.p>
            <motion.div
              variants={textVariant}
              custom={3}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <a
                href="/application-form"
                className="btn-primary btn-primary:hover text-white px-8 py-3 shadow-sm rounded-full font-semibold transition-all duration-300 hover:shadow-xl"
              >
                Apply Now
              </a>
              <a
                href="/signaturelabs"
                className="bg-primary-soft border   btn-primary:hover shadow-sm font-semibold px-6 py-3 rounded-full transition text-black"
              >
                Book a Lab Tour
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="flex-1 relative w-full lg:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            //              animate={{ y: [0, -10, 0] }}
            //  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[600px] lg:h-[600px] mx-auto">
              {/* Main circular image */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/home2.jpg"
                  alt="Robo Lab"
                  fill
                  className="object-cover object-[10%_center] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                />
                <div className="absolute inset-0 bg-linear-to-tr from-teal-600/10 to-transparent" />
              </div>
              {/* Floating accent cards - Top Left */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -top-1  bg-primary-soft rounded-2xl p-4 shadow-xl border  z-10"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-[10px] sm:text-xs text-gray-800">
                      Duration
                    </div>

                    <div className="font-bold text-gray-900 text-xs sm:text-sm md:text-base leading-tight">
                      2 Years Course
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Floating accent card - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -bottom-3 -right-1 bg-primary-soft  rounded-2xl p-4 shadow-xl z-10"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-[10px] sm:text-xs text-gray-800">
                      Learning Style
                    </div>

                    <div className="font-bold text-gray-900 text-xs sm:text-sm md:text-base leading-tight">
                      Hands-on Learning
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* Floating accent card - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute top-1/2 -translate-y-1/2 -right-18 bg-primary-soft rounded-2xl p-4 shadow-xl z-10"
              >
                <div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-gray-800">
                      Approach
                    </div>

                    <div className="font-bold text-gray-900 text-xs sm:text-sm md:text-base leading-tight">
                      Practical Implementation
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
};
