import { Suspense } from 'react'
import ExerciseSearch from '@/components/exercises/ExerciseSearch'

export default function SearchPage() {
  return (
    <main className="flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Sök övningar</h1>
        <p className="text-sm text-muted-foreground">
          Sök på namn eller filtrera på muskelgrupp.
        </p>
      </div>
      <Suspense>
        <ExerciseSearch />
      </Suspense>
    </main>
  )
}