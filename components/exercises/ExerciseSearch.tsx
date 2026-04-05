'use client'

import { useState } from 'react'
import { useExercisesByName } from '@/lib/exercisedb/hooks'
import ExerciseList from './ExerciseList'

export default function ExerciseSearch() {
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')

  const { data = [], isLoading, error } = useExercisesByName(search)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSearch(query.trim())
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök övning..."
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Sök
        </button>
      </form>

      {isLoading && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">Laddar...</p>
      )}

      {error && (
        <p className="text-center text-red-500">Något gick fel. Försök igen.</p>
      )}

      {!isLoading && !error && search && <ExerciseList exercises={data} />}
    </div>
  )
}