"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Exercise } from "@/lib/exercisedb/types";
import type { WorkoutSet } from "@/lib/supabase/workout-actions";
import { useAddSet } from "@/lib/supabase/workout-hooks";
import SetRow from "./SetRow";

type Props = {
  exercise: Exercise;
  sets: WorkoutSet[];
  sessionId: string;
};

export default function ExerciseLogger({ exercise, sets, sessionId }: Props) {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const addSet = useAddSet(sessionId);

  const exerciseSets = sets
    .filter((s) => s.exercise_id === exercise.id)
    .sort((a, b) => a.set_number - b.set_number);

  const nextSetNumber = exerciseSets.length + 1;

  function handleAdd() {
    addSet.mutate(
      {
        exerciseId: exercise.id,
        setNumber: nextSetNumber,
        reps: reps === "" ? null : Number(reps),
        weightKg: weight === "" ? null : Number(weight),
      },
      {
        onSuccess: () => {
          // Pre-fill next set with same values
        },
      },
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="h-14 w-14 rounded-lg object-cover"
        />
        <div>
          <p className="font-medium capitalize">{exercise.name}</p>
          <p className="text-xs capitalize text-muted-foreground">
            {exercise.target} · {exercise.equipment}
          </p>
        </div>
      </div>

      {exerciseSets.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-5" />
            <span className="w-20 text-center">Reps</span>
            <span className="mx-1" />
            <span className="w-20 text-center">Vikt</span>
          </div>
          {exerciseSets.map((s) => (
            <SetRow key={s.id} set={s} sessionId={sessionId} />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className="w-5 text-center text-xs text-muted-foreground">
          {nextSetNumber}
        </span>
        <Input
          type="number"
          min={0}
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          placeholder="Reps"
          className="h-8 w-20 text-center text-sm"
        />
        <span className="text-xs text-muted-foreground">×</span>
        <Input
          type="number"
          min={0}
          step={0.5}
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="kg"
          className="h-8 w-20 text-center text-sm"
        />
        <span className="text-xs text-muted-foreground">kg</span>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAdd}
          disabled={addSet.isPending}
          className="h-8 gap-1"
        >
          <Plus className="h-3.5 w-3.5" />
          Lägg till
        </Button>
      </div>
    </div>
  );
}