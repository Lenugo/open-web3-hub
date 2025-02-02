import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export function DetailCardSkeleton() {
  return (
    <div className="bg-gray-600/20 p-4 rounded-lg animate-pulse">
      <div className="flex items-center gap-2 mb-1">
        <Skeleton className="size-6 rounded bg-gray-600/40" />
        <Skeleton className="h-4 w-24 rounded bg-gray-600/40" />
      </div>
      <Skeleton className="h-7 w-20 mt-1 rounded bg-gray-600/40" />
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <Card className="flex rounded-3xl relative items-center h-44 p-4">
      <Skeleton className="size-24 rounded-lg" />

      <CardContent className="flex-grow pl-6 md:pl-8">
        <div className="my-2">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        <div className="absolute top-4 right-4">
          <Skeleton className="h-6 w-16 rounded-2xl" />
        </div>
      </CardContent>     
    </Card>
  )
}

export function CardBlankSkeleton({ classnames }: { classnames?: string}) {
  return (
    <Skeleton className={classnames} />
  )
}

export function SearchReposSkeleton() {
  return (
    <div className="mb-6 space-y-4 max-w-[10rem]">
      <h2 className="text-sm text-muted-foreground">
        <Skeleton className="bg-muted p-4" />
      </h2>
    </div>
  )
}