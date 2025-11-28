"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Lottie from "lottie-react";
import animationData from "../../../public/empty.json";
import Image from "next/image";

// Main AlbumView component
const AlbumView = ({ galleryItems }) => {
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );
  const canHover =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  // Debounced resize
  useEffect(() => {
    let timeout;
    const resizeHandler = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsDesktop(window.innerWidth >= 1024), 100);
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // Group gallery items into albums
  const albums = useMemo(() => {
    const grouped = galleryItems
      .filter((item) => item.albumTitle)
      .reduce((acc, item) => {
        if (!acc[item.albumTitle]) acc[item.albumTitle] = [];
        acc[item.albumTitle].push(item);
        return acc;
      }, {});

    return Object.entries(grouped)
      .filter(([_, files]) => files.length > 1)
      .map(([title, files]) => ({ title, files }));
  }, [galleryItems]);

  // Search filter logic
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredAlbums(albums);
      return;
    }
    const searchLower = searchTerm.toLowerCase();
    const results = albums.filter(
      (album) =>
        album.title.toLowerCase().includes(searchLower) ||
        album.files.some((file) =>
          file.name?.toLowerCase().includes(searchLower)
        )
    );
    setFilteredAlbums(results);
  };

  // Live search
  useEffect(() => {
    const runSearch = () => {
      handleSearch();
    };
    runSearch();
  }, [searchTerm, albums]);

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setSelectedIndex(null);
  };

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  const currentItem =
    selectedAlbum && selectedIndex !== null
      ? selectedAlbum.files[selectedIndex]
      : null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedAlbum || selectedIndex === null) return;
      if (e.key === "ArrowLeft" && selectedIndex > 0)
        setSelectedIndex((prev) => prev - 1);
      else if (
        e.key === "ArrowRight" &&
        selectedIndex < selectedAlbum.files.length - 1
      )
        setSelectedIndex((prev) => prev + 1);
      else if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedAlbum, selectedIndex]);

  return (
    <>
      {/* Albums Grid or No Data */}
      {filteredAlbums.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
          />
          <p className="text-sm lg:text-xl text-gray-500 font-medium text-center">
            No albums available at the moment.
            <br />
            New content is on the way.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-1 lg:gap-3 sm:gap-1">
          {filteredAlbums.map((album) => (
            <LazyAlbumCard
              key={album.title}
              album={album}
              canHover={canHover && isDesktop}
              onClick={() => handleAlbumClick(album)}
            />
          ))}
        </div>
      )}

      {/* Album Modal */}
      {selectedAlbum && selectedIndex === null && (
        <AlbumModal
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
          onItemClick={handleItemClick}
        />
      )}

      {/* Fullscreen Item Modal */}
      {currentItem && (
        <ItemModal
          currentItem={currentItem}
          selectedAlbum={selectedAlbum}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};

// Lazy load album card component
const LazyAlbumCard = ({ album, canHover, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });
  const coverImage = album.files.find((file) => file.fileType === "image");

  return (
    <div
      ref={ref}
      className={`w-full h-44 sm:h-48 lg:h-64 relative cursor-pointer rounded-xl overflow-hidden shadow-md transition-transform duration-300 ${
        canHover ? "group hover:shadow-xl lg:hover:-translate-y-1.5" : ""
      }`}
      onClick={onClick}
    >
      {/* Image / Placeholder */}
      {inView ? (
        coverImage ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${coverImage.file}`}
            alt={album.title}
            loading="lazy"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-center px-4">
            Click to view album contents
          </div>
        )
      ) : (
        <div className="w-full h-full bg-gray-200 animate-pulse" />
      )}

      {/* Gradient overlay and info */}
      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black via-black/50 to-transparent px-3 py-2 flex justify-between md:items-center md:flex-row flex-col items-start">
        <span className="text-white text-sm font-semibold truncate max-w-[70%]">
          {album.title}
        </span>
        <span className="text-white text-xs bg-green-600/80 p-0.5 md:px-2 md:py-0.5 rounded-full">
          {album.files.length} items
        </span>
      </div>
    </div>
  );
};

// Lazy load item in album
const LazyItem = ({ item, onClick }) => {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });

  return (
    <div
      ref={ref}
      className="relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl aspect-square"
      onClick={onClick}
    >
      {inView &&
        (item.fileType === "video" ? (
          <div className="w-full h-full relative">
            <video
              src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.file}`}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                className="w-12 h-12 text-white bg-black/50 rounded-full p-2"
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
            loading="lazy"
            fill
            className="w-full h-full object-cover"
          />
        ))}
    </div>
  );
};

// Album modal showing album items
const AlbumModal = ({ album, onClose, onItemClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl h-[80vh] w-full mx-4 bg-[#151515] max-h-[80%] lg:max-h-[85%] min-h-[60%] overflow-y-auto rounded-lg p-4"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/50 hover:bg-opacity-70 rounded-full p-2 z-20"
        >
          <X />
        </button>

        <div className="mb-4">
          <p className="text-xl font-semibold text-white">{album.title}</p>

          {/* Item count */}
          <p className="text-sm text-gray-400 mt-1">
            {/* {album.files.length} {album.files.length === 1 ? "item" : "items"} */}
            {album.files.length} items
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-2 lg:gap-3">
          {album.files.map((item, idx) => (
            <LazyItem
              key={item._id}
              item={item}
              onClick={() => onItemClick(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ItemModal = ({
  currentItem,
  selectedAlbum,
  selectedIndex,
  setSelectedIndex,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[90vh] bg-[#151515] rounded-2xl overflow-hidden flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-black/50 hover:bg-opacity-70 rounded-full p-2 z-20 backdrop-blur-sm"
        >
          <X />
        </button>

        {selectedIndex > 0 && (
          <button
            onClick={() => setSelectedIndex((prev) => prev - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-opacity-70 text-white p-3 rounded-full backdrop-blur-sm"
          >
            ◀
          </button>
        )}

        {selectedIndex < selectedAlbum.files.length - 1 && (
          <button
            onClick={() => setSelectedIndex((prev) => prev + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-opacity-70 text-white p-3 rounded-full backdrop-blur-sm"
          >
            ▶
          </button>
        )}
        {/* Index Indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm z-20">
          {selectedIndex + 1} / {selectedAlbum.files.length}
        </div>

        {currentItem.fileType === "video" ? (
          <video
            src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${currentItem.file}`}
            className="w-full max-h-[70vh] object-contain bg-black"
            controls
          />
        ) : (
          <div className="max-h-[70vh] min-h-[70vh] ">
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${currentItem.file}`}
              alt={currentItem.name}
              fill
              className="max-h-[70vh] min-h-[70vh] max-w-full object-contain rounded-lg"
            />
          </div>
        )}

        <div className="bg-linear-to-t from-black/90 via-black/70 to-transparent px-6 py-4 text-white">
          {currentItem.date && (
            <p className="text-sm text-gray-300 mb-1">
              {new Date(currentItem.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
          <p className="text-xl font-semibold">{selectedAlbum.title}</p>

          {currentItem.tags && currentItem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {currentItem.tags.map((tag, idx) => (
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
      </div>
    </div>
  );
};

export default AlbumView;
