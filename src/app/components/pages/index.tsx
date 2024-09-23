import { useEffect, useState } from 'react'
import Button from '../ui/button'
import CenterDivWrapper from '@/app/components/ui/centerDivWrapper'
import '@/app/styles/index.modules.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { Transaction, Connection, clusterApiUrl, VersionedTransaction } from '@solana/web3.js'
import axios from 'axios'

const Index=()=>{
    const [iscreateCommunityClicked, setIsCreateCommunityClicked] = useState(false)
    const [isWalletConnected, setIsWalletConnected] = useState(false)
  // Declare a state variable 'inputValue' with its setter function 'setInputValue'
  const [inputValue, setInputValue] = useState('')

  // Handle change function to update the state whenever the input changes
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

    const walletInfo = useWallet()
    
    const network = 'devnet'; // or 'testnet', 'mainnet-beta'
    const connection = new Connection(clusterApiUrl(network), 'confirmed');

    useEffect(()=>{
        setIsWalletConnected(walletInfo.connected)
    },[walletInfo])

    const HandleCreateCommunity = ()=>{
        setIsCreateCommunityClicked(!iscreateCommunityClicked)
    }

    const handleCreateBtn = async(e:React.FormEvent)=>{
        e.preventDefault()
        const walletAddress = walletInfo.publicKey?.toBase58()
        let communityName
        if (inputValue === '') {
            return
          } else {
            communityName = inputValue
          }
          
        try {
            const res = await axios.post('/api/communities',{account:walletAddress})
            const serializedtxn : Uint8Array = res.data.data.txn
            if(serializedtxn){
                try {
                    // Deserialize the transaction
                    const transaction = VersionedTransaction.deserialize(serializedtxn)

                    // Get the latest blockhash
                    const { blockhash } = await connection.getLatestBlockhash('finalized')

                    // Modify the transaction message to set recent blockhash and fee payer
                    const message = transaction.message

                    // Add the fee payer to the list of account keys in the message
                    const feePayerPubKey = walletInfo.publicKey!;
                    if (!transaction.message.staticAccountKeys.includes(feePayerPubKey)) {
                        transaction.message.staticAccountKeys.unshift(feePayerPubKey);
                    }

                    // Rebuild the versioned transaction
                    const signedTransaction = new VersionedTransaction(message);
                    
                    // Sign the transaction
                    const signed= await walletInfo.signTransaction!(signedTransaction)

                    //Extract the signature
                    const signature = signed.signatures?.toString()

                    console.log(signature)
                    
                }catch(error){
                    console.error('signature error is ',error)
                }
            }
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
                    <input 
                    type="text" 
                    placeholder='Enter your community Name' 
                    style={{marginBottom:20}}
                    value={inputValue}
                    onChange={handleChange}
                    />
                    <Button innerText='create' handleClick={handleCreateBtn}/>
                </div>
            }
        </CenterDivWrapper>
    )
}

export default Index
