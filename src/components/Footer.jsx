"use client";

import { getInstitutionProfileApi } from "../axios/api";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

export const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getInstitutionProfileApi();
      if (response?.data?.success) {
        setData(response.data.result);
      }
    })();
  }, []);

  return (
    <footer className="bg-linear-to-b from-[#0e413d] to-green text-white pt-12 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Logo */}
        <div className=" rounded-xl items-center h-fit  shadow-[0_10px_10px_beige/40] bg-beige/20 backdrop-blur-sm w-fit">
          <Image
            src="/brandlogo.png"
            alt="logo"
            width={150}
            height={80}
            className="mb-4 rounded-lg "
          />

          {/* Social Links */}
          <div className="flex gap-3 mt-2">
            {data?.facebook && (
              <a
                className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
                href={data.facebook}
                target="_blank"
              >
                <FaFacebookF size={18} />
              </a>
            )}
            {data?.insta && (
              <a
                className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
                href={data.insta}
                target="_blank"
              >
                <FaInstagram size={18} />
              </a>
            )}
            {data?.whatsapp && (
              <a
                className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
                href={`https://wa.me/${data.whatsapp}`}
                target="_blank"
              >
                <FaWhatsapp size={18} />
              </a>
            )}
            {data?.linkedin && (
              <a
                className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
                href={data.linkedin}
                target="_blank"
              >
                <FaLinkedinIn size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Helpful Links */}
        <div>
          <p className="text-lg font-semibold mb-4 uppercase text-white">
            Helpful Links
          </p>
          <ul className="space-y-3 text-base">
            <li>
              <Link
                href="/about"
                className="hover:underline underline-offset-4"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:underline underline-offset-4">
                News
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline underline-offset-4"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-lg font-semibold mb-4 uppercase text-white">
            Contact
          </p>
          <ul className="space-y-3 text-base">
            {data?.location && (
              <li className="flex items-center gap-2">
                <MapPin size={17} /> {data.location}
              </li>
            )}
            {data?.email && (
              <li className="flex items-center gap-2">
                <Mail size={17} />
                <a
                  href={`mailto:${data.email}`}
                  className="hover:underline underline-offset-4"
                >
                  {data.email}
                </a>
              </li>
            )}
            {data?.number && (
              <li className="flex items-center gap-2">
                <Phone size={17} />
                <a
                  href={`tel:${data.number}`}
                  className="hover:underline underline-offset-4"
                >
                  {data.number}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Accreditation */}
        {/* <div>
          <h4 className="text-lg font-semibold mb-4 uppercase text-white">
            Accredited By
          </h4>
          <img
            src="/assets/imgs/ncc.png"
            alt="accreditation"
            width={100}
            height={50}
            className="bg-white rounded-lg p-2 h-14 object-contain"
          />
        </div> */}
        {/* <div>
          <p className="text-xl mb-2 font-semibold text-white">
            In Collaboration with
          </p>
          <a
            className="text-xl font-extrabold text-white mb-4 leading-relaxed underline underline-offset-4 hover:bg-[#e1fbec] hover:text-[#186f3e] hover:pt-2 rounded-lg transition-all duration-300"
            href="https://theukcolleges.com"
            target="_blank"
          >
            UK COLLEGES
          </a>
        </div> */}
      </div>

      {/* Footer bottom */}
      <div className="mt-12 border-t border-white/40 pt-6 pb-4 text-center text-sm text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 px-6">
          <p>
            © {new Date().getFullYear()} Robotica Institute. All rights
            reserved.
          </p>
          <p>
            Designed by{" "}
            {/* <a
              href="https://digitechnologynepal.com/"
              target="_blank"
              className="hover:underline font-bold underline-offset-4"
            >
              Digi Technology Nepal
            </a> */}
          </p>
        </div>
      </div>
    </footer>
  );
};
