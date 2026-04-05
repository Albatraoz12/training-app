'use client'

import { useState } from 'react'
import { ListPlus, Plus, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useUserLists, useCreateList, useAddToList, useUser } from '@/lib/supabase/hooks'

type Props = {
  exerciseId: string
}

export default function AddToListButton({ exerciseId }: Props) {
  const [newListName, setNewListName] = useState('')
  const [addedToList, setAddedToList] = useState<string | null>(null)

  const { isLoggedIn } = useUser()
  const { data: lists = [] } = useUserLists()
  const { mutate: createList, isPending: isCreating } = useCreateList()
  const { mutate: addToList, isPending: isAdding } = useAddToList()

  if (!isLoggedIn) return null

  function handleCreateAndAdd() {
    const name = newListName.trim()
    if (!name) return
    createList(name, {
      onSuccess: (list) => {
        addToList({ listId: list.id, exerciseId })
        setNewListName('')
        setAddedToList(list.id)
      },
    })
  }

  function handleAddToList(listId: string) {
    addToList({ listId, exerciseId }, {
      onSuccess: () => setAddedToList(listId),
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Lägg till i lista">
          <ListPlus className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64">
        <p className="text-xs font-medium text-muted-foreground mb-2">Lägg till i lista</p>

        {lists.length > 0 && (
          <ul className="flex flex-col gap-1 mb-3">
            {lists.map((list) => (
              <li key={list.id}>
                <button
                  onClick={() => handleAddToList(list.id)}
                  disabled={isAdding}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors"
                >
                  {list.name}
                  {addedToList === list.id && (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2 border-t border-border pt-3">
          <Input
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="Ny lista..."
            className="h-7 text-xs"
            onKeyDown={(e) => e.key === 'Enter' && handleCreateAndAdd()}
          />
          <Button
            size="icon"
            className="h-7 w-7 shrink-0"
            disabled={!newListName.trim() || isCreating}
            onClick={handleCreateAndAdd}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}