"use client";

import Link from "next/link";
import { ListMusic } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Exercise } from "@/lib/exercisedb/types";
import type { ExerciseList } from "@/lib/supabase/actions";
import WorkoutHistory from "./WorkoutHistory";
type Props = {
  favorites: Exercise[];
  lists: ExerciseList[];
};

function ExerciseMiniCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link
      href={`/search/${exercise.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-md"
    >
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="h-24 w-full object-cover"
      />
      <p className="line-clamp-2 px-2 py-2 text-xs font-medium capitalize group-hover:underline">
        {exercise.name}
      </p>
    </Link>
  );
}

export default function DashboardTabs({ favorites, lists }: Props) {
  return (
    <Tabs defaultValue="lists">
      <TabsList>
        <TabsTrigger value="favorites" className="cursor-pointer">
          Gillade övningar
          {favorites.length > 0 && (
            <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {favorites.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="lists" className="cursor-pointer">
          Mina listor
          {lists.length > 0 && (
            <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {lists.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="history" className="cursor-pointer">
          Träningshistorik
        </TabsTrigger>
      </TabsList>

      <TabsContent value="favorites" className="mt-6">
        {favorites.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Du har inga gillade övningar än.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {favorites.map((ex) => (
              <ExerciseMiniCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="lists" className="mt-6">
        {lists.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Du har inga listor än.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {lists.map((list) => (
              <Link
                key={list.id}
                href={`/dashboard/list/${list.id}`}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-4 transition-shadow hover:shadow-md"
              >
                <ListMusic className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="font-medium">{list.name}</span>
                {list.exerciseCount > 0 && (
                  <span className="ml-auto text-xs text-muted-foreground">({list.exerciseCount})</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="history" className="mt-6">
        <WorkoutHistory />
      </TabsContent>
    </Tabs>
  );
}
