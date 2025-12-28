"use client";
import { Suspense, useEffect, useState } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getRecentNewsApi } from "../axios/api";
import CorePrograms from "../components/home-components/CorePrograms";
import CoursesPage from "../components/home-components/Courses";
import { HeroBanner } from "../components/home-components/Hero";
import IndustryPartnersCarousel from "../components/home-components/IndustryPartnersCarousel";
import MottoPage from "../components/home-components/MissionVision";
import Objectives from "../components/home-components/Objectives";
import OperatingModel from "../components/home-components/OperatingModel";
import WhyChooseUs from "../components/home-components/WhyChooseUs";

function HomeContent() {
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const scrollToId = searchParams.get("scroll");
    if (scrollToId) {
      const handleScroll = () => {
        const element = document.getElementById(scrollToId);
        if (element) {
          const offset = 100;
          const elementTop =
            element.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: elementTop,
            behavior: "smooth",
          });

          router.replace("/", { scroll: false });
        } else {
          setTimeout(handleScroll, 200);
        }
      };

      setTimeout(handleScroll, 400);
    }
  }, [searchParams, router]);

  // Fetch recent news
  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const res = await getRecentNewsApi();
        setRecentNews(res.data?.result || res.data?.result?.news || []);
      } catch (err) {
        console.error("Error fetching recent news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentNews();
  }, []);

  return (
    // <section className="mb-10 md:mb-20 items-center flex flex-col gap-8 md:gap-8 h-max lg:p-4 xl:p-0">
    //   <HeroBanner />
    //   <MottoPage />
    //   <Objectives />
    //   <CorePrograms />

    //   <WhyChooseUs />
    //   <OperatingModel />
    //   {/* <PopularCourse /> */}
    //   {/* {!loading && recentNews.length > 0 && (
    //     <div className="max-w-7xl mx-auto">
    //       <OurArticleComponent news={recentNews} />
    //     </div>
    //   )} */}
    // </section>
    <main className="w-full overflow-x-hidden">
      <HeroBanner />

      <MottoPage />

      <Objectives />

      <CoursesPage />

      {/* <CorePrograms /> */}

      <IndustryPartnersCarousel />

      <OperatingModel />

      <WhyChooseUs />
    </main>
  );
}

export default function Home() {
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
      <HomeContent />
    </Suspense>
  );
}
