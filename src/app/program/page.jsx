"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getProgramsApi } from "../../axios/api";

export default function CorePrograms() {
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProgramsApi();
        setProgram(res.data?.result || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const SkeletonLoad = () => (
    <div className="w-full bg-[#020726] text-white py-16">
      <div className="max-w-7xl mx-auto flex gap-8 lg:gap-16 lg:flex-row flex-col px-4 lg:px-0">
        {/* Left skeleton */}
        <aside className="lg:sticky h-fit lg:top-32 space-y-3">
          <div className="h-10 sm:h-12 md:h-14 bg-[#1b2750] rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-[#1b2750] rounded w-2/3 animate-pulse" />
        </aside>

        {/* Right skeleton cards */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 w-full">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[#2D3F88] bg-[#0B1335] animate-pulse h-40"
            >
              <div className="h-6 bg-[#1b2750] rounded w-2/3 mb-3" />
              <div className="h-4 bg-[#1b2750] rounded w-full mb-2" />
              <div className="h-4 bg-[#1b2750] rounded w-5/6 mb-2" />
              <div className="h-4 bg-[#1b2750] rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoad />;

  if (!program) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full py-10 ">
        <h1 className="text-[30px] sm:text-[36px] md:text-[44px] text-center font-extrabold leading-tight mb-4 ">
          {program.mainTitle || "Programs built with industry outcomes in mind"}
        </h1>
        <div className="flex justify-center gap-2 mt-6 mb-10">
          <span className="w-2 h-2 rounded-full bg-green" />
          <span className="w-8 h-2 rounded-full bg-green" />
          <span className="w-2 h-2 rounded-full bg-green" />
        </div>
        <section className="relative overflow-hidden lg:mb-4">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/program.png')",
              backgroundPosition: "center 70%",
            }}
          />

          {/* Blurred overlay + centered content */}
          <div className="relative backdrop-blur-md bg-[rgba(245,241,230,0.15)] flex items-center justify-center text-center min-h-[300px] md:min-h-[400px] px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4 max-w-2xl text-white"
            >
              <div className="space-y-2">
                <p className="text-3xl md:text-4xl font-bold">
                  {program.title}
                </p>
                <p className="text-lg md:text-xl">{program.duration}</p>
              </div>

              <p className="italic text-sm md:text-base font-semibold">
                {program.internationalInternshipAccess}
              </p>
            </motion.div>
          </div>
        </section>

        {/* SEMESTERS SECTION */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex justify-end gap-2 mb-6">
            {/* Left Arrow */}
            <button
              onClick={() =>
                document.getElementById("semesterScroll").scrollBy({
                  left: -350,
                  behavior: "smooth",
                })
              }
              className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white shadow-md hover:bg-black/80 transition"
            >
              <span className="text-xl">‹</span>
            </button>

            {/* Right Arrow */}
            <button
              onClick={() =>
                document.getElementById("semesterScroll").scrollBy({
                  left: 350,
                  behavior: "smooth",
                })
              }
              className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white shadow-md hover:bg-black/80 transition"
            >
              <span className="text-xl">›</span>
            </button>
          </div>

          {/* HORIZONTAL SCROLL WRAPPER */}
          <div
            id="semesterScroll"
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
          >
            {program.semesters.map((sem, index) => (
              <motion.div
                key={sem._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="min-w-[320px] md:min-w-[400px] bg-beige shadow-md border border-beige rounded-2xl p-6 snap-start hover:shadow-lg transition"
              >
                <h2 className="font-semibold text-xl text-gray-900 mb-3">
                  {sem.title}
                </h2>

                {/* Units */}
                {sem.units?.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-2">
                      Core Units
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-950 space-y-1">
                      {sem.units.map((u) => (
                        <li key={u._id || u.description}>{u.description}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Project */}
                {sem.project && (
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-2">
                      Project
                    </h3>
                    <p className="text-sm text-gray-950">{sem.project}</p>
                  </div>
                )}

                {/* Tracks */}
                {sem.tracks?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-black uppercase tracking-wide mb-2">
                      Tracks
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-950 space-y-1">
                      {sem.tracks.map((t) => (
                        <li key={t._id || t.description}>{t.description}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
}

// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { getWhyChooseUsApi } from "../../axios/api";
// // import { motion } from "framer-motion";

// // export default function CorePrograms() {
// //   const [section, setSection] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const res = await getWhyChooseUsApi();
// //         setSection(res.data?.result || null);
// //       } catch (error) {
// //         console.error(error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   const SkeletonLoad = () => (
// //     <div className="flex gap-5 lg:gap-24 lg:flex-row flex-col w-full">
// //       {/* Left side skeleton title */}
// //       <aside className="lg:sticky h-fit lg:top-32 space-y-3">
// //         <div className="h-10 sm:h-12 md:h-14 bg-gray-200 rounded w-3/4 animate-pulse" />
// //       </aside>

// //       {/* Right side skeleton cards */}
// //       <div className="space-y-3 md:space-y-5 w-full">
// //         {Array.from({ length: 3 }).map((_, idx) => (
// //           <div
// //             key={idx}
// //             className="flex gap-6 md:gap-8 p-5 rounded-lg border border-gray-200 shadow-md bg-gray-100 animate-pulse h-28 md:h-32"
// //           >
// //             <div className="flex-1 space-y-2">
// //               <div className="h-6 md:h-8 bg-gray-200 rounded w-1/2" />
// //               <div className="h-4 bg-gray-200 rounded w-full" />
// //               <div className="h-4 bg-gray-200 rounded w-full" />
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   if (loading) return <SkeletonLoad />;

// //   if (!section) return null;

// //   const cardVariants = {
// //     hidden: { opacity: 0, y: 50 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.6,
// //         ease: "easeOut",
// //       },
// //     },
// //   };

// //   return (
// //     <div className="flex gap-5 lg:gap-24 lg:flex-row flex-col max-w-7xl mx-auto">
// //       {/* Left side (Title section) */}
// //       <motion.aside
// //         initial={{ opacity: 0, y: 20 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true, amount: 0.5 }}
// //         transition={{ duration: 0.6, ease: "easeOut" }}
// //         className="lg:sticky h-fit lg:top-32"
// //       >
// //         <div className="space-y-2 md:space-y-3 lg:space-y-5 text-left">
// //           <h1 className="font-bold text-[28px] sm:text-[32px] md:text-[40px] text-[#204081] leading-tight">
// //             {section.mainTitle}
// //           </h1>
// //         </div>
// //       </motion.aside>

// //       {/* Right side (Cards) */}
// //       <div className="space-y-3 md:space-y-5">
// //         {section.items.map((item, idx) => (
// //           <motion.div
// //             key={idx}
// //             variants={cardVariants}
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, amount: 0.3 }}
// //             className="flex gap-6 md:gap-8 p-5 rounded-lg border border-gray-300 shadow-md bg-white items-center"
// //           >
// //             {/* Image (if needed) */}
// //             {/* <Image
// //               src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
// //               alt={item.title}
// //               width={40}
// //               height={40}
// //               className="object-contain mb-2"
// //             /> */}
// //             <div>
// //               <h1 className="font-bold text-xl md:text-2xl mb-2">
// //                 {item.title}
// //               </h1>
// //               <p className="text-[#151515] text-[15px] text-justify">
// //                 {item.description}
// //               </p>
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { getProgramsApi } from "../../axios/api";

// export default function CorePrograms() {
//   const [program, setProgram] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getProgramsApi();
//         setProgram(res.data?.result || null);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const SkeletonLoad = () => (
//     <div className="w-full bg-[#020726] text-white py-16">
//       <div className="max-w-7xl mx-auto flex gap-8 lg:gap-16 lg:flex-row flex-col px-4 lg:px-0">
//         {/* Left skeleton */}
//         <aside className="lg:sticky h-fit lg:top-32 space-y-3">
//           <div className="h-10 sm:h-12 md:h-14 bg-[#1b2750] rounded w-3/4 animate-pulse" />
//           <div className="h-4 bg-[#1b2750] rounded w-2/3 animate-pulse" />
//         </aside>

//         {/* Right skeleton cards */}
//         <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 w-full">
//           {Array.from({ length: 3 }).map((_, idx) => (
//             <div
//               key={idx}
//               className="p-5 rounded-2xl border border-[#2D3F88] bg-[#0B1335] animate-pulse h-40"
//             >
//               <div className="h-6 bg-[#1b2750] rounded w-2/3 mb-3" />
//               <div className="h-4 bg-[#1b2750] rounded w-full mb-2" />
//               <div className="h-4 bg-[#1b2750] rounded w-5/6 mb-2" />
//               <div className="h-4 bg-[#1b2750] rounded w-3/4" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) return <SkeletonLoad />;

//   if (!program) return null;

//   const cardVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     // <section className="w-full bg-green text-white pt-8 pb-16">
//     <section className="relative w-full py-10 bg-green overflow-hidden">
//       {/* Glow blobs background */}
//       <div className="pointer-events-none absolute inset-0 opacity-60">
//         <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-d7c097/20 blur-3xl" />
//         <div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
//         <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-72 w-[28rem] rounded-full bg-indigo-500/15 blur-3xl" />
//       </div>
//       <div className="max-w-7xl mx-auto flex gap-8 lg:gap-16 lg:flex-row flex-col px-6">
//         <motion.aside
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="lg:sticky h-fit lg:top-32 max-w-md"
//         >
//           <div className="space-y-3 md:space-y-4 lg:space-y-5 text-left ">
//             <h1 className="font-bold text-[28px] text-beige sm:text-[32px] md:text-[40px] leading-tight">
//               {program.mainTitle ||
//                 "Programs built with industry outcomes in mind"}
//             </h1>

//             <p className="text-sm md:text-base text-white">
//               Whether you are launching your robotics journey or leading
//               automation initiatives, our degrees and certificates combine deep
//               technical rigor with project delivery under live production
//               constraints.
//             </p>

//             <div className="mt-4 text-sm text-[#00E285]  space-y-1">
//               <p className="font-bold text-3xl">{program.title}</p>
//               <p className="font-bold text-2xl">{program.duration}</p>
//             </div>
//             <p className="font-semibold italic  text-beige">
//               {program.internationalInternshipAccess}
//             </p>
//           </div>
//         </motion.aside>

//         {/* Right side – semesters grid */}
//         <div className="w-full">
//           {program.semesters && program.semesters.length > 0 ? (
//             <div className="grid gap-5 md:gap-6 md:grid-cols-2 xl:grid-cols-2">
//               {program.semesters.map((sem, index) => (
//                 <motion.div
//                   key={sem._id}
//                   variants={cardVariants}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true, amount: 0.3 }}
//                   className="bg-[rgba(244,247,230,0.05)]  border border-white shadow-[0_0_10px_white] rounded-2xl  p-5 flex flex-col "
//                 >
//                   <div className="mb-3">
//                     {/* <p className="text-[11px] uppercase tracking-[0.18em] text-[#8FA3FF]">
//                       Semester {index + 1}
//                     </p> */}
//                     <h2 className="mt-1 font-semibold text-lg text-beige">
//                       {sem.title}
//                     </h2>
//                   </div>

//                   {sem.units && sem.units.length > 0 && (
//                     <div className="mt-1">
//                       <h3 className="text-[15px] font-bold text-[#00E285]  uppercase tracking-wide mb-1">
//                         Core Units
//                       </h3>
//                       <ul className="list-disc list-inside text-sm text-[#F0F4F8]  space-y-1">
//                         {sem.units.map((u) => (
//                           <li key={u._id || u.description}>{u.description}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}

//                   {sem.project && (
//                     <div className="mt-3">
//                       <h3 className="text-[15px] font-bold text-[#00E285]  uppercase tracking-wide mb-1">
//                         Project
//                       </h3>
//                       <p className="text-sm text-[#F0F4F8] ">{sem.project}</p>
//                     </div>
//                   )}

//                   {sem.tracks && sem.tracks.length > 0 && (
//                     <div className="mt-3">
//                       <h3 className="text-[15px] font-bold text-[#00E285]  uppercase tracking-wide mb-1">
//                         Tracks
//                       </h3>
//                       <ul className="list-disc list-inside text-sm text-[#F0F4F8]  space-y-1">
//                         {sem.tracks.map((t) => (
//                           <li key={t._id || t.description}>{t.description}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-sm text-[#C7D2FF]">
//               Semester structure will be published soon.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
