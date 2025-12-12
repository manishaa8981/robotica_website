"use client";

import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { ChevronDown, Maximize, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import animationData from "../../../public/empty.json";
import { getAllGalleryContentsApi, getCategoriesApi } from "../../axios/api";
import Pagination from "../../components/Pagination";
import AlbumView from "./AlbumView";

// Hook to detect hover capability
function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const hoverMQ = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(hoverMQ.matches);
    update();
    hoverMQ.addEventListener("change", update);
    return () => hoverMQ.removeEventListener("change", update);
  }, []);

  return canHover;
}

const SkeletonGallery = () => (
  <div>
    <div className="flex items-center gap-3 mb-5">
      <div className="bg-gray-200 rounded-lg w-48 h-10" />
      <div className="bg-gray-200 rounded-full w-12 h-12" />
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="relative rounded-lg overflow-hidden bg-gray-200 h-40 lg:h-64"
        />
      ))}
    </div>
  </div>
);

export default function GalleryView() {
  const [galleryList, setGalleryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAlbums, setShowAlbums] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [loading, setLoading] = useState(true);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const canHover = useCanHover();

  // Fetch gallery contents
  const fetchGallery = async () => {
    try {
      const res = await getAllGalleryContentsApi();
      if (res?.data?.success) {
        setGalleryList(res.data.result || []);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await getCategoriesApi("gallery");
      if (res?.data?.success) {
        const fetched = (res.data.data || []).filter((c) => !c.isDeleted);
        setCategories(fetched);
      }
    } catch (err) {
      console.error("Error fetching gallery categories:", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchGallery();
      await fetchCategories();
    };
    load();
  }, []);

  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Detect desktop
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Filter logic
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const clearAll = () => setSelectedCategories([]);

  const filteredGallery =
    selectedCategories.length === 0
      ? galleryList
      : galleryList.filter((item) =>
          selectedCategories.includes(item.categoryTitle)
        );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGallery = filteredGallery.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredGallery.length / itemsPerPage);
  const selectedContent =
    selectedIndex !== null ? filteredGallery[selectedIndex] : null;

  // Keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft" && selectedIndex > 0)
        setSelectedIndex((prev) => prev - 1);
      else if (
        e.key === "ArrowRight" &&
        selectedIndex < filteredGallery.length - 1
      )
        setSelectedIndex((prev) => prev + 1);
      else if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredGallery.length]);

  return (
    <main className="mx-auto">
      <div className="pb-20 px-4 md:px-[6vw] xl:px-[8vw]">
        {loading ? (
          <SkeletonGallery />
        ) : galleryList.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full p-6">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="w-64"
            />
            <p className="mt-4 text-xl text-black font-medium text-center">
              No content available yet. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-center mb-8 mt-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
                Capstone Gallery
              </h1>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-sm lg:text-base px-4 py-2 border rounded-lg bg-white flex justify-between items-center gap-2 text-black hover:bg-gray-100"
                >
                  Filters <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="w-max absolute left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-md z-50 p-3 flex flex-col gap-2">
                    {categories.map((cat) => (
                      <label
                        key={cat.title}
                        className="text-sm lg:text-lg flex items-center gap-2 text-black"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.title)}
                          onChange={() => toggleCategory(cat.title)}
                          className="w-4 h-4 accent-[#186f3e]"
                        />
                        {cat.title}
                      </label>
                    ))}
                    {selectedCategories.length > 0 && (
                      <button
                        onClick={clearAll}
                        className="text-xs lg:text-sm mt-2 px-2 py-1 text-white btn-primary btn-primary:hover cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Selected filters */}
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs lg:text-sm flex items-center gap-1 bg-primary-soft text-black px-3 py-1 rounded-full"
                  >
                    {cat}
                    <button onClick={() => toggleCategory(cat)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Toggle Albums */}
            <div className="my-5 w-max relative flex gap-4 border-b border-gray-300 text-sm lg:text-base">
              <button
                className={`px-4 py-2 ${
                  !showAlbums ? "text-primary-dark font-bold" : "text-black"
                }`}
                onClick={() => setShowAlbums(false)}
              >
                All Media
              </button>
              <button
                className={`px-4 py-2 ${
                  showAlbums ? "text-primary-dark font-bold" : "text-black"
                }`}
                onClick={() => setShowAlbums(true)}
              >
                Albums
              </button>
              <span
                className="absolute bottom-0 h-1 bg-primary-dark rounded-full transition-all duration-300"
                style={{ width: "50%", left: showAlbums ? "50%" : "0%" }}
              />
            </div>

            {/* Main Content */}
            {showAlbums ? (
              <AlbumView galleryItems={filteredGallery} />
            ) : (
              <>
                {filteredGallery.length === 0 ? (
                  <div className="flex flex-col items-center justify-center w-full p-6">
                    <Lottie
                      animationData={animationData}
                      loop
                      autoplay
                      className="w-64"
                    />
                    <p className="mt-4 text-xl text-white font-medium text-center">
                      {galleryList.length === 0
                        ? "No content available yet. Stay tuned!"
                        : "No items match your selected filters."}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
                      {currentGallery.map((item, index) => {
                        const globalIndex = indexOfFirstItem + index;
                        return (
                          <div
                            key={item._id}
                            onClick={() => setSelectedIndex(globalIndex)}
                            className={`w-full h-40 lg:h-64 relative cursor-pointer rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
                              canHover && isDesktop
                                ? "group hover:shadow-xl lg:hover:-translate-y-1.5"
                                : ""
                            }`}
                          >
                            {item.fileType === "video" ? (
                              <div>
                                <video
                                  src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.file}`}
                                  className="w-full h-40 lg:h-64 object-cover"
                                  muted
                                  playsInline
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <svg
                                    className="w-12 h-12 text-white bg-black bg-opacity-50 rounded-full p-2"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <Image
                                src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.file}`}
                                alt={item.name}
                                fill
                                className="w-full h-40 lg:h-64 object-cover"
                              />
                            )}
                            {canHover && isDesktop && (
                              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                                <Maximize className="text-white" />
                                <span className="text-white ml-2 font-semibold text-md">
                                  Click to expand
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {totalPages > 1 && (
                      <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={({ selected }) =>
                          setCurrentPage(selected + 1)
                        }
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-[#151515] rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 text-white bg-black/50 hover:bg-opacity-70 rounded-full p-2 z-20 backdrop-blur-sm"
              >
                <X size={22} />
              </button>

              {/* Left Arrow */}
              {selectedIndex > 0 && (
                <button
                  onClick={() => setSelectedIndex((prev) => prev - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-opacity-70 text-white p-3 rounded-full backdrop-blur-sm"
                >
                  ◀
                </button>
              )}

              {/* Right Arrow */}
              {selectedIndex < filteredGallery.length - 1 && (
                <button
                  onClick={() => setSelectedIndex((prev) => prev + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-opacity-70 text-white p-3 rounded-full backdrop-blur-sm"
                >
                  ▶
                </button>
              )}

              {/* Media Container */}
              <div className="flex-1 flex items-center max-h-[70vh] min-h-[70vh] justify-center bg-black/95">
                {selectedContent.fileType === "video" ? (
                  <video
                    src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${selectedContent.file}`}
                    className="w-full max-h-[70vh] object-contain bg-black"
                    controls
                    autoPlay
                  />
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${selectedContent.file}`}
                    alt={selectedContent.name}
                    fill
                    className="max-h-[70vh] min-h-[70vh] max-w-full object-contain rounded-lg"
                  />
                )}
              </div>

              {/* Details Section */}
              <div className="bg-linear-to-t from-black/90 via-black/70 to-transparent px-6 py-4 text-white">
                {selectedContent.date && (
                  <p className="text-sm text-gray-300 mb-1">
                    {new Date(selectedContent.date).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                )}
                <p className="text-xl font-semibold">{selectedContent.name}</p>
                {selectedContent.tags && selectedContent.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedContent.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/20 text-gray-200 text-xs rounded-lg"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
