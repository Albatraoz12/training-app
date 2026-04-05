import Link from 'next/link'
import type { Exercise } from '@/lib/exercisedb/types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type Props = {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <Link href={`/search/${exercise.id}`} className="group">
    <Card className="overflow-hidden transition-shadow group-hover:shadow-md">
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="h-48 w-full object-cover"
      />
      <CardHeader className="pb-2">
        <CardTitle className="capitalize text-base">{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
          {exercise.bodyPart}
        </span>
        <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
          {exercise.target}
        </span>
        <span className="rounded-full bg-muted px-2 py-1 text-xs capitalize text-muted-foreground">
          {exercise.equipment}
        </span>
      </CardContent>
    </Card>
    </Link>
  )
}
