"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

// Simple NavLink (used inside the center pill)
const NavLink = ({ href, label, pathname, onClick }) => {
  const isActive = pathname === href;

  return (
    <Link href={href} onClick={onClick} className="relative">
      <span
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 inline-block ${
          isActive ? "bg-white/20 text-white" : "text-white/80 hover:text-white"
        }`}
      >
        {label}
      </span>
    </Link>
  );
};

// Desktop Dropdown Component (inside the pill)
const Dropdown = ({ label, children, setOpenDropdown, openDropdown }) => {
  const isOpenDrop = openDropdown === label;
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 80);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
          isOpenDrop
            ? "bg-white/20 text-white"
            : "text-white/70 hover:text-white"
        }`}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${
            isOpenDrop ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpenDrop && (
        <div className="absolute left-0 top-full mt-2 bg-[#1f152f]/95 backdrop-blur-xl shadow-2xl rounded-xl border border-white/10 whitespace-nowrap z-50 py-1 min-w-[180px]">
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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-8">
      {/* This wrapper gives MOBILE a pill background, desktop stays transparent */}
      <div
        className="
  max-w-6xl mx-auto flex items-center justify-between
  rounded-full bg-black/25 backdrop-blur-md px-3 py-1.5
  lg:bg-transparent lg:backdrop-blur-none lg:rounded-none lg:px-0 lg:py-4
"
      >
        {/* LOGO */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Robotica Institute of Technology"
            width={180}
            height={180}
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* CENTER PILL NAV – Desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
<div className="bg-[#2b0b4a]/90 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-1 shadow-lg">
            <NavLink href="/" label="Home" pathname={pathname} />

            <Dropdown
              label="About Us"
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            >
              <Link
                href="/about"
                className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition rounded-lg mx-1.5 my-0.5"
              >
                About Us
              </Link>
              <Link
                href="/faq"
                className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition rounded-lg mx-1.5 my-0.5"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition rounded-lg mx-1.5 my-0.5"
              >
                Contact Us
              </Link>
            </Dropdown>

            <Dropdown
              label="Programs"
              setOpenDropdown={setOpenDropdown}
              openDropdown={openDropdown}
            >
              <Link
                href="/program"
                className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition rounded-lg mx-1.5 my-0.5"
              >
                Programs
              </Link>
              <Link
                href="/courses"
                className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition rounded-lg mx-1.5 my-0.5"
              >
                Courses
              </Link>
              <Link
                href="/tracks"
                className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white transition rounded-lg mx-1.5 my-0.5"
              >
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

        {/* RIGHT APPLY – Desktop */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          <Link href="/contact">
            <button className="px-6 py-2.5 rounded-full btn-primary text-black btn-primary:hover hover:scale-[1.02] transition-all duration-300 font-semibold">
              Apply Now
            </button>
          </Link>
        </div>

        {/* MENU BUTTON – Mobile + Tablet */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="text-white/90 hover:text-white focus:outline-none p-2"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* MOBILE & TABLET SIDEBAR (unchanged) */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 h-full w-2/3 max-w-xs bg-gradient-to-b from-[#2a1f3d] via-[#3d2f52] to-[#2a1f3d] shadow-2xl shadow-purple-900/50 z-50 flex flex-col lg:hidden border-r border-white/10"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Image src="/logo.png" alt="Logo" width={90} height={20} />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/90 hover:text-white p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-2 p-5 font-medium text-sm overflow-y-auto">
                <NavLink
                  href="/"
                  label="Home"
                  pathname={pathname}
                  onClick={() => setIsOpen(false)}
                />
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

                <div className="pt-4">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <button className="w-full px-6 py-2.5 rounded-full bg-gradient-to-r from-[#9333ea] to-[#a855f7] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
