import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { fetchListItems } from '@/lib/supabase/actions'
import { fetchExerciseById } from '@/lib/exercisedb/actions'
import type { Exercise } from '@/lib/exercisedb/types'
import RemoveFromListButton from '@/components/exercises/RemoveFromListButton'
import RenameListInput from '@/components/exercises/RenameListInput'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ListPage({ params }: Props) {
  const { id } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: list } = await supabase
    .from('exercise_lists')
    .select('id, name')
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!list) notFound()

  const exerciseIds = await fetchListItems(id)

  const exercises: Exercise[] = []
  if (exerciseIds.length > 0) {
    const results = await Promise.all(
      exerciseIds.map((eid) => fetchExerciseById(eid).catch(() => null)),
    )
    results.forEach((ex) => { if (ex) exercises.push(ex) })
  }

  return (
    <main className="flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ChevronLeft className="h-4 w-4" />
          Tillbaka till dashboard
        </Link>
        <RenameListInput listId={id} initialName={list.name} />
        <p className="text-sm text-muted-foreground">
          {exercises.length} {exercises.length === 1 ? 'övning' : 'övningar'}
        </p>
      </div>

      {exercises.length === 0 ? (
        <p className="text-sm text-muted-foreground">Listan är tom.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {exercises.map((ex) => (
            <div key={ex.id} className="relative">
              <Link
                href={`/search/${ex.id}`}
                className="flex flex-col overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md"
              >
                <img
                  src={ex.gifUrl}
                  alt={ex.name}
                  className="h-36 w-full object-cover"
                />
                <p className="line-clamp-2 px-2 py-2 text-xs font-medium capitalize hover:underline">
                  {ex.name}
                </p>
              </Link>
              <RemoveFromListButton listId={id} exerciseId={ex.id} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}