'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Check, X } from 'lucide-react'
import { renameList } from '@/lib/supabase/actions'

type Props = {
  listId: string
  initialName: string
}

export default function RenameListInput({ listId, initialName }: Props) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(initialName)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  function startEditing() {
    setEditing(true)
    setTimeout(() => inputRef.current?.select(), 0)
  }

  function cancel() {
    setValue(initialName)
    setEditing(false)
  }

  function save() {
    const trimmed = value.trim()
    if (!trimmed || trimmed === initialName) {
      cancel()
      return
    }
    startTransition(async () => {
      await renameList(listId, trimmed)
      router.refresh()
      setEditing(false)
    })
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') save()
    if (e.key === 'Escape') cancel()
  }

  if (editing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isPending}
          autoFocus
          className="text-2xl font-bold bg-transparent border-b border-border focus:border-foreground outline-none w-full"
        />
        <button
          onClick={save}
          disabled={isPending}
          aria-label="Spara"
          className="cursor-pointer shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Check className="h-5 w-5" />
        </button>
        <button
          onClick={cancel}
          disabled={isPending}
          aria-label="Avbryt"
          className="cursor-pointer shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-2xl font-bold">{value}</h1>
      <button
        onClick={startEditing}
        aria-label="Ändra namn"
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
      >
        <Pencil className="h-4 w-4" />
      </button>
    </div>
  )
}