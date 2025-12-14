"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Zap } from "lucide-react";
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

  if (!program) return null;

  const getSemesterIcon = (index) => {
    const icons = [BookOpen, Target, Zap, BookOpen];
    const Icon = icons[index % icons.length];
    return <Icon className="w-8 h-8 text-white" />;
  };

  return (
    <section className="bg-soft w-full py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight ">
            {program.mainTitle ||
              "Programs built with industry outcomes in mind"}
          </h1>
        </motion.div>

        {/* HERO BANNER */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/program.png')",
                backgroundPosition: "center 70%",
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/80 via-purple-300/70 to-transparent" />

            {/* Content */}
            <div className="relative backdrop-blur-sm flex items-center justify-center text-center min-h-[320px] lg:min-h-[420px] px-6 sm:px-10 py-12 lg:py-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="space-y-3">
                  <h2 className="text-4xl sm:text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
                    {program.title}
                  </h2>
                  <p className="text-xl sm:text-2xl text-yellow-500  font-semibold">
                    {program.duration}
                  </p>
                </div>

                <p className="text-base sm:text-lg text-white/90 italic font-medium max-w-2xl mx-auto">
                  {program.internationalInternshipAccess}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SEMESTERS GRID */}
        <div className="space-y-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-black mb-8"
          >
            Curriculum Overview
          </motion.h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {program.semesters.map((sem, index) => (
              <motion.div
                key={sem._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group relativ backdrop-blur-md  p-8 hover:bg-white/10 hover:border-purple-400/30 transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]"
              >
                {/* Semester number badge */}
                <div className="bg-primary-dark absolute -top-3 -left-3 w-16 h-16 rounded-full flex items-center justify-center shadow-lg  ">
                  {getSemesterIcon(index)}
                </div>

                <div className="space-y-6 pl-6">
                  <h3 className="font-bold text-2xl text-primary-dark group-hover:primary-soft transition-colors">
                    {sem.title}
                  </h3>

                  {sem.units?.length > 0 && (
                    <div>
                      <h4 className="text-m font-bold text-primary-dark uppercase tracking-wider mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-dark"></div>
                        Core Units
                      </h4>
                      <ul className="space-y-2.5">
                        {sem.units.map((u) => (
                          <li
                            key={u._id || u.description}
                            className="flex items-start gap-3 text-black text-m leading-relaxed"
                          >
                            <span className="text-primary-dark  mt-0">▸</span>
                            <span>{u.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sem.project && (
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-m font-bold text-primary-dark uppercase tracking-wider mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-dark"></div>
                        Project
                      </h4>
                      <p className="text-black text-m leading-relaxed bg-white/5 rounded-lg p-3 border border-white/10">
                        {sem.project}
                      </p>
                    </div>
                  )}

                  {sem.tracks?.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-sm font-bold text-primary-dark uppercase tracking-wider mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-dark"></div>
                        Tracks
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {sem.tracks.map((t) => (
                          <span
                            key={t._id || t.description}
                            className="px-3 py-1.5 bg-purple-500/20 text-black text-s rounded-full border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
                          >
                            {t.description}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
