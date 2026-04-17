"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSetsForSession,
  addWorkoutSet,
  updateWorkoutSet,
  deleteWorkoutSet,
  endWorkoutSession,
  fetchWorkoutHistory,
} from "./workout-actions";

export function useWorkoutSets(sessionId: string) {
  return useQuery({
    queryKey: ["workout-sets", sessionId],
    queryFn: () => fetchSetsForSession(sessionId),
    enabled: !!sessionId,
  });
}

export function useAddSet(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      exerciseId,
      setNumber,
      reps,
      weightKg,
    }: {
      exerciseId: string;
      setNumber: number;
      reps: number | null;
      weightKg: number | null;
    }) => addWorkoutSet(sessionId, exerciseId, setNumber, reps, weightKg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-sets", sessionId] });
    },
  });
}

export function useUpdateSet(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      setId,
      reps,
      weightKg,
    }: {
      setId: string;
      reps: number | null;
      weightKg: number | null;
    }) => updateWorkoutSet(setId, reps, weightKg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-sets", sessionId] });
    },
  });
}

export function useDeleteSet(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (setId: string) => deleteWorkoutSet(setId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-sets", sessionId] });
    },
  });
}

export function useEndSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => endWorkoutSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-history"] });
    },
  });
}

export function useWorkoutHistory() {
  return useQuery({
    queryKey: ["workout-history"],
    queryFn: fetchWorkoutHistory,
  });
}