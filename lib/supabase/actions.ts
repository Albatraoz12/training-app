'use server'

import { createClient } from './server'

// ---- Favorites ----

export async function fetchUserFavorites(): Promise<string[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('favorites')
    .select('exercise_id')
    .eq('user_id', user.id)

  return data?.map((f) => f.exercise_id) ?? []
}

export async function toggleFavorite(exerciseId: string): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('exercise_id', exerciseId)
    .single()

  if (data) {
    await supabase.from('favorites').delete().eq('id', data.id)
  } else {
    await supabase.from('favorites').insert({ user_id: user.id, exercise_id: exerciseId })
  }
}

// ---- Lists ----

export type ExerciseList = {
  id: string
  name: string
  created_at: string
}

export async function fetchUserLists(): Promise<ExerciseList[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('exercise_lists')
    .select('id, name, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function fetchListItems(listId: string): Promise<string[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('exercise_list_items')
    .select('exercise_id')
    .eq('list_id', listId)

  return (data ?? []).map((i) => i.exercise_id)
}

export async function fetchUserListsWithItems(): Promise<(ExerciseList & { exerciseIds: string[] })[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('exercise_lists')
    .select('id, name, created_at, exercise_list_items(exercise_id)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (data ?? []).map((list) => ({
    id: list.id,
    name: list.name,
    created_at: list.created_at,
    exerciseIds: (list.exercise_list_items as { exercise_id: string }[]).map((i) => i.exercise_id),
  }))
}

export async function createList(name: string): Promise<ExerciseList> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('exercise_lists')
    .insert({ user_id: user.id, name })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function addExerciseToList(listId: string, exerciseId: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('exercise_list_items')
    .insert({ list_id: listId, exercise_id: exerciseId })

  if (error && error.code !== '23505') throw new Error(error.message)
}