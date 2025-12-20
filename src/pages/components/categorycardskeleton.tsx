const CategoryCardSkeleton = () => {
  return (
    <div className="group relative rounded-[2rem] overflow-hidden bg-slate-200 animate-pulse aspect-[4/3] w-full">
      <div className="absolute inset-0 bg-slate-300 opacity-50"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="h-8 w-3/5 bg-slate-400 rounded-md"></div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
