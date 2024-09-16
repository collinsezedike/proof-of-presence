import { useEffect, useState } from 'react'
import Button from '../ui/button'
import CenterDivWrapper from '@/app/components/ui/centerDivWrapper'
import '@/app/styles/index.modules.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

const Index=()=>{
    const [iscreateCommunityClicked, setIsCreateCommunityClicked] = useState(false)
    const walletInfo = useWallet()
    const [isWalletConnected, setIsWalletConnected] = useState(false)

    useEffect(()=>{
        setIsWalletConnected(walletInfo.connected)
    },[walletInfo])
    console.log(isWalletConnected)

    const HandleCreateCommunity = ()=>{
        setIsCreateCommunityClicked(!iscreateCommunityClicked)
    }

    return (
        <CenterDivWrapper>
            {
                (!isWalletConnected)?
            <WalletMultiButton style={{marginBottom:29}}>
                {(!walletInfo.connected)&&"Add wallet"}
            </WalletMultiButton> :
                (!iscreateCommunityClicked && isWalletConnected) ? 
                <Button innerText={'create community'} handleClick={HandleCreateCommunity}/> :
                <div id='create-community-form'>
                    <label htmlFor="">Enter a Community Name</label>
                    <input type="text" placeholder='Enter your community Name' style={{marginBottom:20}}/>
                    <Button innerText='create' />
                </div>
            }
        </CenterDivWrapper>
    )
}

export default Index
