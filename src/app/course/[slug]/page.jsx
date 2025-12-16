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

  if (loading) return <div className="p-10 text-center">Loading course...</div>;

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
              <h2 className="text-xl font-semibold mt-10 mb-4">Modules</h2>

              <div className="space-y-4 pb-10">
                {course.modules?.map((m, idx) => (
                  <div
                    key={idx}
                    id={`module-${idx + 1}`}
                    className="rounded-2xl border border-gray-200 p-5 bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold text-lg">
                        {idx + 1}. {m.title}
                      </h3>
                      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                        {m.durationHours} hrs
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
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
                  <h3 className="font-semibold text-lg">Modules Summary</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Click a module to jump
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
                          Module
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
                              .getElementById(`module-${idx + 1}`)
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
                            <div className="text-xs text-gray-500 mt-1">
                              {m.durationHours} hrs
                            </div>
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
