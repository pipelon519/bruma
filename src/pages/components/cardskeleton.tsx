const CardSkeleton = () => {
  return (
    <div className="group rounded-3xl overflow-hidden bg-white shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="h-56 w-full bg-slate-200"></div>

      <div className="p-6">
        {/* Title Skeleton */}
        <div className="h-7 bg-slate-300 rounded-md w-4/5 mb-3"></div>
        <div className="h-7 bg-slate-300 rounded-md w-2/5 mb-4"></div>

        {/* Description Skeleton */}
        <div className="h-4 bg-slate-200 rounded-md w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded-md w-full mb-2"></div>
        <div className="h-4 bg-slate-200 rounded-md w-3/4 mb-6"></div>

        {/* Meta Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-5 bg-slate-200 rounded-md w-1/4"></div>
          <div className="h-5 bg-slate-200 rounded-md w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
