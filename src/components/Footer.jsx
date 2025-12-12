// "use client";

// import { Mail, MapPin, Phone } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { getInstitutionProfileApi } from "../axios/api";

// export const Footer = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const response = await getInstitutionProfileApi();
//       if (response?.data?.success) {
//         setData(response.data.result);
//       }
//     })();
//   }, []);

//   return (
//     <footer className="bg-linear-to-b from-[#0e413d] to-green text-white pt-12 overflow-hidden">
//       <div className="relative z-10 max-w-7xl mx-auto px-6 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {/* Logo */}
//         <div className=" rounded-xl items-center h-fit  shadow-[0_10px_10px_beige/40] bg-white backdrop-blur-sm w-fit">
//           <Image
//             src="/logo.png"
//             alt="logo"
//             width={120}
//             height={60}
//             className="mb-4 rounded-lg "
//           />

//           {/* Social Links */}
//           <div className="flex gap-3 mt-2">
//             {data?.facebook && (
//               <a
//                 className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
//                 href={data.facebook}
//                 target="_blank"
//               >
//                 <FaFacebookF size={18} />
//               </a>
//             )}
//             {data?.insta && (
//               <a
//                 className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
//                 href={data.insta}
//                 target="_blank"
//               >
//                 <FaInstagram size={18} />
//               </a>
//             )}
//             {data?.whatsapp && (
//               <a
//                 className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
//                 href={`https://wa.me/${data.whatsapp}`}
//                 target="_blank"
//               >
//                 <FaWhatsapp size={18} />
//               </a>
//             )}
//             {data?.linkedin && (
//               <a
//                 className="p-2 bg-white/10 hover:bg-[#0ab855] rounded-full transition"
//                 href={data.linkedin}
//                 target="_blank"
//               >
//                 <FaLinkedinIn size={18} />
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Helpful Links */}
//         <div>
//           <p className="text-lg font-semibold mb-4 uppercase text-white">
//             Helpful Links
//           </p>
//           <ul className="space-y-3 text-base">
//             <li>
//               <Link
//                 href="/about"
//                 className="hover:underline underline-offset-4"
//               >
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link href="/news" className="hover:underline underline-offset-4">
//                 News
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/contact"
//                 className="hover:underline underline-offset-4"
//               >
//                 Contact Us
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <p className="text-lg font-semibold mb-4 uppercase text-white">
//             Contact
//           </p>
//           <ul className="space-y-3 text-base">
//             {data?.location && (
//               <li className="flex items-center gap-2">
//                 <MapPin size={17} /> {data.location}
//               </li>
//             )}
//             {data?.email && (
//               <li className="flex items-center gap-2">
//                 <Mail size={17} />
//                 <a
//                   href={`mailto:${data.email}`}
//                   className="hover:underline underline-offset-4"
//                 >
//                   {data.email}
//                 </a>
//               </li>
//             )}
//             {data?.number && (
//               <li className="flex items-center gap-2">
//                 <Phone size={17} />
//                 <a
//                   href={`tel:${data.number}`}
//                   className="hover:underline underline-offset-4"
//                 >
//                   {data.number}
//                 </a>
//               </li>
//             )}
//           </ul>
//         </div>

//         {/* Accreditation */}
//         {/* <div>
//           <h4 className="text-lg font-semibold mb-4 uppercase text-white">
//             Accredited By
//           </h4>
//           <img
//             src="/assets/imgs/ncc.png"
//             alt="accreditation"
//             width={100}
//             height={50}
//             className="bg-white rounded-lg p-2 h-14 object-contain"
//           />
//         </div> */}
//         {/* <div>
//           <p className="text-xl mb-2 font-semibold text-white">
//             In Collaboration with
//           </p>
//           <a
//             className="text-xl font-extrabold text-white mb-4 leading-relaxed underline underline-offset-4 hover:bg-[#e1fbec] hover:text-[#186f3e] hover:pt-2 rounded-lg transition-all duration-300"
//             href="https://theukcolleges.com"
//             target="_blank"
//           >
//             UK COLLEGES
//           </a>
//         </div> */}
//       </div>

//       {/* Footer bottom */}
//       <div className="mt-12 border-t border-white/40 pt-6 pb-4 text-center text-sm text-white">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 px-6">
//           <p>
//             © {new Date().getFullYear()} Robotica Institute. All rights
//             reserved.
//           </p>
//           <p>
//             Designed by{" "}
//             {/* <a
//               href="https://digitechnologynepal.com/"
//               target="_blank"
//               className="hover:underline font-bold underline-offset-4"
//             >
//               Digi Technology Nepal
//             </a> */}
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

"use client";

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
import { getInstitutionProfileApi } from "../axios/api";

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
    <footer className="relative bg-black text-white pt-16 pb-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* GRID */}
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* LOGO + SOCIALS */}
          <div className="space-y-5">
            <div className="bg-white backdrop-blur-xl rounded-2xl p-4 shadow-xl w-fit">
              <Image
                src="/logo.png"
                alt="logo"
                width={140}
                height={60}
                className="rounded-lg"
              />
            </div>

            <p className="text-sm text-white/80 leading-relaxed max-w-xs">
              Building the future of robotics education through hands-on
              innovation and global excellence.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {data?.facebook && (
                <a
                  href={data.facebook}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 hover:bg-primary-light transition"
                >
                  <FaFacebookF size={18} />
                </a>
              )}
              {data?.insta && (
                <a
                  href={data.insta}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 hover:bg-primary-light transition"
                >
                  <FaInstagram size={18} />
                </a>
              )}
              {data?.whatsapp && (
                <a
                  href={`https://wa.me/${data.whatsapp}`}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 hover:bg-primary-light transition"
                >
                  <FaWhatsapp size={18} />
                </a>
              )}
              {data?.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  className="p-2 rounded-full bg-white/10 hover:bg-primary-light transition"
                >
                  <FaLinkedinIn size={18} />
                </a>
              )}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              Quick Links
            </h3>

            <ul className="space-y-3 text-base text-white">
              <li>
                <Link href="/about" className="link-hover transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/news" className="link-hover transition">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="link-hover transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-5 tracking-wide">
              Contact
            </h3>

            <ul className="space-y-4 text-base text-white/90">
              {data?.location && (
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1 text-primary-light" />
                  <span>{data.location}</span>
                </li>
              )}

              {data?.email && (
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary-light" />
                  <a
                    href={`mailto:${data.email}`}
                    className="link-hover transition"
                  >
                    {data.email}
                  </a>
                </li>
              )}

              {data?.number && (
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary-light" />
                  <a
                    href={`tel:${data.number}`}
                    className="link-hover transition"
                  >
                    {data.number}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* ACCREDITATION / PARTNERS */}
          <div>
            {/* <h3 className="text-lg font-semibold mb-5 tracking-wide">
              Affiliation
            </h3>
            <p className="text-white/80 text-sm">In collaboration with</p>

            <a
              href="https://theukcolleges.com"
              target="_blank"
              className="inline-block mt-2 text-xl font-bold text-white hover:text-green transition underline underline-offset-4"
            >
              UK COLLEGES
            </a> */}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-6 border-t border-white/20 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-white/70 gap-3">
          <p>
            © {new Date().getFullYear()} Robotica Institute. All rights
            reserved.
          </p>

          <p>
            Designed by{" "}
            <span className="font-semibold text-white">Robotica Institute</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
