import { Skeleton } from "./ui/skeleton";

export function DetailCardSkeleton() {
  return (
    <div className="bg-secondary/20 p-4 rounded-lg animate-pulse">
      <div className="flex items-center gap-2 mb-1">
        <Skeleton className="size-6 rounded bg-secondary/40" />
        <Skeleton className="h-4 w-24 rounded bg-secondary/40" />
      </div>
      <Skeleton className="h-7 w-20 mt-1 rounded bg-secondary/40" />
    </div>
  )
}