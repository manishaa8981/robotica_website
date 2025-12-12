"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaEnvelope, FaThreads } from "react-icons/fa6";
import { getAllTeamMembersApi } from "../../axios/api";

export default function Founders() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeamMembers = async () => {
    try {
      const res = await getAllTeamMembersApi();
      if (res.data.success) setTeamMembers(res.data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  if (teamMembers.length === 0) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full mt-10 mb-10 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="px-6 mb-10 flex justify-center"
      >
        <div className="text-center ">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight mt-10">
            Founders
          </h1>
        </div>
      </motion.div>

      <motion.div
        className="px-4 gap-6 flex flex-col md:flex-row md:flex-wrap mb-10  max-w-7xl mx-auto md:justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member._id}
            variants={cardVariants}
            className="flex flex-col sm:flex-row items-center card  p-6  w-full md:w-[48%] min-h-[220px]"
          >
            {/* Image */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-md overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${member.image}`}
                alt={member.name}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Divider — responsive */}
            <div className="sm:block hidden w-1 h-28 bg-primary-dark mx-5 rounded-full"></div>
            <div className="sm:hidden block w-1/2 h-1 bg-primary my-4 rounded-full"></div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-xl md:text-2xl">{member.name}</h3>

              <p className="text-[15px] capitalize mb-3 text-[#151515]">
                {member.role}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-primary-dark text-lg">
                {member.facebook && (
                  <a
                    className="hover:scale-110  transition"
                    href={member.facebook}
                    target="_blank"
                  >
                    <FaFacebookF />
                  </a>
                )}
                {member.insta && (
                  <a
                    className="hover:scale-110 transition"
                    href={member.insta}
                    target="_blank"
                  >
                    <FaInstagram />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    className="hover:scale-110 transition"
                    href={member.linkedin}
                    target="_blank"
                  >
                    <FaLinkedinIn />
                  </a>
                )}
                {member.threadLink && (
                  <a
                    className="hover:scale-110 transition"
                    href={member.threadLink}
                    target="_blank"
                  >
                    <FaThreads />
                  </a>
                )}
                {member.number && (
                  <a
                    className="hover:scale-110 transition"
                    href={`tel:${member.number}`}
                  >
                    <FaPhoneAlt />
                  </a>
                )}
                {member.email && (
                  <a
                    className="hover:scale-110 transition"
                    href={`mailto:${member.email}`}
                  >
                    <FaEnvelope />
                  </a>
                )}
                {member.whatsapp && (
                  <a
                    className="hover:scale-110 transition"
                    href={`tel:${member.whatsapp}`}
                  >
                    <FaWhatsapp />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
