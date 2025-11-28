"use client";

import { useEffect, useState } from "react";
import ContentView from "react-froala-wysiwyg/FroalaEditorView";
import Link from "next/link";
import moment from "moment";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getAllNewsApi } from "../axios/api";
import Image from "next/image";

const SkeletonRecentNews = () => (
  <section className="pb-32 animate-pulse">
    <div className="text-center mb-12">
      <div className="mx-auto h-10 w-48 bg-gray-200 rounded mb-4" />
      <div className="mx-auto h-6 w-96 bg-gray-200 rounded" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="rounded-lg overflow-hidden shadow-md bg-white"
        >
          <div className="relative w-full h-[220px] bg-gray-200" />
          <div className="p-6 flex flex-col gap-3">
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="mt-4 h-9 w-24 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default function OurArticleComponent() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllNewsApi();
        if (response?.data?.success) {
          setNews(response.data.result); // Keep all news
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Show skeleton while loading
  if (loading) return <SkeletonRecentNews />;

  // Only show section if there are at least 3 news items
  if (news.length < 3) return null;

  // Take first 3 news items for display
  const latestThree = news.slice(0, 3);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-center mb-8 lg:mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold lg:font-extrabold text-[#262a2b]">
          Recent News
        </h2>
        <p className="font-medium mt-2 lg:mt-4 text-md lg:text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with our latest announcements and insights.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {latestThree.map((item) => (
          <motion.div
            key={item._id}
            variants={cardVariants}
            className="rounded-lg overflow-hidden shadow-md bg-white group flex flex-col h-full"
          >
            <div className="relative w-full h-[220px] overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
                alt={item.title}
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white text-[#186f3e] px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                {moment(item.createdAt).format("MMM DD")}
              </div>
            </div>

            <div className="p-6 flex flex-col gap-3 flex-1">
              <h3 className="text-lg font-bold text-[#186f3e]">
                {item.title.length > 50
                  ? item.title.slice(0, 50) + "..."
                  : item.title}
              </h3>

              <div className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[55px]">
                <ContentView
                  model={
                    item.description.length > 120
                      ? item.description.slice(0, 120) + "..."
                      : item.description
                  }
                />
              </div>

              <div className="mt-auto">
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-white bg-[#186f3e] hover:bg-[#0ab855] transition px-4 py-2 rounded-lg"
                >
                  Read More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
