import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ListChecks, Heart, Dumbbell } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col">

      {/* Hero */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center">
        <div className="flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
          <Dumbbell className="h-4 w-4" />
          Över 1 300 övningar
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Hitta rätt övning.<br />Bygg ditt program.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Sök bland hundratals övningar, spara dina favoriter och bygg egna träningslistor — allt på ett ställe.
        </p>
        <div className="flex gap-3">
          <Button render={<Link href="/search" />} nativeButton={false}>
            Sök övningar
          </Button>
          <Button variant="outline" render={<Link href="/sign-up" />} nativeButton={false}>
            Skapa konto
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-5xl gap-px px-4 py-16 sm:grid-cols-3">

          <div className="flex flex-col gap-3 rounded-xl bg-background p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Search className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Sök övningar</h2>
            <p className="text-sm text-muted-foreground">
              Filtrera på muskelgrupp, utrustning eller sök direkt på namn. Hitta exakt det du letar efter.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-background p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Heart className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Spara favoriter</h2>
            <p className="text-sm text-muted-foreground">
              Gilla övningar och samla dina favoriter på ett ställe. Kräver ett gratis konto.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl bg-background p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Bygg träningslistor</h2>
            <p className="text-sm text-muted-foreground">
              Skapa egna listor med övningar och bygg upp ditt träningsprogram steg för steg.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Kom igång gratis</h2>
        <p className="text-muted-foreground">
          Inget kreditkort. Inget krångel. Skapa ett konto och börja bygga ditt program idag.
        </p>
        <Button render={<Link href="/sign-up" />} nativeButton={false}>
          Skapa konto
        </Button>
      </section>

    </main>
  );
}