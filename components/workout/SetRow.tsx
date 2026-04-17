"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WorkoutSet } from "@/lib/supabase/workout-actions";
import { useUpdateSet, useDeleteSet } from "@/lib/supabase/workout-hooks";

type Props = {
  set: WorkoutSet;
  sessionId: string;
};

export default function SetRow({ set, sessionId }: Props) {
  const updateSet = useUpdateSet(sessionId);
  const deleteSet = useDeleteSet(sessionId);

  function handleBlur(field: "reps" | "weight_kg", value: string) {
    const parsed = value === "" ? null : Number(value);
    if (field === "reps") {
      updateSet.mutate({ setId: set.id, reps: parsed, weightKg: set.weight_kg });
    } else {
      updateSet.mutate({ setId: set.id, reps: set.reps, weightKg: parsed });
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="w-5 text-center text-xs font-medium text-muted-foreground">
        {set.set_number}
      </span>
      <div className="flex items-center gap-1">
        <Input
          type="number"
          min={0}
          defaultValue={set.reps ?? ""}
          placeholder="Reps"
          className="h-8 w-20 text-center text-sm"
          onBlur={(e) => handleBlur("reps", e.target.value)}
        />
        <span className="text-xs text-muted-foreground">×</span>
        <Input
          type="number"
          min={0}
          step={0.5}
          defaultValue={set.weight_kg ?? ""}
          placeholder="kg"
          className="h-8 w-20 text-center text-sm"
          onBlur={(e) => handleBlur("weight_kg", e.target.value)}
        />
        <span className="text-xs text-muted-foreground">kg</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-destructive"
        onClick={() => deleteSet.mutate(set.id)}
        disabled={deleteSet.isPending}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}