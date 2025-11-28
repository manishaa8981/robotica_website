// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCoursesVisible, setIsCoursesVisible] = useState(false); // keeping as you had
//   const pathname = usePathname();
//   const router = useRouter();

//   // Detect if Courses section is visible (unchanged)
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     if (!window.location.pathname.startsWith("/")) return;

//     const element = document.getElementById("courses");
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => setIsCoursesVisible(entry.isIntersecting),
//       { threshold: 0.5 }
//     );

//     observer.observe(element);

//     return () => observer.disconnect();
//   }, []);

//   // Sidebar animation (unchanged)
//   const sidebarVariants = {
//     hidden: { x: "-100%" },
//     visible: { x: 0 },
//     exit: { x: "-100%" },
//   };

//   const NavLink = ({ href, label, scrollToId }) => {
//     const [isSectionVisible, setIsSectionVisible] = useState(false);

//     useEffect(() => {
//       if (!scrollToId || pathname !== "/") return;

//       const element = document.getElementById(scrollToId);
//       if (!element) return;

//       const observer = new IntersectionObserver(
//         ([entry]) => setIsSectionVisible(entry.isIntersecting),
//         { threshold: 0.5 }
//       );

//       observer.observe(element);
//       return () => observer.disconnect();
//     }, [scrollToId, pathname]);

//     const handleClick = (e) => {
//       setIsOpen(false);

//       if (scrollToId) {
//         e.preventDefault();

//         if (pathname !== "/") {
//           router.push(`/?scroll=${scrollToId}`);
//         } else {
//           const element = document.getElementById(scrollToId);
//           if (element) element.scrollIntoView({ behavior: "smooth" });
//         }
//       }
//     };

//     const isActive =
//       (pathname === href && !scrollToId) ||
//       (scrollToId === "courses" && pathname === "/" && isSectionVisible) ||
//       (href === "/news" && pathname.startsWith("/news"));

//     return (
//       <Link
//         href={href}
//         onClick={handleClick}
//         className="relative px-4 py-2 font-semibold text-sm lg:text-base group"
//       >
//         <span
//           className={`relative z-10 transition-colors duration-200 ${
//             isActive ? "text-green" : "text-[#141718]"
//           } group-hover:text-green`}
//         >
//           {label}
//         </span>

//         {/* simple underline + soft glow when active */}
//         <span
//           className={`absolute left-4 right-4 bottom-1 h-2px rounded-full origin-left transition-transform duration-300 ${
//             isActive
//               ? "scale-x-100 bg-green shadow-[0_0_10px_rgba(22,163,74,0.8)]"
//               : "scale-x-0 bg-green group-hover:scale-x-100"
//           }`}
//         />
//       </Link>
//     );
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
//       <div className="max-w-7xl mx-auto relative md:px-1 lg:px-2">
//         {/* top row: logo + apply / menu */}
//         <div className="flex items-center justify-between h-30 relative z-20 px-3 md:px-0">
//           <div className="flex items-center">
//             <div className="md:hidden">
//               <Image src="/brandlogo.png" alt="Logo" width={50} height={10} />
//             </div>
//             <div className="hidden md:flex">
//               <Image src="/brandlogo.png" alt="Logo" width={110} height={20} />
//             </div>
//           </div>

//           {/* desktop apply button */}
//           <div className="hidden md:block">
//             <Link href="/contact">
//               <button className="flex gap-2 items-center cursor-pointer rounded-full bg-green text-white px-5 py-2 text-sm font-semibold  hover:shadow-[0_0_10px_rgba(22,163,74,1)] hover:bg-[#014f23] transition">
//                 Apply Now
//               </button>
//             </Link>
//           </div>

//           {/* mobile menu icon */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(true)}
//               className="text-gray-800 hover:text-[#186f3e] focus:outline-none"
//             >
//               <Menu size={28} />
//             </button>
//           </div>
//         </div>

//         {/* center pill nav (desktop) – links unchanged */}
//         <div className="hidden md:flex absolute justify-center left-1/2 transform -translate-x-1/2 top-1">
//           <div className="rounded-full bg-white border border-gray-200 shadow-md px-3 lg:px-5 py-2 lg:py-3 flex items-center lg:gap-8 md:gap-4 whitespace-nowrap">
//             <NavLink href="/" label="Home" />
//             <NavLink href="/about" label="Programs" />
//             <NavLink href="/tracks" label="Tracks" />
//             <NavLink href="/labs" label="Labs and Facilities" />
//             <NavLink href="/admission" label="Admission" />
//             <NavLink href="/gallery" label="Capstone Gallery" />

//             {/* <NavLink href="/" label="Courses" scrollToId="courses" />
// //           <NavLink href="/news" label="News" /> */}
//           </div>
//         </div>
//       </div>

