'use client';
import Index from "./components/pages/index";
import { useWallet } from '@solana/wallet-adapter-react'

export default function Home() {

  const walletInfo = useWallet()

  console.log(walletInfo)
  return <Index />
}