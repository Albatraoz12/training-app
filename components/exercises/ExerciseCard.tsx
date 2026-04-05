import type { Exercise } from '@/lib/exercisedb/types'

type Props = {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-col gap-2 p-4">
        <h3 className="font-semibold capitalize text-zinc-900 dark:text-zinc-50">
          {exercise.name}
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-zinc-100 px-2 py-1 capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {exercise.bodyPart}
          </span>
          <span className="rounded-full bg-zinc-100 px-2 py-1 capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {exercise.target}
          </span>
          <span className="rounded-full bg-zinc-100 px-2 py-1 capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {exercise.equipment}
          </span>
        </div>
      </div>
    </div>
  )
}