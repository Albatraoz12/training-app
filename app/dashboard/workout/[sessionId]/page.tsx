import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  fetchWorkoutSession,
  fetchSetsForSession,
} from "@/lib/supabase/workout-actions";
import { fetchExerciseById } from "@/lib/exercisedb/actions";
import type { Exercise } from "@/lib/exercisedb/types";
import RenameSessionInput from "@/components/workout/RenameSessionInput";
import WorkoutSummaryClient from "@/components/workout/WorkoutSummaryClient";
import DeleteSessionButton from "@/components/workout/DeleteSessionButton";

type Props = {
  params: Promise<{ sessionId: string }>;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDuration(started: string, ended: string) {
  const ms = new Date(ended).getTime() - new Date(started).getTime();
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} h ${m} min` : `${h} h`;
}

export default async function WorkoutSummaryPage({ params }: Props) {
  const { sessionId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const session = await fetchWorkoutSession(sessionId);
  if (!session || !session.ended_at) notFound();

  const sets = await fetchSetsForSession(sessionId);

  // Build ordered, unique exercise list based on logged sets
  const exerciseIds = [...new Set(sets.map((s) => s.exercise_id))];

  const exercises: Exercise[] = [];
  if (exerciseIds.length > 0) {
    const results = await Promise.all(
      exerciseIds.map((id) => fetchExerciseById(id).catch(() => null)),
    );
    results.forEach((ex) => {
      if (ex) exercises.push(ex);
    });
  }

  return (
    <main className="flex flex-col gap-8 py-10">
      <div className="flex flex-col gap-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ChevronLeft className="h-4 w-4" />
          Tillbaka till dashboard
        </Link>

        <div className="flex items-center gap-2">
          <RenameSessionInput sessionId={session.id} initialName={session.name} />
          <DeleteSessionButton sessionId={session.id} />
        </div>

        <p className="text-sm text-muted-foreground capitalize">
          {formatDate(session.started_at)}
          {session.ended_at && (
            <> · {formatDuration(session.started_at, session.ended_at)}</>
          )}
        </p>
      </div>

      {exercises.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Inga set loggades under detta pass.
        </p>
      ) : (
        <WorkoutSummaryClient
          sessionId={session.id}
          exercises={exercises}
          initialSets={sets}
        />
      )}
    </main>
  );
}
