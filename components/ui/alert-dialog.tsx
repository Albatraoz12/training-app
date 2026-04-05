'use client'

import * as React from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cn } from '@/lib/utils'

function AlertDialog({ ...props }: Dialog.Root.Props) {
  return <Dialog.Root {...props} />
}

function AlertDialogTrigger({ ...props }: Dialog.Trigger.Props) {
  return <Dialog.Trigger {...props} />
}

function AlertDialogPortal({ ...props }: Dialog.Portal.Props) {
  return <Dialog.Portal {...props} />
}

function AlertDialogOverlay({ className, ...props }: Dialog.Backdrop.Props) {
  return (
    <Dialog.Backdrop
      className={cn(
        'fixed inset-0 z-50 bg-black/50 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({ className, children, ...props }: Dialog.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <Dialog.Popup
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-popover p-6 shadow-lg transition-all duration-150 data-ending-style:opacity-0 data-ending-style:scale-95 data-starting-style:opacity-0 data-starting-style:scale-95',
          className,
        )}
        {...props}
      >
        {children}
      </Dialog.Popup>
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex justify-end gap-2 mt-6', className)} {...props} />
  )
}

function AlertDialogTitle({ className, ...props }: Dialog.Title.Props) {
  return (
    <Dialog.Title
      className={cn('text-base font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({ className, ...props }: Dialog.Description.Props) {
  return (
    <Dialog.Description
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function AlertDialogCancel({ className, ...props }: Dialog.Close.Props) {
  return (
    <Dialog.Close
      className={cn(
        'cursor-pointer inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted',
        className,
      )}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
}