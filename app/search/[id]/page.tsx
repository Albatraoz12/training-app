import ExerciseDetail from '@/components/exercises/ExerciseDetail'

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <ExerciseDetail id={id} />
    </main>
  )
}