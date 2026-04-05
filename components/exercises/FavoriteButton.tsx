'use client'

import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavorites, useToggleFavorite, useUser } from '@/lib/supabase/hooks'

type Props = {
  exerciseId: string
}

export default function FavoriteButton({ exerciseId }: Props) {
  const { isLoggedIn } = useUser()
  const { data: favorites = [] } = useFavorites()
  const { mutate: toggle, isPending } = useToggleFavorite()
  const isFavorited = favorites.includes(exerciseId)

  if (!isLoggedIn) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => toggle(exerciseId)}
      aria-label={isFavorited ? 'Ta bort från favoriter' : 'Lägg till i favoriter'}
    >
      <Heart
        className={isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
      />
    </Button>
  )
}