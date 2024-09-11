'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SolBalanceChecker() {
  const [darkMode, setDarkMode] = useState(true)
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('sol')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const handleCheckBalance = () => {
    // Here you would typically make an API call to check the actual balance
    // For this example, we'll just set a placeholder value
    setBalance('123.45 sol')
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-[#CCCCCC]' : 'bg-[#CCCCCC]'}`}>
      <Card className="w-full max-w-md bg-[#0F0F0F] text-[#F2F2F2]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Sol Balance</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="text-[#F2F2F2] hover:text-[#173AD6]"
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[#F2F2F2] mb-4">Check the amount of sol you have</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
              <Input
                id="address"
                placeholder="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-[#0F0F0F] text-[#F2F2F2] border-[#F2F2F2]"
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Your balance is: {balance}</p>
            </div>
            <Button
              onClick={handleCheckBalance}
              className="w-full bg-[#173AD6] hover:bg-[#173AD6]/80 text-[#F2F2F2]"
            >
              Check Balance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}