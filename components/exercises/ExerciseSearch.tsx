'use client'

import { useExerciseSearch } from '@/lib/exercisedb/hooks'
import { useBodyParts } from '@/lib/exercisedb/hooks'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import ExerciseList from './ExerciseList'
import ExerciseCardSkeleton from './ExerciseCardSkeleton'

export default function ExerciseSearch() {
  const { query, setQuery, bodyPart, submitSearch, selectBodyPart, data, isLoading, error, hasActiveSearch, page, goToPage, hasNextPage } =
    useExerciseSearch()

  const { data: bodyParts = [] } = useBodyParts()

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    submitSearch(query)
  }

  return (
    <div className="flex flex-col gap-8">

      <div className="flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSubmit} className="flex flex-1 gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök övning..."
            className="flex-1"
          />
          <Button type="submit" disabled={!query.trim()}>
            <Search className="h-4 w-4" />
            Sök
          </Button>
        </form>

        <Select value={bodyPart} onValueChange={selectBodyPart}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Muskelgrupp" />
          </SelectTrigger>
          <SelectContent>
            {bodyParts.map((part) => (
              <SelectItem key={part} value={part}>
                <span className="capitalize">{part}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <ExerciseCardSkeleton key={i} />
          ))}
        </div>
      )}
      {error && (
        <p className="text-center text-destructive">Något gick fel. Försök igen.</p>
      )}
      {!isLoading && !error && hasActiveSearch && (
        <div className="flex flex-col gap-6">
          <ExerciseList exercises={data} />
          {(page > 0 || hasNextPage) && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => goToPage(page - 1)}
                disabled={page === 0}
                className="cursor-pointer"
              >
                Föregående
              </Button>
              <span className="text-sm text-muted-foreground">Sida {page + 1}</span>
              <Button
                variant="outline"
                onClick={() => goToPage(page + 1)}
                disabled={!hasNextPage}
                className="cursor-pointer"
              >
                Nästa
              </Button>
            </div>
          )}
        </div>
      )}
      {!hasActiveSearch && (
        <p className="text-center text-muted-foreground">
          Sök på ett namn eller välj en muskelgrupp.
        </p>
      )}

    </div>
  )
}