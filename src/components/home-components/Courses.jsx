"use client";

import React, { useEffect, useState, useRef } from "react";
import { getCoursesApi, getCourseBySlugApi } from "@/axios/api";
import HorizontalDivider from "@/components/HorizontalDivider";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PopularCourse() {
  const [courses, setCourses] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCoursesApi();
        setCourses(res.data?.result || null);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
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

  if (!courses) return null;

  return (
    <>
      <div className="max-w-7xl mx-auto " id="courses">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-10"
        >
          <h2 className="relative text-[28px] sm:text-[32px] md:text-[40px] font-extrabold mb-0 md:mb-3 lg:mb-5">
            Explore Our Courses
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-16 leading-relaxed text-center text-[#151515]">
            Our programs provide structured learning for academic and
            professional development.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {courses.map((item) => (
            <motion.div
              key={item._id}
              variants={cardVariants}
              className="rounded-lg overflow-hidden shadow-md  bg-white group flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full h-[220px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h1 className="font-bold text-xl md:text-2xl">
                  {item.title.length > 50
                    ? item.title.slice(0, 50) + "..."
                    : item.title}
                </h1>{" "}
                {/* Button pushed to bottom */}
                <div className="mt-auto">
                  <Link
                    href={`/course/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-white bg-[#186f3e] hover:bg-[#1cb15c] transition px-4 py-2 rounded-lg"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
