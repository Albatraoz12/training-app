"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Dumbbell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg shrink-0"
        >
          <Dumbbell className="h-5 w-5" />
          TrainingApp
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/search" />}
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href="/sign-in" />}
          >
            Sign in
          </Button>
          <Button nativeButton={false} render={<Link href="/sign-up" />}>
            Sign up
          </Button>
        </div>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-3 pt-10 data-[side=right]:w-full data-[side=right]:sm:max-w-full">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              nativeButton={false}
              render={<Link href="/search" />}
            >
              <Search className="h-4 w-4" />
              Sök övning
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              nativeButton={false}
              render={<Link href="/sign-in" />}
            >
              Sign in
            </Button>
            <Button
              className="justify-start"
              nativeButton={false}
              render={<Link href="/sign-up" />}
            >
              Sign up
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
