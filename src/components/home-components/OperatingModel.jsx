"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOperatingModelApi } from "../../axios/api";
import ImageCarousel from "../ImageCarousel";

export default function OperatingModel() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOperatingModelApi();
        setSection(res.data?.result || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!section) return null;

  // **md & lg:  staggered animation**
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const mdLgItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // **Mobile: animate one by one when in view**
  const mobileItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const slides = [
    {
      src: "/intern5.jpg",
      title: "",
      subtitle: "",
    },
    {
      src: "/intern4.jpg",
      title: "",
      subtitle: "",
    },
    {
      src: "/intern3.jpg",
      title: "",
      subtitle: "",
    },
  ];
  return (
    <section
      id="internship-opportunities"
      className="
        w-full bg-soft scroll-mt-32
    mt-10 sm:mt-14 lg:mt-10
    py-10 sm:py-14 
    "
    >
      {/* CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-primary-dark leading-tight">
            {section.mainTitle}
          </h1>
        </motion.div>

        {/* CAROUSEL */}
        <div className="max-w-7xl mb-6 mt-6 sm:mt-6 lg:mt-8 mx-auto">
          {" "}
          <ImageCarousel slides={slides} />{" "}
        </div>

        {/* DESKTOP & TABLET */}
        <motion.div
          className="hidden md:grid mt-10 sm:mt-12 lg:mt-16 grid-cols-1 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {section.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={mdLgItemVariants}
              className="
              rounded-3xl bg-white
              border border-[#E6D9F2]
              p-5 sm:p-6 lg:p-8
              shadow-[0_10px_26px_rgba(76,18,132,0.10)]
              hover:shadow-[0_16px_34px_rgba(76,18,132,0.14)]
              transition-shadow duration-300
            "
            >
              <h2 className="font-bold text-primary-dark text-lg sm:text-xl lg:text-2xl">
                {item.title}
              </h2>

              <div className="mt-4 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-5 lg:gap-8 items-center">
                <div className="rounded-2xl overflow-hidden bg-[#F3E8FF]">
                  <Image
                    src={
                      item?.image
                        ? `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`
                        : "/placeholder.png"
                    }
                    alt={item.title}
                    width={900}
                    height={600}
                    className="w-full h-[220px] sm:h-[240px] lg:h-[260px] object-cover"
                  />
                </div>

                <p className="text-sm sm:text-base text-[#4B3B57] leading-relaxed text-justify">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* MOBILE */}
        <div className="md:hidden mt-8">
          <div className="rounded-2xl bg-white border border-[#E6D9F2] p-4 shadow-[0_10px_26px_rgba(76,18,132,0.10)]">
            {section.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={mobileItemVariants}
                className="py-4"
              >
                <h3 className="font-bold text-primary-dark text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-[15px] leading-relaxed text-[#4B3B57] text-justify">
                  {item.description}
                </p>

                {idx !== section.items.length - 1 && (
                  <div className="border-b border-[#E6D9F2] mt-5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
