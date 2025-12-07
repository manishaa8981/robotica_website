import { getNewsBySlugApi, getRecentNewsApi } from "../../../axios/api";
import moment from "moment";
import NewsContent from "./NewsContent";
import NewsActions from "./NewsActions";
import HorizontalDivider from "../../../components/HorizontalDivider";
import OurArticleComponent from "../../..//components/OurArticleComponent";
import { Calendar, Eye } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../../../../public/empty.json";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let news = null;
  try {
    const res = await getNewsBySlugApi(slug);
    if (res?.data?.success) news = res.data.result.foundNews;
  } catch (err) {
    console.error(err);
  }

  if (!news) return {};

  const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/news/${slug}`;
  const image = `${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${news.image}`;
  const description = news.description.replace(/<[^>]+>/g, "").slice(0, 160);

  return {
    title: news.title,
    description,
    openGraph: {
      title: news.title,
      description,
      url,
      siteName: "Robotica",
      images: [{ url: image, width: 1200, height: 630, alt: news.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description,
      images: [image],
    },
  };
}

export default async function NewsPage({ params }) {
  const { slug } = await params;

  let news = null;
  let recentNews = [];

  try {
    const res = await getNewsBySlugApi(slug);
    if (res?.data?.success) news = res.data.result.foundNews;

    const recentRes = await getRecentNewsApi();
    recentNews = recentRes?.data?.result || [];
  } catch (err) {
    console.error(err);
  }

  if (!news)
    return (
      <div className="flex flex-col items-center justify-center w-full p-6">
        <Lottie animationData={animationData} loop autoplay className="w-64" />
        <p className="mt-4 text-xl text-gray-500 font-medium text-center">
          No content found
        </p>
      </div>
    );

  return (
    <div className="text-[#262a2b] pb-28 pt-10 px-4 sm:px-6">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Left: Main Article */}
        <div className="md:col-span-2 space-y-6">
          {/* Title & Category */}
          <div className="space-y-2">
            {news.categoryTitle && (
              <div className="flex items-center gap-2 mb-5">
                <span className="h-10 w-1 bg-[#186f3e]" />
                <p className="text-xl text-[#186f3e] capitalize">
                  {news.categoryTitle}
                </p>
              </div>
            )}
            <h1 className="text-xl lg:text-3xl font-bold text-[#262a2b]">
              {news.title}
            </h1>

            <div className="flex items-center justify-between w-full">
              {/* Date */}
              <div className="bg-[#e1fbec] text-[#186f3e] px-4 py-1 rounded-full font-semibold shadow-md text-sm flex items-center gap-2 whitespace-nowrap">
                <Calendar size={18} />
                <span>{moment(news.createdAt).format("MMMM D, YYYY")}</span>
              </div>
              <NewsActions slug={slug} />
            </div>
          </div>

          {/* Main Image */}
          <div className="relative overflow-hidden rounded-lg shadow-md h-[400px] w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${news.image}`}
              alt={news.title}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Description */}
          <div className="text-justify prose max-w-none prose-p:text-gray-800 prose-headings:text-[#186f3e] prose-a:text-[#186f3e] prose-img:rounded-lg prose-img:shadow">
            <NewsContent model={news.description} />
            {news.tags?.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {news.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[#186f3e] -my-1 rounded font-bold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="bg-[#e1fbec] text-[#186f3e] px-4 py-2 rounded-lg font-semibold shadow-md text-sm flex items-center gap-2 whitespace-nowrap">
              <div className="justify-center text-center items-center flex bg-[#186f3e] rounded-full p-2 h-5 w-5 text-white text-sm">
                D
              </div>
              <span>DigiAdmin</span>
            </div>
          </div>
        </div>

        {/* Right: More News */}
        {recentNews.length > 0 && (
          <aside className="space-y-6">
            <h2 className="text-lg font-semibold text-[#262a2b] border-b border-gray-400 pb-2">
              More News
            </h2>
            <div className="grid gap-3">
              {recentNews.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="flex gap-4 border border-gray-200 rounded-xl shadow-md hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative w-24 h-24 shrink-0">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="py-3 pr-4 flex flex-col justify-between gap-1">
                    <p className="text-sm font-bold text-[#186f3e] line-clamp-2">
                      {item.title}
                    </p>

                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <Calendar size={15} />
                      {moment(item.createdAt).format("MMM D, YYYY")}
                    </p>

                    <span className="text-xs font-medium text-[#186f3e] hover:underline mt-1">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
