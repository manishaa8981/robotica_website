"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { getAboutUsApi } from "../../axios/api";
import Founders from "../../components/home-components/Founders";

function AboutUs() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch About Us Content
  useEffect(() => {
    getAboutUsApi()
      .then((res) => {
        if (res.data.success) {
          setData(res.data.result);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // Smooth Scroll
  useEffect(() => {
    const scrollToId = searchParams.get("scroll");
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [searchParams]);
  if (loading) {
    return (
      <section className="bg-soft flex flex-col w-full">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 py-10 w-full animate-pulse">
          {/* Title Skeleton */}
          <div className="text-center mb-12">
            <div className="h-10 sm:h-12 lg:h-14 w-3/4 sm:w-1/2 mx-auto bg-black/10 rounded-xl" />
            <div className="h-4 w-40 mx-auto bg-black/10 rounded-lg mt-4" />
          </div>

          {/* Main Layout Skeleton */}
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* Left Images (sticky area) */}
            <div className="lg:sticky lg:top-28">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="w-full h-56 sm:h-72 md:h-80 rounded-3xl bg-black/10 shadow-lg" />
                <div className="w-full h-56 sm:h-72 md:h-80 rounded-3xl bg-black/10 shadow-lg" />
              </div>
            </div>

            {/* Right Text Skeleton */}
            <div className="space-y-3 mt-4 lg:mt-0">
              <div className="h-5 w-4/5 bg-black/10 rounded-lg" />
              <div className="h-5 w-full bg-black/10 rounded-lg" />
              <div className="h-5 w-11/12 bg-black/10 rounded-lg" />
              <div className="h-5 w-full bg-black/10 rounded-lg" />
              <div className="h-5 w-10/12 bg-black/10 rounded-lg" />
              <div className="h-5 w-full bg-black/10 rounded-lg" />
              <div className="h-5 w-3/4 bg-black/10 rounded-lg" />

              <div className="h-4 w-48 bg-black/10 rounded-lg mt-6" />

              <div className="space-y-2 mt-2">
                <div className="h-4 w-full bg-black/10 rounded-lg" />
                <div className="h-4 w-5/6 bg-black/10 rounded-lg" />
                <div className="h-4 w-11/12 bg-black/10 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Optional Gallery Skeleton (always show while loading for consistency) */}
          <section className="mt-16">
            <div className="h-7 w-64 bg-black/10 rounded-lg mb-4" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full h-64 rounded-xl bg-black/10 shadow-md"
                />
              ))}
            </div>
          </section>
        </main>

        {/* Founders placeholder (keeps page height stable) */}
        <section className="w-full py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 animate-pulse">
            <div className="h-8 w-56 bg-black/10 rounded-lg mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white/60 rounded-2xl border border-black/5 p-6 shadow-sm"
                >
                  <div className="h-24 w-24 bg-black/10 rounded-xl mb-4" />
                  <div className="h-5 w-3/4 bg-black/10 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-black/10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bg-white flex flex-col w-full">
        <div className="w-full py-20 flex justify-center text-gray-500">
          Failed to load About Us content.
        </div>

        <Founders />
        {/* <CorePrograms />
        <RoadMap />
        <WhyChooseUs /> */}
      </section>
    );
  }

  return (
    <section className="bg-soft flex flex-col w-full">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 py-10 w-full">
        {/* --- TITLE AT TOP --- */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* --- ABOUT SECTION: IMAGES LEFT (STICKY ON DESKTOP) + TEXT RIGHT --- */}
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          {/* LEFT IMAGES – sticky only on lg+ */}
          <div className="lg:sticky lg:top-28">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* First image */}
              <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={
                    data?.image?.[0]
                      ? `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${data.image[0]}`
                      : "/about-1.png"
                  }
                  alt="About Robotica image 1"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Second image */}
              <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={
                    data?.image?.[1]
                      ? `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${data.image[1]}`
                      : "/about-2.png"
                  }
                  alt="About Robotica image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT TEXT – scrolls while images stay on desktop */}
          <div className="text-left text-base leading-relaxed text-justify text-white space-y-4 mt-4 lg:mt-0">
            <div
              className="prose max-w-none text-black"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
        </div>

        {/* --- OPTIONAL GALLERY FOR MORE IMAGES --- */}
        {data?.image?.length > 2 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Our Journey in Pictures
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.image.slice(2).map((img, index) => (
                <div
                  key={index}
                  className="relative w-full h-64 rounded-xl overflow-hidden shadow-md group"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${img}`}
                    alt={`About Image ${index + 3}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Other sections below About */}
      <Founders />
      {/* <CorePrograms />
      <RoadMap />
      <WhyChooseUs /> */}
    </section>
  );
}

export default function About() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <Image
            src="/logo.jpg"
            alt="Robotica Logo"
            width={120}
            height={120}
            className="animate-bounce"
          />
        </div>
      }
    >
      <AboutUs />
    </Suspense>
  );
}
