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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TracksSpotlightSection() {
  const imageUrl = "/tracks1.jpg"; // replace with your real image path

  return (
    <section className="w-full bg-beige ">
      <div className="w-full mx-auto px-4 lg:px-0 ">
        <div className="grid gap-0 md:grid-cols-2 overflow-hidden  shadow-xl bg-white">
          {/* LEFT: Content block (green) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-green text-white px-6 sm:px-8 md:px-10 py-8 md:py-10 flex flex-col justify-between"
          >
            <div className="pl-40 py-10">
              {/* <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-200 mb-4">
                TRACK SPOTLIGHT
              </p> */}

              <h2 className="text-[60px] sm:text-[34px] md:text-[38px] lg:text-5xl leading-tight font-extrabold mb-4">
                Advanced Robotics
                <br />
                Specialization Tracks
              </h2>

              <p className="text-sm sm:text-[15px] text-amber-100 max-w-md mb-6">
                Choose from focused, industry-aligned tracks that take you deep
                into the systems that power real-world robots – from factory
                floors and homes to hospitals and AI labs.
              </p>

              <div className="space-y-4 mt-4">
                {tracks.map((track) => (
                  <div key={track.label} className="group">
                    <p className="text-s font-bold tracking-wide text-[#00E285] mb-1">
                      {track.label}
                    </p>
                    <p className="text-[15px] leading-relaxed text-white group-hover:text-white/90 transition-colors">
                      {track.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <div className="mt-8 px-40">
              <button className="inline-flex items-center px-5 gap-4 py-2 rounded-full bg-[#00E676] text-black text-sm font-semibold hover:bg-[#0df585] transition">
                Explore this model <MoveRight strokeWidth={1} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Image block */}
          <div className="relative min-h-[260px] md:min-h-[360px]">
            <Image
              src={imageUrl}
              alt="Robotics tracks showcase"
              fill
              className="object-cover"
            />
            {/* Optional overlay gradient at bottom for text if needed later */}
            {/* <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
