'use client'

import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from './client'

export function useUser() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return { isLoggedIn }
}

import {
  fetchUserFavorites,
  fetchUserLists,
  toggleFavorite,
  createList,
  addExerciseToList,
  removeExerciseFromList,
  fetchListsContainingExercise,
} from './actions'

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchUserFavorites,
  })
}

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleFavorite,
    onMutate: async (exerciseId) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] })
      const previous = queryClient.getQueryData<string[]>(['favorites'])

      queryClient.setQueryData<string[]>(['favorites'], (old = []) =>
        old.includes(exerciseId)
          ? old.filter((id) => id !== exerciseId)
          : [...old, exerciseId],
      )

      return { previous }
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(['favorites'], context?.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
    },
  })
}

export function useUserLists() {
  return useQuery({
    queryKey: ['lists'],
    queryFn: fetchUserLists,
  })
}

export function useCreateList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] })
    },
  })
}

export function useAddToList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listId, exerciseId }: { listId: string; exerciseId: string }) =>
      addExerciseToList(listId, exerciseId),
    onSuccess: (_data, { exerciseId }) => {
      queryClient.invalidateQueries({ queryKey: ['listMembership', exerciseId] })
    },
  })
}

export function useExerciseListMembership(exerciseId: string) {
  return useQuery({
    queryKey: ['listMembership', exerciseId],
    queryFn: () => fetchListsContainingExercise(exerciseId),
  })
}

export function useRemoveFromList() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listId, exerciseId }: { listId: string; exerciseId: string }) =>
      removeExerciseFromList(listId, exerciseId),
    onSuccess: (_data, { exerciseId }) => {
      queryClient.invalidateQueries({ queryKey: ['listMembership', exerciseId] })
    },
  })
}