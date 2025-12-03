"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { getAboutUsApi } from "../../axios/api";
import CorePrograms from "../../components/home-components/CorePrograms";
import Founders from "../../components/home-components/Founders";
import RoadMap from "../../components/home-components/RoadMap";
import WhyChooseUs from "../../components/home-components/WhyChooseUs";

function AboutUs() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);

  // Fetch About Us Content
  useEffect(() => {
    getAboutUsApi()
      .then((res) => {
        if (res.data.success) {
          setData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
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

  return (
    <section className="items-center bg-white flex flex-col h-max p-4 md:p-4 lg:p-4 xl:p-0">
      {data ? (
        <main className="mx-auto max-w-6xl px-4 lg:px-6 pt-16 w-full">
          {/* === Top About Section (2 images left, text right) === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: two vertical cards */}
            <div className="flex gap-6 justify-center lg:justify-start">
              {/* First image */}
              <div className="relative w-40 sm:w-56 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg">
                <Image
                  src={
                    data?.image?.[0]
                      ? `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${data.image[0]}`
                      : "/about-1.png" // fallback if no image[0]
                  }
                  alt="About Robotica image 1"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Second image (slightly lower) */}
              <div className="relative w-40 sm:w-56 h-64 sm:h-80 rounded-3xl overflow-hidden shadow-lg mt-8">
                <Image
                  src={
                    data?.image?.[1]
                      ? `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${data.image[1]}`
                      : "/about-2.png" // fallback if no image[1]
                  }
                  alt="About Robotica image 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT: title + description */}
            <div className="text-left">
              <h1 className="text-[30px] sm:text-[36px] md:text-[44px] font-extrabold leading-tight mb-4 text-black">
                {data.title}
              </h1>

              <div className="flex gap-2 mt-4 mb-8">
                <span className="w-2 h-2 rounded-full bg-green" />
                <span className="w-8 h-2 rounded-full bg-green" />
                <span className="w-2 h-2 rounded-full bg-green" />
              </div>

              <div
                className="max-w-none text-black text-justify leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>

          {/* === Optional Gallery for any remaining images (from index 2 onwards) === */}
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
      ) : (
        <div className="w-full py-20 flex justify-center text-gray-500">
          Loading...
        </div>
      )}

      {/* Other sections below About */}
      <Founders />
      <CorePrograms />
      <RoadMap />
      <WhyChooseUs />
      {/* <Impacts /> */}
    </section>
  );
}

export default function About() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <Image
            src="/brandlogo.png"
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
