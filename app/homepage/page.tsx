// app/create-community/page.tsx

'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import SolBalance from '@/components/SolBalance'
import { X } from 'lucide-react'

export default function CreateCommunityPage() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Create Community</Button>
        </DialogTrigger>
        <DialogContent className="max-w-full w-full h-full p-0 m-0">
          <div className="relative w-full h-full">
            <Button
              variant="ghost"
              className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
            <SolBalance onClose={handleClose} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}