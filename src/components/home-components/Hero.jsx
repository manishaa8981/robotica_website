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
    transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
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

  if (loading) return null;
  if (!banners || banners.length === 0) return null;

  const banner = banners[0];

  return (
    <section className="hero-bg relative w-full min-h-[85vh] sm:min-h-[80vh] flex items-center overflow-hidden">
      {/* overlay for contrast */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-radial-[circle_at_center] from-black/10 via-black/35 to-black/60" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-14">
        {/* HANDS (Responsive) */}
        <div className="pointer-events-none absolute inset-0">
          {/* MOBILE/TABLET hands */}
          <div className="md:hidden">
            {/* left */}
            <div className="absolute -left-10 top-[-20] opacity-60">
              <div className="relative w-[260px] h-[200px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                <Image
                  src="/handone.png"
                  alt="Robotic hand left"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* right */}
            <div className="absolute -right-10 bottom-[-80] opacity-60">
              <div className="relative w-[260px] h-[200px] drop-shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                <Image
                  src="/handdown.png"
                  alt="Robotic hand right"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* DESKTOP hands */}
          <div className="hidden md:block absolute left-[-60px] top-1/2 -translate-y-[65%]">
            <div className="relative w-[420px] h-[320px] lg:w-[520px] lg:h-[380px] drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <Image
                src="/handone.png"
                alt="Robotic hand left"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div className="hidden md:block absolute right-[-60px] top-1/2 -translate-y-[30%]">
            <div className="relative w-[420px] h-[320px] lg:w-[520px] lg:h-[380px] drop-shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
              <Image
                src="/handdown.png"
                alt="Robotic hand right"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* CENTER TEXT */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="
            relative z-10 flex flex-col items-center text-center
            max-w-[92%] sm:max-w-3xl mx-auto
            px-2 sm:px-0
          "
        >
          <motion.p
            variants={textVariant}
            custom={0}
            className="text-primary-soft tracking-wide font-semibold text-xs sm:text-base"
          >
            Hands-on Degrees
          </motion.p>

          <motion.h1
            variants={textVariant}
            custom={1}
            className="mt-4 text-3xl sm:text-6xl lg:text-7xl font-extrabold text-primary-soft leading-tight"
          >
            Build Robots <br />
            <span className="text-primary-soft">Build Future</span>
          </motion.h1>

          <motion.p
            variants={textVariant}
            custom={2}
            className="mt-5 sm:mt-6 text-white/80 text-sm sm:text-base leading-relaxed text-center"
          >
            {banner.description}
          </motion.p>

          <motion.div
            variants={textVariant}
            custom={3}
            className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <a
              href="/application-form"
              className="btn-primary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition w-full sm:w-auto text-center"
            >
              Apply Now
            </a>

            <a
              href="/signaturelabs"
              className="px-7 py-3 rounded-full font-semibold border border-white/25 text-white/90 bg-white/10 backdrop-blur hover:bg-white/15 transition w-full sm:w-auto text-center"
            >
              Lab Tour
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
