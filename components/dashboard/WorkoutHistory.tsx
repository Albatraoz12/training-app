"use client";

import { Dumbbell } from "lucide-react";
import { useWorkoutHistory } from "@/lib/supabase/workout-hooks";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("sv-SE", {
    weekday: "short",
    day: "numeric",
    month: "short",
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

export default function WorkoutHistory() {
  const { data: sessions = [], isLoading } = useWorkoutHistory();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Inga avslutade pass än. Starta ett pass från en av dina listor!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-center gap-4 rounded-xl border border-border px-4 py-4"
        >
          <Dumbbell className="h-5 w-5 shrink-0 text-muted-foreground" />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">{session.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDate(session.started_at)}
              {session.ended_at && (
                <> · {formatDuration(session.started_at, session.ended_at)}</>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}