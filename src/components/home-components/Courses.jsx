// "use client";

// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { getCoursesApi } from "../../axios/api";

// export default function PopularCourse() {
//   const [courses, setCourses] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getCoursesApi();
//         setCourses(res.data?.result || null);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.3,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut",
//       },
//     },
//   };

//   if (loading) {
//     return (
//       <section className="w-full py-16 lg:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 animate-pulse">
//           <div className="text-center mb-16">
//             <div className="h-10 w-64 bg-white/10 rounded-lg mb-4 mx-auto" />
//             <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto" />
//           </div>
//           <div className="grid gap-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10"
//               >
//                 <div className="h-6 w-32 bg-white/10 rounded mb-4" />
//                 <div className="space-y-2">
//                   <div className="h-4 w-full bg-white/10 rounded" />
//                   <div className="h-4 w-5/6 bg-white/10 rounded" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }
//   if (!courses) return null;

//   return (
//     <section className="w-full py-10 mt-10" id="courses">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           viewport={{ once: true }}
//           className="text-center mb-8 lg:mb-10"
//         >
//           <h2 className="relative text-[28px] sm:text-[32px] md:text-[40px] font-extrabold mb-3 lg:m-10">
//             Explore Our Courses
//           </h2>
//           <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#151515] max-w-2xl mx-auto">
//             Our programs provide structured learning for academic and
//             professional development.
//           </p>
//         </motion.div>

//         {/* Cards */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//         >
//           {courses.map((item) => (
//             <motion.div
//               key={item._id}
//               variants={cardVariants}
//               className="rounded-lg overflow-hidden shadow-md bg-white group flex flex-col h-full"
//             >
//               {/* Image */}
//               <div className="relative w-full h-[220px] overflow-hidden">
//                 <Image
//                   src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
//                   alt={item.title}
//                   fill
//                   className="object-cover group-hover:scale-105 transition-transform duration-500"
//                   priority={false}
//                 />
//               </div>

//               {/* Content */}
//               <div className="p-6 flex flex-col gap-3 flex-1">
//                 <h1 className="font-bold text-xl md:text-2xl">
//                   {item.title.length > 50
//                     ? item.title.slice(0, 50) + "..."
//                     : item.title}
//                 </h1>

//                 {/* Button at bottom */}
//                 <div className="mt-auto">
//                   <Link
//                     href={`/course/${item.slug}`}
//                     className="inline-flex items-center gap-2 text-sm text-white bg-[#186f3e] hover:bg-[#1cb15c] transition px-4 py-2 rounded-lg"
//                   >
//                     View Details <ArrowRight size={16} />
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-0">
      {/* Header (mobile spacing fixed) */}
      <div className="mb-6 sm:mb-10  text-center m-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
          Our Courses
        </h1>
        {/* <p className="mt-3 text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto">
          Explore hands-on robotics programs designed for students, graduates,
          and future professionals.
        </p> */}
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
                        : "/placeholder.png"
                    }
                    alt={course?.title || "Course"}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.png";
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
