import { useEffect,useRef, useState } from 'react'
import Button from '../ui/button'
import CenterDivWrapper from '@/app/components/ui/centerDivWrapper'
import '@/app/styles/index.modules.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import axios from 'axios'

const Index=()=>{
    const [iscreateCommunityClicked, setIsCreateCommunityClicked] = useState(false)
    const walletInfo = useWallet()
    const [isWalletConnected, setIsWalletConnected] = useState(false)

    useEffect(()=>{
        setIsWalletConnected(walletInfo.connected)
    },[walletInfo])

    const HandleCreateCommunity = ()=>{
        setIsCreateCommunityClicked(!iscreateCommunityClicked)
    }

    const handleCreateBtn = async(e:React.FormEvent)=>{
        e.preventDefault();
        const walletAddress = walletInfo.publicKey?.toBase58()
        try {
            const res = await axios.post('/api/communities',{account:walletAddress})
            console.log('response is ',res)
        } catch (error) {
            console.error('error is ',error)
        }
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
                    <Button innerText='create' handleClick={handleCreateBtn}/>
                </div>
            }
        </CenterDivWrapper>
    )
}

export default Index
