const SkeletonNewsLoader = () => {
  return (
    <div className="pb-28 pt-32 px-4 sm:px-4 bg-[#f9fafb] max-w-7xl mx-auto animate-pulse">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center w-full gap-6 mb-10">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-10 w-3/4 lg:w-1/2 bg-gray-200 rounded" />
        <div className="flex gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="flex flex-col gap-1">
                <div className="h-3 w-16 bg-gray-200 rounded" />
                <div className="h-3 w-10 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="w-auto lg:w-7xl max-w-7xl h-[60vh] bg-gray-200 rounded-lg mb-10" />

      {/* Description */}
      <div className="max-w-7xl mx-auto space-y-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-gray-200 rounded ${
              i === 5 ? "w-1/3" : "w-full"
            }`}
          />
        ))}

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-gray-200 rounded-full" />
          ))}
        </div>

        {/* Social Share Buttons */}
        <div className="flex gap-3 mt-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>

      {/* Read More Section */}
      <div className="flex flex-col gap-5 w-full max-w-7xl mx-auto mt-10">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 w-full bg-gray-200 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default SkeletonNewsLoader;
