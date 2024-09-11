// app/page.tsx

'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const handleFundPool = () => {
    // Navigate to the Fund Pool page or open a modal
    console.log('Fund Pool clicked')
    // router.push('/fund-pool')
  }

  const handleCreateEvent = () => {
    // Navigate to the Create Event page or open a modal
    console.log('Create Event clicked')
    // router.push('/create-event')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="space-y-4">
        <Button 
          variant="default" 
          size="lg" 
          onClick={handleFundPool}
          className="w-48"
        >
          Fund Pool
        </Button>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={handleCreateEvent}
          className="w-48"
        >
          Create Event
        </Button>
      </div>
    </div>
  )
}