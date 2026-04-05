'use client'

import { Settings } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import ProfileForm from './ProfileForm'

type Profile = {
  first_name: string | null
  last_name: string | null
  age: number | null
  gender: string | null
}

type Props = {
  profile: Profile
}

export default function ProfileSheet({ profile }: Props) {
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
        <Settings className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Redigera profil</SheetTitle>
        </SheetHeader>
        <div className="mt-6 px-4">
          <ProfileForm profile={profile} />
        </div>
      </SheetContent>
    </Sheet>
  )
}