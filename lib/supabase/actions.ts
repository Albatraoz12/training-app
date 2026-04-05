'use server'

import { createClient } from './server'

// ---- Profile ----

type ProfileState = { error: string } | { success: true } | null

export async function updateProfile(_prevState: ProfileState, formData: FormData): Promise<ProfileState> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Inte inloggad.' }

  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const age = Number(formData.get('age'))
  const gender = formData.get('gender') as string

  const { error } = await supabase
    .from('profiles')
    .update({ first_name: firstName, last_name: lastName, age, gender })
    .eq('id', user.id)

  if (error) return { error: error.message }
  return { success: true }
}

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
  exerciseCount: number
}

export async function fetchUserLists(): Promise<ExerciseList[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('exercise_lists')
    .select('id, name, created_at, exercise_list_items(count)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (data ?? []).map((list) => ({
    id: list.id,
    name: list.name,
    created_at: list.created_at,
    exerciseCount: (list.exercise_list_items as unknown as { count: number }[])[0]?.count ?? 0,
  }))
}

export async function fetchListsContainingExercise(exerciseId: string): Promise<string[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('exercise_list_items')
    .select('list_id, exercise_lists!inner(user_id)')
    .eq('exercise_id', exerciseId)
    .eq('exercise_lists.user_id', user.id)

  return (data ?? []).map((row) => row.list_id)
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
    exerciseCount: 0,
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

export async function renameList(listId: string, name: string): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('exercise_lists')
    .update({ name })
    .eq('id', listId)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
}

export async function removeExerciseFromList(listId: string, exerciseId: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('exercise_list_items')
    .delete()
    .eq('list_id', listId)
    .eq('exercise_id', exerciseId)

  if (error) throw new Error(error.message)
}