import ExerciseDetail from '@/components/exercises/ExerciseDetail'

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="py-10">
      <ExerciseDetail id={id} />
    </main>
  )
}