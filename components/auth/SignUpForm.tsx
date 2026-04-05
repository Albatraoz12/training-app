'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { signUp } from '@/app/sign-up/actions'

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, null)

  return (
    <form action={action} className="flex flex-col gap-4">

      {state?.error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      {/* Namn */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="first_name">Förnamn</Label>
          <Input id="first_name" name="first_name" placeholder="Anna" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="last_name">Efternamn</Label>
          <Input id="last_name" name="last_name" placeholder="Svensson" required />
        </div>
      </div>

      {/* Ålder & kön */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="age">Ålder</Label>
          <Input id="age" name="age" type="number" min={1} max={129} placeholder="25" required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gender">Kön</Label>
          <select
            id="gender"
            name="gender"
            required
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="" disabled>Välj...</option>
            <option value="man">Man</option>
            <option value="kvinna">Kvinna</option>
            <option value="annat">Annat</option>
          </select>
        </div>
      </div>

      {/* E-post */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-post</Label>
        <Input id="email" name="email" type="email" placeholder="du@exempel.se" required />
      </div>

      {/* Lösenord */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Lösenord</Label>
        <Input id="password" name="password" type="password" placeholder="Minst 8 tecken" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirm">Bekräfta lösenord</Label>
        <Input id="confirm" name="confirm" type="password" placeholder="Upprepa lösenordet" required />
      </div>

      <Button type="submit" disabled={pending} className="mt-2 w-full">
        {pending ? 'Skapar konto...' : 'Skapa konto'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Har du redan ett konto?{' '}
        <Link href="/sign-in" className="text-foreground underline underline-offset-4 hover:no-underline">
          Logga in
        </Link>
      </p>

    </form>
  )
}