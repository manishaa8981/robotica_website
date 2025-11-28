"use client";

import React, { useEffect, useState } from "react";
import { getAllNewsApi, getRecentNewsApi } from "../../axios/api";
import OurArticleComponent from "../../components/OurArticleComponent";
import SkeletonNewsGrid from "./SkeletonNews";
import Pagination from "../../components/Pagination";
import Lottie from "lottie-react";
import animationData from "../../../public/empty.json";
import Image from "next/image";

export default function News() {
  const [allNews, setAllNews] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNewsApi();
        const newsData = res.data?.result || [];
        setAllNews(newsData);
        setFilteredNews(newsData);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentNews = async () => {
      try {
        const res = await getRecentNewsApi();
        setRecentNews(res.data?.result || []);
      } catch (err) {
        console.error("Error fetching recent news:", err);
      }
    };

    fetchNews();
    fetchRecentNews();
  }, []);

  // Search filter
  const filterNews = (term) => {
    if (!term.trim()) {
      setFilteredNews(allNews);
      setCurrentPage(1);
      return;
    }
    const searchLower = term.toLowerCase();
    const results = allNews.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.categoryTitle?.toLowerCase().includes(searchLower) ||
        item.adminName?.toLowerCase().includes(searchLower)
    );
    setFilteredNews(results);
    setCurrentPage(1);
  };

  const handleSearch = () => filterNews(searchTerm);
  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();

  // Pagination logic
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <SkeletonNewsGrid count={6} />;

  if (!allNews.length) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] py-10">
        <Lottie animationData={animationData} loop autoplay className="w-64" />
        <p className="mt-4 text-xl text-gray-500 font-medium text-center">
          No articles available yet. Stay tuned!
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-col mb-10 max-w-7xl mx-auto p-4 md:p-4 lg:p-4 xl:p-0">
      {/* Top 3 Featured Articles */}
      {recentNews.length > 0 && (
        <div className="flex flex-col gap-5 w-full mt-10">
          <OurArticleComponent news={recentNews} />
        </div>
      )}

      {/* All News Section */}
      <div className="flex flex-col gap-5 mt-10">
        {/* Heading + Search */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl mb-0 md:mb-4 font-bold">All News</h1>

          <div className="border border-gray-400 p-1 flex rounded gap-1 items-center">
            <div className="relative w-40 md:w-60">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-3 py-2 text-sm border-none focus:outline-none w-full rounded"
              />
            </div>

            <button
              onClick={handleSearch}
              className="text-xs cursor-pointer inline-flex items-center gap-2 px-4 py-2 border bg-[#186f3e] hover:shadow-md text-white rounded"
            >
              Search
            </button>
          </div>
        </div>

        {/* News Grid or "No match found" */}
        {paginatedNews.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
              {paginatedNews.map((item) => (
                <a key={item._id} href={`/news/${item.slug}`}>
                  <div
                    key={item._id}
                    className="flex flex-col h-[30vh] lg:h-[40vh] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    {/* Image */}
                    <div className="h-full w-full relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_APP_API_URL}/uploads/${item.image}`}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Info */}
                    <div className="h-2/4 bg-white p-4 flex flex-col justify-between">
                      <span className="text-xs font-semibold uppercase">
                        {item.categoryTitle || "News"}
                      </span>
                      <p className="text-lg lg:text-xl font-bold line-clamp-2 text-gray-800">
                        {item.title}
                      </p>
                      <p
                        className="text-xs md:text-lg text-gray-500 leading-tight"
                        dangerouslySetInnerHTML={{
                          __html: item.description
                            ? item.description.length > 80
                              ? item.description.slice(0, 80) + "..."
                              : item.description
                            : "",
                        }}
                      ></p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="w-10 h-10 rounded-full bg-[#186f3e] flex items-center justify-center text-white font-semibold">
                          {item.adminName?.[0] || "D"}
                        </div>
                        <div className="flex flex-col text-sm text-gray-700">
                          <span className="font-semibold">
                            {item.adminName || "DigiAdmin"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(
                              item.updatedAt || item.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-20">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="w-64"
            />
            <p className="mt-4 text-xl text-gray-500 font-medium text-center">
              No news matched your search.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
