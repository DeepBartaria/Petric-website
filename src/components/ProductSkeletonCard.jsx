import React from 'react';

export default function ProductSkeletonCard({ className = '', mobileMode = 'grid', desktopMode = 'grid' }) {
  const mobileSizeClass =
    mobileMode === 'carousel'
      ? 'w-[calc((100vw-52px)/2)] min-w-[145px] shrink-0'
      : 'w-full min-w-0';

  const desktopSizeClass =
    desktopMode === 'carousel'
      ? 'md:w-[220px] lg:w-[240px] md:max-w-[240px]'
      : 'md:w-full md:max-w-none';

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${mobileSizeClass} ${desktopSizeClass} ${className}`}
    >
      <div className="relative flex h-[132px] w-full items-center justify-center overflow-hidden bg-gray-100 p-2 md:h-[145px] animate-pulse">
        {/* Placeholder for Image */}
      </div>

      <div className="flex flex-1 flex-col p-2.5">
        {/* Placeholder for Title */}
        <div className="mb-2 h-[12px] md:h-[13px] w-full rounded bg-gray-200 animate-pulse"></div>
        <div className="mb-3 h-[12px] md:h-[13px] w-3/4 rounded bg-gray-200 animate-pulse"></div>

        {/* Placeholder for Variant Selector */}
        <div className="mb-2 flex min-w-0 items-center">
          <div className="h-[26px] w-[80px] rounded-md bg-gray-200 animate-pulse"></div>
        </div>

        {/* Placeholder for Price */}
        <div className="mb-3 flex items-baseline gap-1.5 mt-1">
          <div className="h-[17px] w-[50px] rounded bg-gray-200 animate-pulse"></div>
          <div className="h-[10px] w-[30px] rounded bg-gray-200 animate-pulse"></div>
        </div>

        {/* Placeholder for Button */}
        <div className="mt-auto h-10 w-full rounded-lg bg-gray-200 animate-pulse"></div>
      </div>
    </article>
  );
}
