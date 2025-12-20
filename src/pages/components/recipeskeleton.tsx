const RecipeSkeleton = () => {
  return (
    <div className="bg-white pt-12 sm:pt-20 animate-pulse">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-4 bg-slate-200 rounded-md w-2/5 mx-auto mb-4"></div>
          <div className="h-12 bg-slate-300 rounded-md w-4/5 mx-auto mb-6"></div>
          <div className="h-5 bg-slate-200 rounded-md w-full mx-auto"></div>
          <div className="h-5 bg-slate-200 rounded-md w-3/4 mx-auto mt-2"></div>
        </div>

        {/* Image Skeleton */}
        <div className="aspect-[16/9] sm:aspect-[2/1] lg:aspect-[3/2] w-full bg-slate-200 rounded-2xl mb-12"></div>

        {/* Main Content Skeleton */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Ingredients Skeleton */}
          <div className="md:w-1/3">
            <div className="h-8 bg-slate-300 rounded-md w-3/4 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded-md w-full"></div>
              <div className="h-4 bg-slate-200 rounded-md w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded-md w-full"></div>
              <div className="h-4 bg-slate-200 rounded-md w-4/6"></div>
              <div className="h-4 bg-slate-200 rounded-md w-5/6"></div>
            </div>
          </div>

          {/* Steps Skeleton */}
          <div className="md:w-2/3">
            <div className="h-8 bg-slate-300 rounded-md w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-12 bg-slate-200 rounded-md w-full"></div>
              <div className="h-12 bg-slate-200 rounded-md w-full"></div>
              <div className="h-12 bg-slate-200 rounded-md w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Notes Skeleton */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="h-7 bg-slate-300 rounded-md w-1/3 mb-4"></div>
          <div className="h-5 bg-slate-200 rounded-md w-full"></div>
          <div className="h-5 bg-slate-200 rounded-md w-1/2 mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;
