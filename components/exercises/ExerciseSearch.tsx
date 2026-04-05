'use client'

import { useState } from 'react'
import { useExercisesByName } from '@/lib/exercisedb/hooks'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ExerciseList from './ExerciseList'

export default function ExerciseSearch() {
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')

  const { data = [], isLoading, error } = useExercisesByName(search)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSearch(query.trim())
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök övning..."
        />
        <Button type="submit" disabled={!query.trim()}>
          Sök
        </Button>
      </form>

      {isLoading && (
        <p className="text-center text-muted-foreground">Laddar...</p>
      )}

      {error && (
        <p className="text-center text-destructive">Något gick fel. Försök igen.</p>
      )}

      {!isLoading && !error && search && <ExerciseList exercises={data} />}
    </div>
  )
}