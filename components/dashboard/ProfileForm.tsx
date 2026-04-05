'use client'

import { useActionState } from 'react'
import { updateProfile } from '@/lib/supabase/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Profile = {
  first_name: string | null
  last_name: string | null
  age: number | null
  gender: string | null
}

type Props = {
  profile: Profile
}

export default function ProfileForm({ profile }: Props) {
  const [state, action, isPending] = useActionState(updateProfile, null)

  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="first_name">Förnamn</Label>
          <Input
            id="first_name"
            name="first_name"
            defaultValue={profile.first_name ?? ''}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="last_name">Efternamn</Label>
          <Input
            id="last_name"
            name="last_name"
            defaultValue={profile.last_name ?? ''}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="age">Ålder</Label>
        <Input
          id="age"
          name="age"
          type="number"
          min={1}
          defaultValue={profile.age ?? ''}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="gender">Kön</Label>
        <select
          id="gender"
          name="gender"
          defaultValue={profile.gender ?? ''}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-[3px]"
        >
          <option value="">Välj...</option>
          <option value="man">Man</option>
          <option value="kvinna">Kvinna</option>
          <option value="annat">Annat</option>
        </select>
      </div>

      {'error' in (state ?? {}) && (
        <p className="text-sm text-destructive">{(state as { error: string }).error}</p>
      )}
      {'success' in (state ?? {}) && (
        <p className="text-sm text-green-600">Profilen uppdaterades!</p>
      )}

      <Button type="submit" disabled={isPending} className="w-fit">
        {isPending ? 'Sparar...' : 'Spara ändringar'}
      </Button>
    </form>
  )
}