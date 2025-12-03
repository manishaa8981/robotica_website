"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Simple NavLink
const NavLink = ({ href, label, pathname, onClick }) => {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
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

// Desktop Dropdown Component (lg+)
// Desktop Dropdown Component (lg+)
const Dropdown = ({ label, children, setOpenDropdown, openDropdown }) => {
  const isOpenDrop = openDropdown === label;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(label)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button className="flex items-center gap-1 px-4 py-2 font-semibold text-sm lg:text-base hover:text-green transition">
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpenDrop ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpenDrop && (
        <div className="absolute left-0 top-full bg-white shadow-lg rounded-md border whitespace-nowrap z-50 py-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" },
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white              
        lg:bg-white/80        
        lg:backdrop-blur-md
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto relative md:px-1 lg:px-2">
        {/* TOP BAR */}
        <div className="flex items-center justify-between h-20 relative z-20 px-3 lg:px-0">
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

          {/* APPLY NOW – Desktop (lg and up only) */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <button className="flex gap-2 items-center cursor-pointer rounded-full bg-green text-white px-5 py-2 text-sm font-semibold hover:shadow-[0_0_10px_rgba(22,163,74,0.95)] hover:bg-green transition">
                Apply Now
              </button>
            </Link>
          </div>

          {/* MENU BUTTON – Mobile + Tablet (show below lg) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-800 hover:text-[#186f3e] focus:outline-none"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* DESKTOP NAV – only on lg+ */}
        <div className="hidden lg:flex absolute items-center justify-center left-1/2 transform -translate-x-1/2 top-1 px-2 py-1 lg:py-4 z-50 lg:gap-10 whitespace-nowrap">
          <NavLink href="/" label="Home" pathname={pathname} />

          <Dropdown
            label="About Us"
            setOpenDropdown={setOpenDropdown}
            openDropdown={openDropdown}
          >
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

          <Dropdown
            label="Programs"
            setOpenDropdown={setOpenDropdown}
            openDropdown={openDropdown}
          >
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

          <NavLink
            href="/signaturelabs"
            label="Labs and Facilities"
            pathname={pathname}
          />
          <NavLink href="/admission" label="Admission" pathname={pathname} />
          <NavLink
            href="/gallery"
            label="Capstone Gallery"
            pathname={pathname}
          />
        </div>
      </div>

      {/* MOBILE & TABLET SIDEBAR – visible < lg */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-2/3 max-w-xs bg-white shadow-md z-50 flex flex-col lg:hidden"
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

              <div className="flex flex-col space-y-6 p-6 font-semibold text-sm">
                <NavLink
                  href="/"
                  label="Home"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />

                {/* ABOUT US */}
                <NavLink
                  href="/about"
                  label="About Us"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
                <NavLink
                  href="/faq"
                  label="FAQ"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
                <NavLink
                  href="/contact"
                  label="Contact Us"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />

                {/* PROGRAMS */}
                <NavLink
                  href="/program"
                  label="Programs"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
                <NavLink
                  href="/courses"
                  label="Courses"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
                <NavLink
                  href="/tracks"
                  label="Tracks"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />

                <NavLink
                  href="/signaturelabs"
                  label="Labs and Facilities"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
                <NavLink
                  href="/admission"
                  label="Admission"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
                <NavLink
                  href="/gallery"
                  label="Capstone Gallery"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
                <NavLink
                  href="/contact"
                  label="Apply Now"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
