"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getVacanciesApi } from "../../axios/api"; // Your API call

// Skeleton loader for vacancies
const SkeletonJobCard = () => (
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-pulse">
    <div className="p-5 space-y-3">
      <div className="h-6 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-5/6 bg-gray-200 rounded" />
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="pt-2 flex flex-wrap gap-2">
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
      <div className="pt-2 h-4 w-28 bg-gray-200 rounded" />
    </div>
  </div>
);

export default function VacanciesPage() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const res = await getVacanciesApi();
        if (res?.data?.success) setVacancies(res.data.result || []);
        else setVacancies([]);
      } catch (err) {
        console.error(err);
        setVacancies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVacancies();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-0">
      {/* Header */}
      <div className="m-8 sm:mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-dark mb-4 leading-tight">
          Job Vacancies
        </h1>
      </div>

      {/* Vacancy Grid */}
      <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonJobCard key={i} />)
          : vacancies.length > 0
          ? vacancies.map((job) => (
              <Link
                key={job._id}
                href={`/career/${job.slug}`} // Dynamic route for job details
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="p-5">
                  <h2 className="text-lg font-semibold line-clamp-2">
                    {job.jobTitle}
                  </h2>

                  {/* <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {job.roleObjective}
                  </p> */}

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                      {job.location}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                      {job.programme}
                    </span>
                  </div>

                  <div className="mt-4 text-sm font-semibold text-[#186f3e]">
                    View details →
                  </div>
                </div>
              </Link>
            ))
          : !loading && (
              <p className="text-center text-gray-500 mt-10">
                No vacancies available.
              </p>
            )}
      </div>
    </main>
  );
}
