'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { signIn } from '@/app/sign-in/actions'

export default function SignInForm() {
  const [state, action, pending] = useActionState(signIn, null)

  return (
    <form action={action} className="flex flex-col gap-4">

      {state?.error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">E-post</Label>
        <Input id="email" name="email" type="email" placeholder="du@exempel.se" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">Lösenord</Label>
        <Input id="password" name="password" type="password" placeholder="Ditt lösenord" required />
      </div>

      <Button type="submit" disabled={pending} className="mt-2 w-full">
        {pending ? 'Loggar in...' : 'Logga in'}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Har du inget konto?{' '}
        <Link href="/sign-up" className="text-foreground underline underline-offset-4 hover:no-underline">
          Skapa konto
        </Link>
      </p>

    </form>
  )
}