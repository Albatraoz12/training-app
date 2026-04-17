'use server'

import { createClient } from './server'

// ---- Types ----

export type WorkoutSession = {
  id: string
  list_id: string | null
  name: string
  started_at: string
  ended_at: string | null
  created_at: string
}

export type WorkoutSet = {
  id: string
  session_id: string
  exercise_id: string
  set_number: number
  reps: number | null
  weight_kg: number | null
  created_at: string
}

// ---- Sessions ----

export async function startWorkoutSession(
  name: string,
  listId: string | null,
): Promise<WorkoutSession> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('workout_sessions')
    .insert({ user_id: user.id, name, list_id: listId })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function endWorkoutSession(sessionId: string): Promise<void> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('workout_sessions')
    .update({ ended_at: new Date().toISOString() })
    .eq('id', sessionId)
    .eq('user_id', user.id)

  if (error) throw new Error(error.message)
}

export async function fetchWorkoutSession(sessionId: string): Promise<WorkoutSession | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('id', sessionId)
    .eq('user_id', user.id)
    .single()

  return data ?? null
}

export async function fetchWorkoutHistory(): Promise<WorkoutSession[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', user.id)
    .not('ended_at', 'is', null)
    .order('created_at', { ascending: false })
    .limit(20)

  return data ?? []
}

// ---- Sets ----

export async function fetchSetsForSession(sessionId: string): Promise<WorkoutSet[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('workout_sets')
    .select('*')
    .eq('session_id', sessionId)
    .order('exercise_id')
    .order('set_number')

  return data ?? []
}

export async function addWorkoutSet(
  sessionId: string,
  exerciseId: string,
  setNumber: number,
  reps: number | null,
  weightKg: number | null,
): Promise<WorkoutSet> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workout_sets')
    .insert({ session_id: sessionId, exercise_id: exerciseId, set_number: setNumber, reps, weight_kg: weightKg })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateWorkoutSet(
  setId: string,
  reps: number | null,
  weightKg: number | null,
): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('workout_sets')
    .update({ reps, weight_kg: weightKg })
    .eq('id', setId)

  if (error) throw new Error(error.message)
}

export async function deleteWorkoutSet(setId: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase
    .from('workout_sets')
    .delete()
    .eq('id', setId)

  if (error) throw new Error(error.message)
}