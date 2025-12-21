"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSignatureLabsApi } from "../../axios/api";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function SignatureLabs() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({}); // {labId: index}

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const res = await getSignatureLabsApi();
        if (res.data?.success) {
          setData(res.data.result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 animate-pulse">
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

  if (!data) return null;

  const { mainTitle, labs = [] } = data;

  const getEquipmentList = (lab) => {
    if (Array.isArray(lab.equipment)) return lab.equipment;
    const raw = lab.equipment || lab.equipments || "";
    return raw
      .split(/[\n,•\-]+/g)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const getHeroImageForLab = (lab) => {
    if (!lab.images || lab.images.length === 0) return null;
    const currentIndex = activeImageIndex[lab._id] ?? 0;
    return lab.images[currentIndex] || lab.images[0];
  };

  return (
    <section className="hero-bg relative w-full backdrop-blur-md py-10 overflow-hidden">
      <div className="absolute inset-0 bg-gray/100 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-0">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-d7c097/40 text-[11px] uppercase tracking-[0.2em] text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
            Signature Labs
          </div> */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-soft mb-4 leading-tight">
            {mainTitle || "Signature Labs & Equipment"}
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-primary-soft">
            Our signature labs are based in the United States and support
            learning through international collaboration and exposure.
          </p>
        </motion.div>

        {/* Labs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10 md:space-y-12"
        >
          {labs.map((lab, index) => {
            const equipmentList = getEquipmentList(lab);
            const heroImage = getHeroImageForLab(lab);
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={lab._id || lab.title || index}
                variants={cardVariants}
                className="relative rounded-3xl bg-white/10 backdrop-blur-md  shadow-[0_10px_10px_beige/40] overflow-hidden "
              >
                {/* Neon border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl " />

                <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 p-6 sm:p-8 lg:p-10">
                  {/* Text side */}
                  <div className={isEven ? "" : "md:order-2"}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary-soft  text-sm font-semibold uppercase  text-primary tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary  " />
                      Lab {index + 1}
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-white mb-3">
                      {lab.title}
                    </h3>

                    {lab.description && (
                      <p className="text-sm md:text-[15px] text-white mb-5 leading-relaxed">
                        {lab.description}
                      </p>
                    )}

                    {equipmentList.length > 0 && (
                      <div className="card rounded-2xl px-4 py-4 md:px-5 md:py-5 shadow shadow-slate-950/50">
                        <p className="text-m md:text-s font-bold  uppercase text-primary-dark mb-2">
                          Key Equipment
                        </p>
                        <ul className="space-y-1.5 text-[13px] md:text-sm text-black">
                          {equipmentList.slice(0, 6).map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary-dark shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                          {equipmentList.length > 6 && (
                            <li className="text-[12px] text-slate-400/90 mt-1">
                              + {equipmentList.length - 6} more instruments &
                              rigs in this lab
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Image + mini-gallery side */}
                  <div className={isEven ? "" : "md:order-1"}>
                    <motion.div
                      variants={imageVariants}
                      className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden bg-beige/80 border border-beige/80 ]"
                    >
                      {heroImage ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${heroImage}`}
                          alt={lab.title || "Lab image"}
                          fill
                          priority={index === 0}
                          sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover  scale-[1.02]"
                        />
                      ) : (
                        <div className="w-full h-full bg-beige flex items-center justify-center text-slate-500 text-xs">
                          Images coming soon for this lab
                        </div>
                      )}

                      {/* top gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/30" />

                      {/* lab badge */}
                      <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-primary-soft backdrop-blur-sm border border-slate-700/70 px-3 py-1 text-[11px] text-black shadow-[0_0_22px_rgba(15,23,42,0.9)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary-dark animate-pulse" />
                        <span>
                          {lab.images?.length
                            ? `${lab.images.length} image${
                                lab.images.length > 1 ? "s" : ""
                              }`
                            : "Photo tour"}
                        </span>
                      </div>
                    </motion.div>

                    {/* Thumbnail strip (only if multiple images) */}
                    {lab.images && lab.images.length > 1 && (
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                        {lab.images.map((imgName, i) => {
                          const isActive =
                            (activeImageIndex[lab._id] ?? 0) === i;
                          return (
                            <button
                              type="button"
                              key={`${lab._id}-${imgName}-${i}`}
                              onClick={() =>
                                setActiveImageIndex((prev) => ({
                                  ...prev,
                                  [lab._id]: i,
                                }))
                              }
                              className={`relative h-14 w-20 rounded-xl overflow-hidden border transition-all duration-200 shrink-0 ${
                                isActive
                                  ? "bg-primary-dark shadow-[0_0_12px_rgba(45,212,191,0.45)] scale-[1.02]"
                                  : "border-beige hover:border-[#96D5FF]/60 hover:scale-[1.02]"
                              }`}
                            >
                              <Image
                                src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${imgName}`}
                                alt="lab thumbnail"
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// yo xai paxi kaam lagla yesko design tei vayera rakheko
// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { getSignatureLabsApi } from "../../axios/api";

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

// const imageVariants = {
//   hidden: { opacity: 0, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// export default function SignatureLabs() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImageIndex, setActiveImageIndex] = useState({}); // {labId: index}

//   useEffect(() => {
//     const fetchLabs = async () => {
//       try {
//         const res = await getSignatureLabsApi();
//         if (res.data?.success) {
//           setData(res.data.result);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLabs();
//   }, []);

//   if (loading) {
//     return (
//       <section className="relative w-full py-20 bg-slate-950">
//         <div className="max-w-6xl mx-auto px-4 lg:px-0">
//           <div className="h-9 w-40 bg-slate-800/60 rounded-full animate-pulse mb-4" />
//           <div className="h-10 w-72 bg-slate-800/60 rounded-lg animate-pulse mb-10" />
//           <div className="space-y-6">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 animate-pulse"
//               >
//                 <div className="flex-1 space-y-4">
//                   <div className="h-6 w-2/3 bg-slate-800 rounded" />
//                   <div className="h-4 w-full bg-slate-800 rounded" />
//                   <div className="h-4 w-5/6 bg-slate-800 rounded" />
//                   <div className="h-4 w-3/4 bg-slate-800 rounded" />
//                 </div>
//                 <div className="w-full md:w-72 h-44 bg-slate-800 rounded-2xl" />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!data) return null;

//   const { mainTitle, labs = [] } = data;

//   const getEquipmentList = (lab) => {
//     if (Array.isArray(lab.equipment)) return lab.equipment;
//     const raw = lab.equipment || lab.equipments || "";
//     return raw
//       .split(/[\n,•\-]+/g)
//       .map((s) => s.trim())
//       .filter(Boolean);
//   };

//   const getHeroImageForLab = (lab) => {
//     if (!lab.images || lab.images.length === 0) return null;
//     const currentIndex = activeImageIndex[lab._id] ?? 0;
//     return lab.images[currentIndex] || lab.images[0];
//   };

//   return (
//     <section
//       className="relative w-full backdrop-blur-md bg-gray-500 py-10 overflow-hidden"
//       style={{
//         backgroundColor: "rgba(245, 241, 230, 0.6)",
//         backgroundImage: `url('/bg-texture.jpg')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Glow blobs background (keep if you want) */}
//       <div className="pointer-events-none absolute inset-0 opacity-60">
//         <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-d7c097/20 blur-3xl" />
//         <div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
//         <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-72 w-[28rem] rounded-full bg-indigo-500/15 blur-3xl" />
//       </div>
//       <div className="absolute inset-0 bg-gray/100 backdrop-blur-sm"></div>

//       <div className="relative max-w-7xl mx-auto px-4 lg:px-0">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="text-center mb-12 md:mb-16"
//         >
//           {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/70 border border-d7c097/40 text-[11px] uppercase tracking-[0.2em] text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
//             Signature Labs
//           </div> */}
//           <h2 className="mt-4 text-[30px] sm:text-[36px] md:text-[44px] font-extrabold text-slate-50 leading-tight">
//             {mainTitle || "Signature Labs & Equipment"}
//           </h2>
//           <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-beige">
//             Purpose-built robotics, AI, and automation labs where students ship
//             real systems – not just simulations.
//           </p>
//         </motion.div>

//         {/* Labs */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.25 }}
//           className="space-y-10 md:space-y-12"
//         >
//           {labs.map((lab, index) => {
//             const equipmentList = getEquipmentList(lab);
//             const heroImage = getHeroImageForLab(lab);
//             const isEven = index % 2 === 0;

//             return (
//               <motion.article
//                 key={lab._id || lab.title || index}
//                 variants={cardVariants}
//                 className="relative  rounded-3xl border border-beige bg-beige/70 shadow-[0_10px_10px_beige/40] overflow-hidden "
//               >
//                 {/* Neon border glow */}
//                 <div className="pointer-events-none absolute inset-0 rounded-3xl " />

//                 <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 p-6 sm:p-8 lg:p-10">
//                   {/* Text side */}
//                   <div className={isEven ? "" : "md:order-2"}>
//                     <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-green/80 border border-green  text-[11px] uppercase tracking-[0.18em] text-beige">
//                       <span className="h-1.5 w-1.5 rounded-full bg-beige  " />
//                       Lab {index + 1}
//                     </div>

//                     <h3 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-black mb-3">
//                       {lab.title}
//                     </h3>

//                     {lab.description && (
//                       <p className="text-sm md:text-[15px] text-slate-200/90 mb-5 leading-relaxed">
//                         {lab.description}
//                       </p>
//                     )}

//                     {equipmentList.length > 0 && (
//                       <div className="bg-green/90 border border-green rounded-2xl px-4 py-4 md:px-5 md:py-5 shadow shadow-slate-950/50">
//                         <p className="text-[13px] md:text-xs font-bold tracking-[0.18em] uppercase text-beige mb-2">
//                           Key Equipment
//                         </p>
//                         <ul className="space-y-1.5 text-[13px] md:text-sm text-white">
//                           {equipmentList.slice(0, 6).map((item, i) => (
//                             <li key={i} className="flex gap-2">
//                               <span className="mt-1 h-1.5 w-1.5 rounded-full bg-beige shrink-0" />
//                               <span>{item}</span>
//                             </li>
//                           ))}
//                           {equipmentList.length > 6 && (
//                             <li className="text-[12px] text-slate-400/90 mt-1">
//                               + {equipmentList.length - 6} more instruments &
//                               rigs in this lab
//                             </li>
//                           )}
//                         </ul>
//                       </div>
//                     )}
//                   </div>

//                   {/* Image + mini-gallery side */}
//                   <div className={isEven ? "" : "md:order-1"}>
//                     <motion.div
//                       variants={imageVariants}
//                       className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden bg-beige/80 border border-beige/80 shadow-[0_18px_45px_rgba(15,23,42,0.85)]"
//                     >
//                       {heroImage ? (
//                         <Image
//                           src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${heroImage}`}
//                           alt={lab.title || "Lab image"}
//                           fill
//                           priority={index === 0}
//                           sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
//                           className="object-cover  scale-[1.02]"
//                         />
//                       ) : (
//                         <div className="w-full h-full bg-beige flex items-center justify-center text-slate-500 text-xs">
//                           Images coming soon for this lab
//                         </div>
//                       )}

//                       {/* top gradient overlay */}
//                       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/30" />

//                       {/* lab badge */}
//                       <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-slate-950/60 backdrop-blur-sm border border-slate-700/70 px-3 py-1 text-[11px] text-slate-100 shadow-[0_0_22px_rgba(15,23,42,0.9)]">
//                         <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
//                         <span>
//                           {lab.images?.length
//                             ? `${lab.images.length} image${
//                                 lab.images.length > 1 ? "s" : ""
//                               }`
//                             : "Photo tour"}
//                         </span>
//                       </div>
//                     </motion.div>

//                     {/* Thumbnail strip (only if multiple images) */}
//                     {lab.images && lab.images.length > 1 && (
//                       <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
//                         {lab.images.map((imgName, i) => {
//                           const isActive =
//                             (activeImageIndex[lab._id] ?? 0) === i;
//                           return (
//                             <button
//                               type="button"
//                               key={`${lab._id}-${imgName}-${i}`}
//                               onClick={() =>
//                                 setActiveImageIndex((prev) => ({
//                                   ...prev,
//                                   [lab._id]: i,
//                                 }))
//                               }
//                               className={`relative h-14 w-20 rounded-xl overflow-hidden border transition-all duration-200 shrink-0 ${
//                                 isActive
//                                   ? "border-green shadow-[0_0_12px_rgba(45,212,191,0.45)] scale-[1.02]"
//                                   : "border-beige hover:border-[#96D5FF]/60 hover:scale-[1.02]"
//                               }`}
//                             >
//                               <Image
//                                 src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${imgName}`}
//                                 alt="lab thumbnail"
//                                 fill
//                                 sizes="80px"
//                                 className="object-cover"
//                               />
//                             </button>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </motion.article>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
