'use server'

import type { Exercise } from './types'

const BASE_URL = 'https://exercisedb.p.rapidapi.com'

const headers = {
  'X-RapidAPI-Key': process.env.NEXT_PUBLIC_X_RapidAPI_Key!,
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { headers })
  if (!res.ok) throw new Error(`ExerciseDB error: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

export async function fetchExercises(limit = 10, offset = 0): Promise<Exercise[]> {
  return apiFetch(`/exercises?limit=${limit}&offset=${offset}`)
}

export async function fetchBodyParts(): Promise<string[]> {
  return apiFetch('/exercises/bodyPartList')
}

export async function fetchExercisesByBodyPart(
  bodyPart: string,
  limit = 10,
  offset = 0,
): Promise<Exercise[]> {
  return apiFetch(`/exercises/bodyPart/${encodeURIComponent(bodyPart)}?limit=${limit}&offset=${offset}`)
}

export async function fetchExercisesByEquipment(
  equipment: string,
  limit = 10,
  offset = 0,
): Promise<Exercise[]> {
  return apiFetch(`/exercises/equipment/${encodeURIComponent(equipment)}?limit=${limit}&offset=${offset}`)
}

export async function fetchExercisesByTarget(
  target: string,
  limit = 10,
  offset = 0,
): Promise<Exercise[]> {
  return apiFetch(`/exercises/target/${encodeURIComponent(target)}?limit=${limit}&offset=${offset}`)
}

export async function fetchExercisesByName(name: string): Promise<Exercise[]> {
  return apiFetch(`/exercises/name/${encodeURIComponent(name)}`)
}

export async function fetchExerciseById(id: string): Promise<Exercise> {
  return apiFetch(`/exercises/exercise/${id}`)
}