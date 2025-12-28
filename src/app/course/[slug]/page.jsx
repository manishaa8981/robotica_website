"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getCourseBySlugApi } from "../../../axios/api";

export default function CourseDetailsPage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCourse = async () => {
      try {
        const res = await getCourseBySlugApi(slug);
        if (res?.data?.success) setCourse(res.data.result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const totalHours = useMemo(() => {
    if (!course?.modules?.length) return 0;
    return course.modules.reduce(
      (sum, m) => sum + (Number(m.durationHours) || 0),
      0
    );
  }, [course]);
  const isDiploma = useMemo(() => {
    const levels = course?.level || [];
    return levels.some((lvl) => String(lvl).toLowerCase().includes("diploma"));
  }, [course]);

  if (loading) {
    return (
      <main className="w-full animate-pulse">
        {/* HERO SKELETON */}
        <section className="relative w-full h-[55vh] min-h-[340px] max-h-[620px] bg-black/10 overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />

          {/* Title overlay skeleton */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-4 pb-8">
              <div className="h-10 sm:h-12 lg:h-14 w-3/4 bg-white/15 rounded-xl" />

              <div className="mt-4 flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-20 bg-white/10 rounded-full border border-white/10"
                  />
                ))}
                <div className="h-7 w-32 bg-white/10 rounded-full border border-white/10" />
              </div>
            </div>
          </div>
        </section>

        {/* BODY SKELETON */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-8">
              <div className="lg:h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pr-4">
                {/* Description lines */}
                <div className="space-y-3">
                  <div className="h-4 w-full bg-black/10 rounded" />
                  <div className="h-4 w-11/12 bg-black/10 rounded" />
                  <div className="h-4 w-10/12 bg-black/10 rounded" />
                  <div className="h-4 w-full bg-black/10 rounded" />
                  <div className="h-4 w-9/12 bg-black/10 rounded" />
                  <div className="h-4 w-4/6 bg-black/10 rounded" />
                </div>

                {/* Modules heading */}
                <div className="h-7 w-40 bg-black/10 rounded-lg mt-10 mb-4" />

                {/* Modules cards */}
                <div className="space-y-4 pb-10">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-gray-200 p-5 bg-white"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="h-5 w-2/3 bg-black/10 rounded" />
                        <div className="h-4 w-16 bg-black/10 rounded" />
                      </div>
                      <div className="space-y-2 mt-3">
                        <div className="h-4 w-full bg-black/10 rounded" />
                        <div className="h-4 w-5/6 bg-black/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT STICKY SUMMARY */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-6">
                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <div className="h-5 w-44 bg-black/10 rounded mb-2" />
                    <div className="h-4 w-36 bg-black/10 rounded" />
                  </div>

                  <div className="max-h-[60vh] overflow-auto">
                    <div className="p-3 space-y-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="h-6 w-10 bg-black/10 rounded" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-full bg-black/10 rounded" />
                            <div className="h-3 w-24 bg-black/10 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 flex items-center justify-center">
                    <div className="h-11 w-48 bg-black/10 rounded-full" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    );
  }

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </div>
    );
  }

  return (
    <main className="w-full">
      {/* Full width hero image */}
      <section className="relative w-full h-[55vh] min-h-[340px] max-h-[620px] bg-black">
        <img
          src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${course.image}`}
          alt={course.title}
          className="h-full w-full object-cover"
        />

        {/* subtle overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* title overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 pb-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
              {course.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-2">
              {course.level?.map((lvl) => (
                <span
                  key={lvl}
                  className="text-xs px-2 py-1 rounded-full bg-white/10 text-white border border-white/15 backdrop-blur"
                >
                  {lvl}
                </span>
              ))}
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/15 text-green-200 border border-green-400/20 backdrop-blur">
                Total {totalHours} hours
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: scrollable content */}
          <div className="lg:col-span-8">
            <div className="lg:h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pr-4">
              {/* Description */}
              <div
                className="prose max-w-none text-justify"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />

              {/* Modules detail */}
              <h2 className="text-xl font-semibold mt-10 mb-4">
                {isDiploma ? "Semesters" : "Modules"}
              </h2>

              <div className="space-y-4 pb-10">
                {course.modules?.map((m, idx) => (
                  <div
                    key={idx}
                    id={`${isDiploma ? "semester" : "module"}-${idx + 1}`}
                    className="rounded-2xl border border-gray-200 p-5 bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-lg">
                        {idx + 1}. {m.title}
                      </h3>

                      {!isDiploma && (
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                          {m.durationHours} hrs
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-2 text-justify">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: sticky summary */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-6">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-lg">
                    {isDiploma ? "Semesters Summary" : "Modules Summary"}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Click a {isDiploma ? "semester" : "module"} to jump
                  </p>
                </div>

                <div className="max-h-[60vh] overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="text-left p-3 font-semibold text-gray-700 w-16">
                          #
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          {isDiploma ? "Semester" : "Module"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {course.modules?.map((m, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            document
                              .getElementById(
                                `${isDiploma ? "semester" : "module"}-${
                                  idx + 1
                                }`
                              )
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }}
                        >
                          <td className="p-3 text-gray-700 font-semibold">
                            {idx + 1}
                          </td>
                          <td className="p-3 text-gray-800">
                            <div className="font-medium line-clamp-2">
                              {m.title}
                            </div>
                            {!isDiploma && m.durationHours != null && (
                              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                                {m.durationHours} hrs
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 border-t border-gray-200 flex items-center justify-center">
                  <a
                    href="/application-form"
                    className="btn-primary text-white px-8 py-3 shadow-sm rounded-full font-semibold transition-all duration-300 hover:shadow-xl"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
