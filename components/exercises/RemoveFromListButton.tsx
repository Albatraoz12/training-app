'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { removeExerciseFromList } from '@/lib/supabase/actions'

type Props = {
  listId: string
  exerciseId: string
}

export default function RemoveFromListButton({ listId, exerciseId }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleRemove() {
    startTransition(async () => {
      await removeExerciseFromList(listId, exerciseId)
      router.refresh()
    })
  }

  return (
    <button
      onClick={handleRemove}
      disabled={isPending}
      aria-label="Ta bort från listan"
      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive disabled:cursor-not-allowed"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  )
}