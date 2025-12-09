"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const tracks = [
  {
    label: "A. Industrial Automation & PLC",
    description:
      "Advanced PLC (SFC/Graph), motion control, safety PLC integration, OEE/MES pipelines.",
  },
  {
    label: "B. Humanoid & HRI",
    description:
      "Whole-body control, force/impedance control, tactile perception, ISO/TS 15066-compliant HRI.",
  },
  {
    label: "C. Service & Household Robots",
    description:
      "Robust mapping & navigation, task planning, reliability engineering, UX and compliance.",
  },
  {
    label: "D. Healthcare Robotics",
    description:
      "ISO 13485, IEC 60601/62304, teleop & rehab systems, clinical validation workflows.",
  },
  {
    label: "E. AI, Vision & Learning",
    description:
      "Stereo/3D vision, PCL pipelines, detection/segmentation, RL for control and adaptation.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TracksSpotlightSection() {
  const imageUrl = "/tracks1.jpg"; // replace with your real image path
  const [loading, setLoading] = useState(null);

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
  return (
    <section className="w-full ">
      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-0  ">
        <div className="grid md:grid-cols-2 gap-4 overflow-hidden">
          {/* LEFT: Content block */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className=" px-4 sm:px-4 lg:px-4 md:py-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-soft mb-4 leading-tight">
                Advanced Robotics
                <br />
                Specialization Tracks
              </h2>

              <p className="text-sm sm:text-[15px] text-white text-justify max-w-xl mb-6">
                Choose from focused, industry-aligned tracks that take you deep
                into the systems that power real-world robots – from factory
                floors and homes to hospitals and AI labs.
              </p>

              <div className="space-y-4 mt-4">
                {tracks.map((track) => (
                  <div key={track.label} className="group">
                    <p className="text-m font-bold tracking-wide text-primary-soft mb-1">
                      {track.label}
                    </p>
                    <p className="text-[15px] leading-relaxed text-white ">
                      {track.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <div className="mt-8">
              <button className="inline-flex items-center gap-3 px-5 py-2 rounded-full btn-primary text-black btn-primary:hover text-sm font-semibold  hover:text-white transition">
                Explore this model <MoveRight strokeWidth={1.3} size={18} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Image block */}
          <div className="relative min-h-[260px] md:min-h-[360px] lg:min-h-[420px]  mb-4">
            <Image
              src={imageUrl}
              alt="Robotics tracks showcase"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
