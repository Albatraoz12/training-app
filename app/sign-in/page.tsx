import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import SignInForm from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Logga in</CardTitle>
          <CardDescription>
            Välkommen tillbaka!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </main>
  )
}