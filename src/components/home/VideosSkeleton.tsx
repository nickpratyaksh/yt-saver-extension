import { Skeleton } from "../ui/skeleton";

export function VideosSkeleton() {
  return (
    <div className={"flex flex-col gap-4"}>
      <div className="flex gap-4 h-24 ">
        <Skeleton className="h-full aspect-video" />
        <div className="flex flex-col w-full gap-2 py-1">
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="size-7" />
            <Skeleton className="size-7" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 h-24 ">
        <Skeleton className="h-full aspect-video" />
        <div className="flex flex-col w-full gap-2 py-1">
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="size-7" />
            <Skeleton className="size-7" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 h-24 ">
        <Skeleton className="h-full aspect-video" />
        <div className="flex flex-col w-full gap-2 py-1">
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="size-7" />
            <Skeleton className="size-7" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 h-24 ">
        <Skeleton className="h-full aspect-video" />
        <div className="flex flex-col w-full gap-2 py-1">
          <Skeleton className="h-4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-2 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="size-7" />
            <Skeleton className="size-7" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoSkeleton() {
  return (
    <div className="flex gap-4 h-24 ">
      <Skeleton className="h-full aspect-video" />
      <div className="flex flex-col w-full gap-2 py-1">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-2 w-16" />
        <div className="flex gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="size-7" />
          <Skeleton className="size-7" />
        </div>
      </div>
    </div>
  );
}
