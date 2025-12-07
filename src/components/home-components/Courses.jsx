"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCoursesApi } from "../../axios/api";

export default function PopularCourse() {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCoursesApi();
        setCourses(res.data?.result || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
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
  if (!courses) return null;

  return (
    <section className="w-full py-10" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-8 lg:mb-10"
        >
          <h2 className="relative text-[28px] sm:text-[32px] md:text-[40px] font-extrabold mb-3 lg:mb-5">
            Explore Our Courses
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#151515] max-w-2xl mx-auto">
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
              className="rounded-lg overflow-hidden shadow-md bg-white group flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative w-full h-[220px] overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={false}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h1 className="font-bold text-xl md:text-2xl">
                  {item.title.length > 50
                    ? item.title.slice(0, 50) + "..."
                    : item.title}
                </h1>

                {/* Button at bottom */}
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
    </section>
  );
}
