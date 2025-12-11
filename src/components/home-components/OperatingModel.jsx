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
    <main className=" w-full">
      <div className="mx-auto max-w-7xl flex flex-col items-start lg:items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col mt-10"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-soft mb-10 text-center leading-tight">
            {section.mainTitle}
          </h1>
        </motion.div>
        <div className="max-w-7xl mb-6 mx-auto">
          <ImageCarousel slides={slides} />
        </div>
        {/* md & lg screens */}
        <motion.div
          className="hidden md:grid grid-cols-1 gap-2 lg:gap-8 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {section.items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={mdLgItemVariants}
              className="flex flex-col gap-3  p-6 rounded-3xl border bg-primary-soft border-gray-200 shadow-md transition-colors duration-300 hover:bg-green-50"
            >
              <h1 className="font-bold text-primary-dark text-xl md:text-2xl mb-2">
                {item.title}
              </h1>
              <div className="flex justify-center gap-6 items-center">
                <Image
                  src={
                    item?.image
                      ? `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`
                      : "/placeholder.png"
                  }
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-fill mb-2"
                />
                <p className="text-black text-m text-justify">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile screens */}
        <div className="md:hidden bg-primary-soft grid grid-cols-1 gap-1 mx-4 my-4 rounded-lg p-4">
          {section.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={mobileItemVariants}
              className="flex flex-col gap-3 rounded-3xl px-4 py-4 transition-colors duration-300 hover:bg-gray-50"
            >
              <div className="flex gap-4">
                {/* <img
                  src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
                  alt={item.title}
                  className="w-6 h-6 object-contain mb-2"
                /> */}
                <h2 className="font-bold text-xl md:text-2xl">{item.title}</h2>
              </div>

              <p className="text-[15px] text-black text-justify">
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
    </main>
  );
}
