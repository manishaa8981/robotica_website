"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCoursesApi } from "../../axios/api";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCoursesApi();
        if (res?.data?.success) {
          setCourses(res.data.result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading courses...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Our Courses</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Link
            key={course._id}
            href={`/course/${course.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="relative h-48 bg-gray-100">
              <img
                src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${course.image}`}
                alt={course.title}
                className="h-full w-full object-cover group-hover:scale-[1.03] transition"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold">{course.title}</h2>

              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {course.description?.replace(/<[^>]*>/g, "")}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {(course.level || []).map((lvl) => (
                  <span
                    key={lvl}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100"
                  >
                    {lvl}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm font-semibold text-[#186f3e]">
                View details →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {courses.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No courses available.</p>
      )}
    </main>
  );
}
