const SkeletonNewsGrid = ({ count = 6 }) => {
  return (
    <div className="flex flex-col my-10 gap-10 max-w-7xl mx-auto animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded mb-6" />

      {/* Heading Skeleton */}
      <div className="h-8 w-64 bg-gray-200 rounded mb-6" />

      {/* Search Bar Skeleton */}
      <div className="flex justify-end mb-6 gap-2">
        <div className="h-10 w-60 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>

      {/* News Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col h-[30vh] lg:h-[65vh] w-full rounded-lg overflow-hidden shadow-md"
          >
            {/* Image Skeleton */}
            <div className="h-2/4 w-full bg-gray-200" />

            {/* Info Section Skeleton */}
            <div className="h-2/4 bg-white p-4 flex flex-col justify-between">
              {/* Category */}
              <div className="h-3 w-20 bg-gray-200 rounded mb-2"></div>

              {/* Title */}
              <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 w-2/3 bg-gray-200 rounded mb-2"></div>

              {/* Description */}
              <div className="h-3 w-full bg-gray-200 rounded mb-1"></div>
              <div className="h-3 w-5/6 bg-gray-200 rounded mb-1"></div>

              {/* Admin/Profile */}
              <div className="flex items-center gap-3 mt-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex flex-col gap-1">
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  <div className="h-2 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonNewsGrid;
