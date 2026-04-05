import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import SignUpForm from '@/components/auth/SignUpForm'

export default function SignUpPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Skapa konto</CardTitle>
          <CardDescription>
            Fyll i dina uppgifter för att komma igång.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </main>
  )
}