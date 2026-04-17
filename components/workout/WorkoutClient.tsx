"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Exercise } from "@/lib/exercisedb/types";
import type { WorkoutSession } from "@/lib/supabase/workout-actions";
import { useWorkoutSets, useEndSession } from "@/lib/supabase/workout-hooks";
import ExerciseLogger from "./ExerciseLogger";

type Props = {
  session: WorkoutSession;
  exercises: Exercise[];
};

export default function WorkoutClient({ session, exercises }: Props) {
  const router = useRouter();
  const { data: sets = [] } = useWorkoutSets(session.id);
  const endSession = useEndSession();
  const [done, setDone] = useState(false);

  const totalSets = sets.length;

  async function handleEnd() {
    await endSession.mutateAsync(session.id);
    setDone(true);
    router.push("/dashboard");
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <p className="text-lg font-semibold">Passet avslutat!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{session.name}</h1>
          <p className="text-sm text-muted-foreground">
            {totalSets} {totalSets === 1 ? "set loggat" : "set loggade"}
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="shrink-0" disabled={endSession.isPending}>
              Avsluta pass
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Avsluta passet?</AlertDialogTitle>
              <AlertDialogDescription>
                Du har loggat {totalSets} set. Passet sparas i din historik.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Fortsätt träna</AlertDialogCancel>
              <AlertDialogAction onClick={handleEnd}>
                Avsluta
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex flex-col gap-4">
        {exercises.map((ex) => (
          <ExerciseLogger
            key={ex.id}
            exercise={ex}
            sets={sets}
            sessionId={session.id}
          />
        ))}
      </div>
    </div>
  );
}