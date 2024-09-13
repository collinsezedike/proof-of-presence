import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import Button from '../ui/button'
import CenterDivWrapper from '../ui/centerDivWrapper'

const ThirdPage =()=>{

    const walletInfo = useWallet()
    return (
        <CenterDivWrapper>
            <div id='third-page'>
                <WalletMultiButton>
                    <Button innerText={'sign attendence'}/>
                </WalletMultiButton>
            </div>
        </CenterDivWrapper>
    )
}

export default ThirdPage