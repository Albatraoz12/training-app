"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { createClient } from "./client";
import {
  fetchUserFavorites,
  fetchUserLists,
  toggleFavorite,
  createList,
  addExerciseToList,
  removeExerciseFromList,
  fetchAllListMemberships,
} from "./actions";

export function useUser() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setIsLoggedIn(!!session?.user);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return { isLoggedIn };
}

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchUserFavorites,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorite,
    onMutate: async (exerciseId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const previous = queryClient.getQueryData<string[]>(["favorites"]);

      queryClient.setQueryData<string[]>(["favorites"], (old = []) =>
        old.includes(exerciseId)
          ? old.filter((id) => id !== exerciseId)
          : [...old, exerciseId],
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["favorites"], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useUserLists() {
  return useQuery({
    queryKey: ["lists"],
    queryFn: fetchUserLists,
  });
}

export function useCreateList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
}

export function useAllListMemberships() {
  return useQuery({
    queryKey: ["listMemberships"],
    queryFn: fetchAllListMemberships,
  });
}

export function useAddToList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listId,
      exerciseId,
    }: {
      listId: string;
      exerciseId: string;
    }) => addExerciseToList(listId, exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listMemberships"] });
    },
  });
}

export function useRemoveFromList() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listId,
      exerciseId,
    }: {
      listId: string;
      exerciseId: string;
    }) => removeExerciseFromList(listId, exerciseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listMemberships"] });
    },
  });
}
