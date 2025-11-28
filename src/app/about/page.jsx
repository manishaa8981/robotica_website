"use client";
import { Suspense, useEffect } from "react";

import CorePrograms from "@/components/home-components/CorePrograms";
import Founders from "@/components/home-components/Founders";
import Impacts from "@/components/home-components/Impacts";
import RoadMap from "@/components/home-components/RoadMap";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import WhyChooseUs from "@/components/home-components/WhyChooseUs";

function AboutUs() {
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    const scrollToId = searchParams.get("scroll");
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView();
          router.replace("/", { scroll: false });
        }, 300);
      }
    }
  }, [searchParams, router]);

  return (
    <section className="items-center flex flex-col gap-20 h-max p-4 md:p-4 lg:p-4 xl:p-0">
      <CorePrograms />
      <Founders />
      <RoadMap />
      <WhyChooseUs />
      <Impacts />
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
