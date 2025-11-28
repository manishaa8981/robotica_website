"use client";

import { getBannerApi } from "@/axios/api";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SkeletonBanner = () => (
  <div className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gray-200 animate-pulse rounded-lg mb-16" />
);

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

  if (loading || banners.length === 0) return <SkeletonBanner />;

  return (
    <section className="relative w-full h-fit py-10 md:py-24 lg:py-10 bg-beige flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-72 w-[28rem] rounded-full bg-emerald-500/20 blur-3xl" />
      </div>
      {banners.map((banner) => (
        <div
          key={banner._id}
          className="container mx-auto px-10 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12"
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
              className="text-blue-950 font-semibold text-lg md:text-xl mb-2"
            >
              Hands-on degrees
            </motion.h4>
            <motion.h1
              variants={textVariant}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-950 leading-tight mb-6"
            >
              Build Robots. <br />
              Build Futures.
            </motion.h1>
            <motion.p
              variants={textVariant}
              custom={2}
              className="text-navy text-lg md:text-xl lg:text-xl mb-8"
            >
              {banner.description}
            </motion.p>
            <motion.div
              variants={textVariant}
              custom={3}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              {/* <a
                href="/admission"
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                Apply Now
              </a> */}
              <a
                href="/contact"
                className="bg-green hover:bg-green text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Apply Now
              </a>
              <a
                href="/labs"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
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
            <div className="relative w-100 h-100 md:w-96 md:h-96 lg:w-[600px] lg:h-[600px] mx-auto">
              {/* Main circular image */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/home1.jpg"
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
                className="absolute -top-1   bg-beige rounded-2xl p-4 shadow-xl border border-gray-100 z-10"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-bold text-gray-900">
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
                className="absolute -bottom-4 -right-2 bg-beige rounded-2xl p-4 shadow-xl border border-gray-100 z-10"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-xs text-gray-500">Learning Style</div>
                    <div className="font-bold text-gray-900">
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
                className="absolute top-1/2 -translate-y-1/2 -right-20 bg-beige rounded-2xl p-4 shadow-xl border border-gray-100 z-10"
              >
                <div>
                  <div>
                    <div className="text-xs text-gray-500">Approach</div>
                    <div className="font-bold text-gray-900 whitespace-nowrap">
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
