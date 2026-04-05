'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex cursor-pointer items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground w-fit"
    >
      <ChevronLeft className="h-4 w-4" />
      Tillbaka
    </button>
  )
}