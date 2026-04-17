"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startWorkoutSession } from "@/lib/supabase/workout-actions";

type Props = {
  listId: string;
  listName: string;
};

export default function StartWorkoutButton({ listId, listName }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    setLoading(true);
    try {
      const session = await startWorkoutSession(listName, listId);
      router.push(`/workout/${session.id}`);
    } catch {
      setLoading(false);
    }
  }

  return (
    <Button onClick={handleStart} disabled={loading} className="gap-2">
      <Play className="h-4 w-4" />
      {loading ? "Startar..." : "Starta pass"}
    </Button>
  );
}