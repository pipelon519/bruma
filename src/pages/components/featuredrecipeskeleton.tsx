const FeaturedRecipeSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-16 items-center animate-pulse">
      {/* Image Skeleton */}
      <div>
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-slate-200"></div>
      </div>

      {/* Text Skeleton */}
      <div>
        <div className="h-10 bg-slate-300 rounded-md w-4/5 mb-4"></div>
        <div className="h-10 bg-slate-300 rounded-md w-2/5 mb-6"></div>
        
        <div className="h-5 bg-slate-200 rounded-md w-full mb-2"></div>
        <div className="h-5 bg-slate-200 rounded-md w-5/6 mb-8"></div>

        <div className="flex gap-6 mb-10">
          <div className="h-6 bg-slate-200 rounded-md w-1/4"></div>
          <div className="h-6 bg-slate-200 rounded-md w-1/4"></div>
        </div>

        <div className="h-14 bg-slate-300 rounded-full w-48"></div>
      </div>
    </div>
  );
};

export default FeaturedRecipeSkeleton;
