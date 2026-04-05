import type { Exercise } from '@/lib/exercisedb/types'
import ExerciseCard from './ExerciseCard'

type Props = {
  exercises: Exercise[]
}

export default function ExerciseList({ exercises }: Props) {
  if (exercises.length === 0) {
    return (
      <p className="text-center text-zinc-500 dark:text-zinc-400">
        Inga övningar hittades.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}