//       {/* mobile sidebar (links unchanged) */}
//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/40 z-40"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//             />
//             <motion.div
//               className="fixed top-0 left-0 h-full w-2/3 bg-white shadow-md z-50 flex flex-col"
//               variants={sidebarVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               transition={{ type: "tween", duration: 0.3 }}
//             >
//               <div className="flex items-center justify-between p-4 border-b">
//                 <Image
//                   src="/techpaaila.jpg"
//                   alt="Logo"
//                   width={90}
//                   height={20}
//                 />
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="text-gray-800"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>
//               <div className="flex flex-col space-y-5 p-6 font-semibold text-sm">
//                 <NavLink href="/" label="Home" />
//                 <NavLink href="/about" label="Programs" />
//                 <NavLink href="/tracks" label="Tracks" />
//                 <NavLink href="/labs" label="Labs and Facilities" />
//                 <NavLink href="/admission" label="Admission" />
//                 <NavLink href="/gallery" label="Capstone Gallery" />
//                 {/* <NavLink href="/" label="Courses" scrollToId="courses" />
//           <NavLink href="/news" label="News" /> */}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  // Simple NavLink
  const NavLink = ({ href, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setIsOpen(false)}
        className="relative px-4 py-2 font-semibold text-sm lg:text-base"
      >
        <span
          className={`transition-colors duration-200 pb-[3px] ${
            isActive
              ? "text-green border-b-2 border-green"
              : "text-[#141718] hover:text-green"
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  // Desktop Dropdown Component
  const Dropdown = ({ label, children }) => {
    const isOpenDrop = openDropdown === label;

    return (
      <div
        className="relative group"
        onMouseEnter={() => setOpenDropdown(label)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        {/* LABEL + ICON */}
        <button className="flex items-center gap-1 px-4 py-2 font-semibold text-sm lg:text-base hover:text-green transition">
          {label}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              isOpenDrop ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {/* DROPDOWN MENU */}
        {isOpenDrop && (
          <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md border w-40 whitespace-nowrap z-50 py-2">
            {children}
          </div>
        )}
      </div>
    );
  };

  // Sidebar animation
  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/40">
      <div className="max-w-7xl mx-auto relative md:px-1 lg:px-2">
        {/* TOP BAR */}
        <div className="flex items-center justify-between h-20 relative z-20">
          {/* LOGO */}
          <div className="flex items-center">
            <Image
              src="/brandlogo.png"
              alt="Robotica Institute of Technology"
              width={200}
              height={200}
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* APPLY NOW – Desktop */}
          <div className="hidden md:block">
            <Link href="/contact">
              <button className="flex gap-2 items-center cursor-pointer rounded-full bg-green text-white px-5 py-2 text-sm font-semibold hover:shadow-[0_0_10px_rgba(22,163,74,0.95)] hover:bg-green transition">
                Apply Now
              </button>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-800 hover:text-[#186f3e] focus:outline-none"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex absolute items-center justify-center left-1/2 transform -translate-x-1/2 top-1 rounded-full px-2 py-1 lg:py-4 z-50 lg:gap-10 whitespace-nowrap">
          <NavLink href="/" label="Home" />

          {/* ABOUT US DROPDOWN */}
          <Dropdown label="About Us">
            <Link href="/about" className="block px-4 py-2 hover:bg-gray-100">
              About Us
            </Link>
            <Link href="/faq" className="block px-4 py-2 hover:bg-gray-100">
              FAQ
            </Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100">
              Contact Us
            </Link>
          </Dropdown>

          {/* PROGRAMS DROPDOWN */}
          <Dropdown label="Programs">
            <Link href="/program" className="block px-4 py-2 hover:bg-gray-100">
              Programs
            </Link>
            <Link href="/courses" className="block px-4 py-2 hover:bg-gray-100">
              Courses
            </Link>
            <Link href="/tracks" className="block px-4 py-2 hover:bg-gray-100">
              Tracks
            </Link>
          </Dropdown>

          <NavLink href="/signaturelabs" label="Labs and Facilities" />
          <NavLink href="/admission" label="Admission" />
          <NavLink href="/gallery" label="Capstone Gallery" />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-2/3 bg-white shadow-md z-50 flex flex-col"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Image src="/brandlogo.png" alt="Logo" width={90} height={20} />
                <button onClick={() => setIsOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* MOBILE MENU — Simple, no hover dropdown */}
              <div className="flex flex-col space-y-6 p-6 font-semibold text-sm">
                <NavLink href="/" label="Home" />

                {/* ABOUT US */}
                <NavLink href="/about" label="About Us" />
                <NavLink href="/faq" label="FAQ" />
                <NavLink href="/contact" label="Contact Us" />

                {/* PROGRAMS */}
                <NavLink href="/program" label="Programs" />
                <NavLink href="/courses" label="Courses" />
                <NavLink href="/tracks" label="Tracks" />

                <NavLink href="/signaturelabs" label="Labs and Facilities" />
                <NavLink href="/admission" label="Admission" />
                <NavLink href="/gallery" label="Capstone Gallery" />
                <NavLink href="/contact" label="Apply Now" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* <NavLink href="/" label="Courses" scrollToId="courses" />
                <NavLink href="/news" label="News" /> */
