"use client";

import React, { useEffect, useState } from "react";
import { getImpactsApi } from "../../axios/api";
import HorizontalDivider from "../../components/HorizontalDivider";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Impacts() {
  const [section, setSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getImpactsApi();
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // **Mobile: animate one by one when in view**
  const mobileItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <div className="mx-auto max-w-7xl flex flex-col items-start lg:items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col items-center mt-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-soft mb-4 leading-tight">
            {section.mainTitle}
          </h1>
        </motion.div>

        {/* md & lg screens */}
        <motion.div
          className="hidden md:grid grid-cols-2 gap-2 lg:gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={mdLgItemVariants}
              className="flex flex-col gap-3 p-6 rounded-lg border border-gray-200 shadow-md transition-colors duration-300 hover:bg-green-50"
            >
              {/* <img
                src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`
                alt={item.title}
                className="w-8 h-8 object-fill mb-2"
              /> */}
              <h1 className="font-bold text-xl md:text-2xl mb-2">
                {item.title}
              </h1>
              <p className="text-[#151515] text-[15px] text-justify">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile screens */}
        <div className="md:hidden grid grid-cols-1 gap-1 w-full">
          {section.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={mobileItemVariants}
              className="flex flex-col gap-3 rounded-lg transition-colors duration-300 hover:bg-gray-50"
            >
              <div className="flex gap-4">
                {/* <img
                  src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
                  alt={item.title}
                  className="w-6 h-6 object-contain mb-2"
                /> */}
                <h2 className="font-bold text-xl md:text-2xl">{item.title}</h2>
              </div>

              <p className="text-[15px] text-[#151515] text-justify">
                {item.description}
              </p>

              {/* Divider line visible only on mobile except after last item */}
              {idx !== section.items.length - 1 && (
                <div className="border-b border-gray-300 my-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
