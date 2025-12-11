"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

export default function ImageCarousel({ slides = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      Autoplay({
        delay: 1500, 
        stopOnInteraction: false, 
        stopOnMouseEnter: true, 
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full py-0 mb-10">
      {/* gradient fade on edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#020726] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#020726] to-transparent z-10" />

      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className="
                relative 
                flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_60%]
                px-3
              "
            >
              <div className="relative w-full overflow-hidden rounded-2xl shadow-xl bg-black/40">
                <Image
                  src={slide.src}
                  alt={slide.alt || `slide-${idx}`}
                  width={1600}
                  height={600}
                  className="h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] w-full object-cover"
                  priority={idx === 0}
                />

                {/* Optional text overlay */}
                {slide.title || slide.subtitle ? (
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full p-4 sm:p-6 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white">
                      {slide.title && (
                        <h3 className="text-lg sm:text-2xl font-semibold mb-1">
                          {slide.title}
                        </h3>
                      )}
                      {slide.subtitle && (
                        <p className="text-xs sm:text-sm text-white/80">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        type="button"
        onClick={scrollPrev}
        className="
          absolute left-6 top-1/2 -translate-y-1/2 
          z-20 inline-flex h-9 w-9 items-center justify-center rounded-full 
          bg-black/60 hover:bg-black/80 border border-white/20
        "
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>

      <button
        type="button"
        onClick={scrollNext}
        className="
          absolute right-6 top-1/2 -translate-y-1/2 
          z-20 inline-flex h-9 w-9 items-center justify-center rounded-full 
          bg-black/60 hover:bg-black/80 border border-white/20
        "
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}
