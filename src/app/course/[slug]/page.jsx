"use client";

import { useEffect, useState } from "react";
import { getCourseBySlugApi } from "@/axios/api";
import { useParams } from "next/navigation";
import Image from "next/image";

const SkeletonCourseDetail = () => (
  <section className="text-[#262a2b] pt-[5%] max-w-7xl mx-auto px-6 py-20 animate-pulse">
    <div className="relative h-[440px] bg-gray-200 rounded-lg mb-16" />
    <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-16">
      <div className="space-y-20">
        <div>
          <div className="h-10 bg-gray-200 rounded w-48 mb-6" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-5/6" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
        <div>
          <div className="h-10 bg-gray-200 rounded w-48 mb-10" />
          <div className="space-y-10 border-l-2 border-dashed border-gray-200 pl-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-gray-400 border-4 border-white shadow-md" />
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md ">
                  <div className="h-7 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="flex gap-4 mb-3">
                    <div className="h-5 bg-gray-200 rounded w-20" />
                    <div className="h-5 bg-gray-200 rounded w-20" />
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <aside className="h-fit lg:sticky lg:top-32">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md  p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-40" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 border border-gray-200 rounded-lg p-4"
            >
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      </aside>
    </div>
  </section>
);

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getCourseBySlugApi(slug);
        if (res.data.success) setCourse(res.data.result);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  const toggleModule = (idx) => {
    setExpandedModules((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  if (loading) return <SkeletonCourseDetail />;

  if (!course)
    return (
      <p className="p-8 text-center text-red-600 font-semibold text-lg">
        Course not found.
      </p>
    );

  return (
    <>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto text-[#262a2b] bg-white  flex items-center justify-center">
        <div className="px-6 pb-20 w-full pt-[8%] lg:pt-[3%] md:pt-[5%] flex md:flex-row flex-col gap-10">
          {/* Left Column (Content + Hero) */}
          <div className="space-y-10 md:w-[65%]">
            {/* Title + Accent */}
            <div className="mb-4 flex-col items-center max-w-5xl">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold relative inline-block">
                {course.title}
                <span className="block h-1 w-16 bg-[#186f3e] rounded mt-2"></span>
              </h3>
            </div>

            {/* Course Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-md max-w-5xl h-[500px]">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${course.image}`}
                alt={course.title}
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Course Description */}
            <section className="max-w-5xl">
              <p className="text-xl font-bold text-[#186f3e] mb-6 flex items-center gap-2">
                Course Overview
              </p>
              <div
                className="text-[#262a2b] text-justify text-base lg:text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </section>

            {/* Modules Timeline */}
            {Array.isArray(course.modules) && course.modules.length > 0 && (
              <section className="max-w-3xl">
                <p className="text-xl font-bold text-[#186f3e] mb-5 lg:mb-10 flex items-center gap-2">
                  Course Modules
                </p>
                <div className="relative border-l-2 border-dashed border-[#186f3e] pl-6 space-y-6 lg:space-y-10">
                  {course.modules.map((mod, idx) => (
                    <div key={idx} className="relative group">
                      <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-[#186f3e] border-4 border-gray-50 group-hover:scale-110 transition-transform shadow-md" />
                      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md  transition">
                        <h3 className="text-base lg:text-xl font-bold text-[#186f3e]">
                          {mod.name}
                        </h3>
                        <div className="text-base lg:text-xl text-[#262a2b] mt-1 flex gap-4 flex-wrap">
                          <p>
                            <strong>Weeks:</strong> {mod.durationWeeks}
                          </p>
                          <p>
                            <strong>Hours:</strong> {mod.durationHours}
                          </p>
                        </div>
                        {mod.description && (
                          <p className="text-sm lg:text-xl text-[#262a2b] mt-2 text-justify">
                            {mod.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column (Sticky Summary) */}
          <aside className="h-fit lg:sticky lg:top-32 md:w-[35%]">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md  p-6 space-y-2 max-w-full">
              <p className="text-xl font-bold text-[#186f3e] flex items-center">
                Quick Summary
              </p>

              {/* Modules Overview */}
              <div className="space-y-4">
                <h4 className="text-base lg:text-lg font-medium text-[#262a2b]">
                  Modules Overview
                </h4>
                {course.modules?.map((mod, i) => (
                  <div
                    key={i}
                    className="bg-[#f1fff7] border border-gray-200 rounded-lg py-5 px-6 transition"
                  >
                    <p className="font-bold text-lg text-[#186f3e]">
                      {mod.name}
                    </p>
                    <p className="text-sm lg:text-base font-medium text-[#262a2b] mt-1">
                      Learning Weeks: {mod.durationWeeks} weeks
                      <br />
                      Learning Hours: {mod.durationHours} hours of study
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
