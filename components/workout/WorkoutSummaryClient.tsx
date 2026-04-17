"use client";

import type { Exercise } from "@/lib/exercisedb/types";
import type { WorkoutSet } from "@/lib/supabase/workout-actions";
import { useWorkoutSets } from "@/lib/supabase/workout-hooks";
import ExerciseLogger from "./ExerciseLogger";

type Props = {
  sessionId: string;
  exercises: Exercise[];
  initialSets: WorkoutSet[];
};

export default function WorkoutSummaryClient({
  sessionId,
  exercises,
  initialSets,
}: Props) {
  const { data: sets = initialSets } = useWorkoutSets(sessionId);

  const totalSets = sets.length;
  const totalReps = sets.reduce((sum, s) => sum + (s.reps ?? 0), 0);
  const totalVolume = sets.reduce(
    (sum, s) => sum + (s.reps ?? 0) * (s.weight_kg ?? 0),
    0,
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Set" value={totalSets} />
        <StatCard label="Reps" value={totalReps} />
        <StatCard label="Volym" value={`${totalVolume.toFixed(1)} kg`} />
      </div>

      <div className="flex flex-col gap-4">
        {exercises.map((ex) => (
          <ExerciseLogger
            key={ex.id}
            exercise={ex}
            sets={sets}
            sessionId={sessionId}
          />
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border py-4">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}