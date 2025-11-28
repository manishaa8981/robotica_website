"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import animationData from "../../../public/empty.json";
import { getCoursesApi } from "../../axios/api";
import Image from "next/image";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-200 animate-pulse">
    <div className="h-[220px] w-full bg-gray-200 rounded-t-2xl" />
    <div className="p-6 space-y-3">
      <div className="h-5 w-3/4 bg-gray-200 rounded" />
      <div className="h-10 w-1/2 bg-gray-200 rounded-lg mt-4" />
    </div>
  </div>
);

const SkeletonHeading = () => (
  <div className="mb-10 max-w-6xl space-y-3 animate-pulse">
    <div className="h-12 w-2/3 bg-gray-200 rounded" />
    <div className="h-4 w-1/2 bg-gray-200 rounded" />
  </div>
);

export default function ExploreCoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesApi();
        if (response.data.success) {
          setCourses(response.data.result);
        } else {
          setError("Failed to fetch courses.");
        }
      } catch (err) {
        console.error("Error fetching courses", err);
        setError("Error loading courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <section className="w-full pt-32 pb-20 px-6 md:px-[6vw] xl:px-[8vw]">
        <SkeletonHeading />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
          {Array.from({ length: 2 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </section>
    );

  if (error)
    return (
      <p className="text-center text-red-600 text-lg font-semibold">{error}</p>
    );

  return (
    <section className="w-full pt-32 pb-20 px-6 md:px-[6vw] xl:px-[8vw]">
      {courses.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 lg:mb-10 max-w-7xl">
            <h1 className="text-4xl mb-0 md:mb-4 font-bold">
              {" "}
              Explore Our Courses
            </h1>
            <p className="text-gray-600 text-base max-w-xl">
              Gain practical skills and knowledge through expertly crafted
              courses.
            </p>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl">
            {courses.map((course) => (
              <div
                key={course.slug}
                className="bg-white rounded-2xl shadow-md border border-gray-200 transition duration-300 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-[220px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${course.image}`}
                    alt={course.title}
                    fill
                    className="w-full h-[220px] object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3 grow">
                  <h2 className="text-lg lg:text-xl font-bold text-[#186f3e]">
                    {course.title.length > 50
                      ? course.title.slice(0, 50) + "…"
                      : course.title}
                  </h2>

                  <div className="mt-auto">
                    <button
                      onClick={() => router.push(`/course/${course.slug}`)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#186f3e] hover:bg-[#1ea056] transition px-4 py-2 rounded-lg"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
          />
          <p className="text-gray-500 text-xl font-semibold text-center mt-10 col-span-full">
            No courses available yet.
          </p>
        </div>
      )}
    </section>
  );
}
