'use client'

import { useQuery } from '@tanstack/react-query'
import {
  fetchExercises,
  fetchBodyParts,
  fetchExercisesByBodyPart,
  fetchExercisesByEquipment,
  fetchExercisesByTarget,
  fetchExercisesByName,
  fetchExerciseById,
} from './actions'

export function useExercises(limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['exercises', limit, offset],
    queryFn: () => fetchExercises(limit, offset),
  })
}

export function useBodyParts() {
  return useQuery({
    queryKey: ['bodyParts'],
    queryFn: fetchBodyParts,
    staleTime: Infinity,
  })
}

export function useExercisesByBodyPart(bodyPart: string, limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['exercises', 'bodyPart', bodyPart, limit, offset],
    queryFn: () => fetchExercisesByBodyPart(bodyPart, limit, offset),
    enabled: !!bodyPart,
  })
}

export function useExercisesByEquipment(equipment: string, limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['exercises', 'equipment', equipment, limit, offset],
    queryFn: () => fetchExercisesByEquipment(equipment, limit, offset),
    enabled: !!equipment,
  })
}

export function useExercisesByTarget(target: string, limit = 10, offset = 0) {
  return useQuery({
    queryKey: ['exercises', 'target', target, limit, offset],
    queryFn: () => fetchExercisesByTarget(target, limit, offset),
    enabled: !!target,
  })
}

export function useExercisesByName(name: string) {
  return useQuery({
    queryKey: ['exercises', 'name', name],
    queryFn: () => fetchExercisesByName(name),
    enabled: !!name,
  })
}

export function useExerciseById(id: string) {
  return useQuery({
    queryKey: ['exercise', id],
    queryFn: () => fetchExerciseById(id),
    enabled: !!id,
  })
}