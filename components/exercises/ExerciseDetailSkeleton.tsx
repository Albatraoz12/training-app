import { Skeleton } from '@/components/ui/skeleton'

export default function ExerciseDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">

      {/* GIF */}
      <Skeleton className="h-72 w-full shrink-0 rounded-xl lg:h-80 lg:w-80" />

      {/* Info */}
      <div className="flex flex-col gap-6 w-full">

        {/* Titel + knappar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-9 w-2/3" />
            <div className="flex shrink-0 items-center gap-1">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>

        {/* Sekundära muskler */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-36" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-16 rounded-full" />
          </div>
        </div>

        {/* Instruktioner */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-28" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}