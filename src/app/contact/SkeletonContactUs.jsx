import React from "react";

const SkeletonContactUs = () => (
  <div className="min-h-screen flex items-center justify-center px-4 py-28 pt-36">
    <section className="bg-white rounded-lg shadow-md max-w-6xl w-full max-h-max overflow-hidden grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-20 p-10 sm:grid-cols-1 animate-pulse">
      {/* Left Info Panel Skeleton */}
      <div className="flex flex-col justify-between space-y-8">
        <div>
          <div className="h-12 bg-gray-200 rounded w-48 mb-6" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-6" />

          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-gray-200 rounded-full w-12 h-12" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg shadow-md h-56 bg-gray-200" />
      </div>

      {/* Right Form Panel Skeleton */}
      <div className="flex flex-col justify-center space-y-8">
        <div className="h-10 bg-gray-200 rounded w-48" />
        <form className="space-y-6 max-h-max pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="h-12 bg-gray-200 rounded w-full" />
            <div className="h-12 bg-gray-200 rounded w-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="h-12 bg-gray-200 rounded w-full" />
            <div className="h-12 bg-gray-200 rounded w-full" />
          </div>
          <div className="h-32 bg-gray-200 rounded w-full" />
          <div className="h-12 bg-gray-200 rounded w-full" />
        </form>
      </div>
    </section>
  </div>
);

export default SkeletonContactUs;
