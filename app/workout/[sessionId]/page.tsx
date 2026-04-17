import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchWorkoutSession, fetchSetsForSession } from "@/lib/supabase/workout-actions";
import { fetchListItems } from "@/lib/supabase/actions";
import { fetchExerciseById } from "@/lib/exercisedb/actions";
import type { Exercise } from "@/lib/exercisedb/types";
import WorkoutClient from "@/components/workout/WorkoutClient";

type Props = {
  params: Promise<{ sessionId: string }>;
};

export default async function WorkoutPage({ params }: Props) {
  const { sessionId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  const session = await fetchWorkoutSession(sessionId);
  if (!session) notFound();

  // If already ended, redirect to dashboard
  if (session.ended_at) redirect("/dashboard");

  // Load exercises: from the linked list, or from already-logged sets
  let exerciseIds: string[] = [];

  if (session.list_id) {
    exerciseIds = await fetchListItems(session.list_id);
  } else {
    // Freestyle session — show exercises that already have sets logged
    const sets = await fetchSetsForSession(sessionId);
    exerciseIds = [...new Set(sets.map((s) => s.exercise_id))];
  }

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
      <WorkoutClient session={session} exercises={exercises} />
    </main>
  );
}
