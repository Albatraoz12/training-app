'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { removeExerciseFromList } from '@/lib/supabase/actions'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

type Props = {
  listId: string
  exerciseId: string
}

export default function RemoveFromListButton({ listId, exerciseId }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      await removeExerciseFromList(listId, exerciseId)
      router.refresh()
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        aria-label="Ta bort från listan"
        className="absolute right-1.5 top-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ta bort övning</AlertDialogTitle>
          <AlertDialogDescription>
            Är du säker på att du vill ta bort den här övningen från listan?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="cursor-pointer inline-flex items-center justify-center rounded-md bg-destructive px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-destructive/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Ta bort
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}