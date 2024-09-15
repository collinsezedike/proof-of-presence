import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import Button from '../ui/button'
import CenterDivWrapper from '../ui/centerDivWrapper'

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css'


const ThirdPage =()=>{

    const walletInfo = useWallet()
    console.log(walletInfo)
    return (
        <CenterDivWrapper>
            <div id='third-page'>
                <WalletMultiButton />
            </div>
        </CenterDivWrapper>
    )
}

export default ThirdPage