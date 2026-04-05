import Link from 'next/link'
import type { Exercise } from '@/lib/exercisedb/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FavoriteButton from './FavoriteButton'
import AddToListButton from './AddToListButton'

type Props = {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/search/${exercise.id}`} className="group block">
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="h-48 w-full object-cover"
        />
        <CardHeader className="pb-2">
          <CardTitle className="capitalize text-base group-hover:underline">
            {exercise.name}
          </CardTitle>
        </CardHeader>
      </Link>
      <CardContent className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
            {exercise.bodyPart}
          </span>
          <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
            {exercise.target}
          </span>
          <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
            {exercise.equipment}
          </span>
        </div>
        <div className="flex shrink-0 items-center">
          <FavoriteButton exerciseId={exercise.id} />
          <AddToListButton exerciseId={exercise.id} />
        </div>
      </CardContent>
    </Card>
  )
}
