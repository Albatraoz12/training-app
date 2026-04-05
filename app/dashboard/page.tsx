import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/sign-in/actions'
import { Button } from '@/components/ui/button'
import { fetchUserFavorites, fetchUserLists } from '@/lib/supabase/actions'
import { fetchExerciseById } from '@/lib/exercisedb/actions'
import type { Exercise } from '@/lib/exercisedb/types'
import DashboardTabs from '@/components/dashboard/DashboardTabs'

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
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Välkommen, {name}!</h1>
          <p className="text-sm text-muted-foreground">{user!.email}</p>
        </div>
        <form action={signOut}>
          <Button variant="outline" type="submit">Logga ut</Button>
        </form>
      </div>

      <DashboardTabs favorites={favoriteExercises} lists={lists} />
    </main>
  )
}