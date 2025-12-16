"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";

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
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function TracksSpotlightSection() {
  const imageUrl = "/tracks1.jpg";

  return (
    <section className="w-full py-0 sm:py-2 lg:py-2 bg-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-0 items-stretch">
          {/* LEFT: Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="
              rounded-3xl bg-gradient-to-b from-[#2A143F] to-[#4B1E6D]
              p-6 sm:p-8 lg:p-10
              shadow-[0_16px_34px_rgba(76,18,132,0.18)]
              border border-white/10
              flex flex-col
            "
          >
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Advanced Robotics
                <span className="block text-[#E9D5FF]">
                  Specialization Tracks
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/85 max-w-xl">
                Choose from focused, industry-aligned tracks that take you deep
                into the systems that power real-world robots - from factory
                floors and homes to hospitals and AI labs.
              </p>

              <div className="mt-6 space-y-4">
                {tracks.map((track) => (
                  <div
                    key={track.label}
                    className="rounded-2xl bg-white/5 p-4 border border-white/10"
                  >
                    <p className="text-sm sm:text-base font-bold text-[#F3E8FF]">
                      {track.label}
                    </p>
                    <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-white/80">
                      {track.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
{/* 
            <div className="mt-7 sm:mt-9">
              <button
                className="
                  inline-flex items-center gap-2
                  rounded-full px-5 py-2.5
                  bg-white text-[#2B0A3D]
                  text-sm font-semibold
                  hover:bg-[#F3E8FF]
                  transition
                "
              >
                Explore this model <MoveRight strokeWidth={1.5} size={18} />
              </button>
            </div> */}
          </motion.div>

          {/* RIGHT: Image */}
          <div className="relative rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[520px] shadow-[0_16px_34px_rgba(76,18,132,0.14)] border border-[#E6D9F2] bg-white">
            <Image
              src={imageUrl}
              alt="Robotics tracks showcase"
              fill
              priority={false}
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* subtle overlay for premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
          </div>
        </div>
      </div>
    </section>
  );
}
