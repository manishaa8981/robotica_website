"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCoursesApi } from "../../axios/api";

const SkeletonCard = () => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-pulse">
    <div className="h-44 sm:h-48 w-full bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />

      <div className="pt-2 flex flex-wrap gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-14 bg-gray-200 rounded-full" />
      </div>

      <div className="pt-2 h-4 w-28 bg-gray-200 rounded" />
    </div>
  </div>
);

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCoursesApi();
        if (res?.data?.success) setCourses(res.data.result || []);
        else setCourses([]);
      } catch (err) {
        console.error(err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-0 mb-10">
      {/* Header (mobile spacing fixed) */}
      <div className="mb-6 sm:mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
          Our Courses
        </h1>
      </div>

      {/* Grid (better mobile sizing) */}
      <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : courses.length > 0
          ? courses.map((course) => (
              <Link
                key={course._id}
                href={`/course/${course.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="relative h-44 sm:h-48 bg-gray-100">
                  <img
                    src={
                      course?.image
                        ? `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${course.image}`
                        : "/placeholder.jpg"
                    }
                    alt={course?.title || "Course"}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-base sm:text-lg font-semibold line-clamp-2">
                    {course.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {(course.description || "").replace(/<[^>]*>/g, "")}
                  </p>

                  {!!(course.level || []).length && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(course.level || []).slice(0, 4).map((lvl) => (
                        <span
                          key={lvl}
                          className="text-xs px-2 py-1 rounded-full bg-gray-100"
                        >
                          {lvl}
                        </span>
                      ))}
                      {(course.level || []).length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                          +{course.level.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-4 text-sm font-semibold text-[#186f3e]">
                    View details →
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>

      {!loading && courses.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No courses available.</p>
      )}
    </main>
  );
}
