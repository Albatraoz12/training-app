import ExerciseDetail from '@/components/exercises/ExerciseDetail'
import BackButton from '@/components/layout/BackButton'

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="flex flex-col gap-6 py-10">
      <BackButton />
      <ExerciseDetail id={id} />
    </main>
  )
}