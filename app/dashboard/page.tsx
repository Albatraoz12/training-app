import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/sign-in/actions'
import { Button } from '@/components/ui/button'
import { fetchUserFavorites, fetchUserLists } from '@/lib/supabase/actions'
import { fetchExerciseById } from '@/lib/exercisedb/actions'
import type { Exercise } from '@/lib/exercisedb/types'
import { ListMusic } from 'lucide-react'

function ExerciseMiniCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/search/${exercise.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="h-36 w-full object-cover"
      />
      <p className="line-clamp-2 px-2 py-2 text-xs font-medium capitalize group-hover:underline">
        {exercise.name}
      </p>
    </Link>
  )
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', user!.id)
    .single()

  const name = profile?.first_name
    ? `${profile.first_name} ${profile.last_name}`
    : user!.email

  const [favoriteIds, lists] = await Promise.all([
    fetchUserFavorites(),
    fetchUserLists(),
  ])

  const favoriteExercises: Exercise[] = []
  if (favoriteIds.length > 0) {
    const results = await Promise.all(
      favoriteIds.map((id) => fetchExerciseById(id).catch(() => null)),
    )
    results.forEach((ex) => { if (ex) favoriteExercises.push(ex) })
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Välkommen, {name}!</h1>
          <p className="text-sm text-muted-foreground">{user!.email}</p>
        </div>
        <form action={signOut}>
          <Button variant="outline" type="submit">Logga ut</Button>
        </form>
      </div>

      {/* Favorites */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Gillade övningar</h2>
        {favoriteExercises.length === 0 ? (
          <p className="text-sm text-muted-foreground">Du har inga gillade övningar än.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {favoriteExercises.map((ex) => (
              <ExerciseMiniCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </section>

      {/* Lists */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Mina listor</h2>
        {lists.length === 0 ? (
          <p className="text-sm text-muted-foreground">Du har inga listor än.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {lists.map((list) => (
              <Link
                key={list.id}
                href={`/dashboard/list/${list.id}`}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-4 transition-shadow hover:shadow-md"
              >
                <ListMusic className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="font-medium">{list.name}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}