'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

type State = { error: string } | null

export async function signUp(prevState: State, formData: FormData): Promise<State> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const age = Number(formData.get('age'))
  const gender = formData.get('gender') as string

  if (password !== confirm) {
    return { error: 'Lösenorden matchar inte.' }
  }

  if (password.length < 8) {
    return { error: 'Lösenordet måste vara minst 8 tecken.' }
  }

  const supabase = await createClient()

  const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError) {
    return { error: signUpError.message }
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ first_name: firstName, last_name: lastName, age, gender })
      .eq('id', data.user.id)

    if (profileError) {
      return { error: profileError.message }
    }
  }

  redirect('/')
}