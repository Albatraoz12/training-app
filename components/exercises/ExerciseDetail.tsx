'use client'

import { useExerciseById } from '@/lib/exercisedb/hooks'
import FavoriteButton from './FavoriteButton'
import AddToListButton from './AddToListButton'

type Props = {
  id: string
}

export default function ExerciseDetail({ id }: Props) {
  const { data: exercise, isLoading, error } = useExerciseById(id)

  if (isLoading) return <p className="text-center text-muted-foreground">Laddar...</p>
  if (error) return <p className="text-center text-destructive">Något gick fel. Försök igen.</p>
  if (!exercise) return null

  return (
    <div className="flex flex-col gap-8 lg:flex-row">

      {/* GIF */}
      <div className="shrink-0">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="w-full rounded-xl object-cover lg:w-80"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-3xl font-bold capitalize">{exercise.name}</h1>
            <div className="flex shrink-0 items-center gap-1">
              <FavoriteButton exerciseId={exercise.id} />
              <AddToListButton exerciseId={exercise.id} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-sm capitalize text-muted-foreground">
              {exercise.bodyPart}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-sm capitalize text-muted-foreground">
              {exercise.target}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-sm capitalize text-muted-foreground">
              {exercise.equipment}
            </span>
          </div>
        </div>

        {exercise.secondaryMuscles.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Sekundära muskler</h2>
            <div className="flex flex-wrap gap-2">
              {exercise.secondaryMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full border border-border px-3 py-1 text-sm capitalize"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {exercise.instructions.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Instruktioner</h2>
            <ol className="flex flex-col gap-2">
              {exercise.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

    </div>
  )
}
