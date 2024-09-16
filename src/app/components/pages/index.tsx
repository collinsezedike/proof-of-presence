import { useEffect,useRef, useState } from 'react'
import Button from '../ui/button'
import CenterDivWrapper from '@/app/components/ui/centerDivWrapper'
import '@/app/styles/index.modules.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { CanvasClient, CanvasInterface } from '@dscvr-one/canvas-client-sdk';
import { registerCanvasWallet } from '@dscvr-one/canvas-wallet-adapter';

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


    const validateHostMessage = async (message: CanvasInterface.BaseHostMessage) => {
        // TODO: connect with graphql
        return !!message;
    };

    const jupiterRpcEndpoint = 'https://julieta-jciq77-fast-mainnet.helius-rpc.com';

    const [isReady, setIsReady] = useState<boolean>(false);
    const jupiterPlaceholderRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<CanvasInterface.Lifecycle.User | undefined>(undefined);
    const [content, setContent] = useState<CanvasInterface.Lifecycle.Content | undefined>(undefined);
  
    const [canvasClient, setCanvasClient] = useState<CanvasClient | undefined>(undefined);
    
    const initJupiterWidget = () => {
      if (!jupiterPlaceholderRef.current) return;
      // @ts-ignore: Jupiter global object
      window.Jupiter.init({
        displayMode: 'integrated',
        integratedTargetId: 'jupiter-widget',
        endpoint: jupiterRpcEndpoint,
        autoConnect: false,
        onFormUpdate: () => canvasClient?.resize(),
        onScreenUpdate: () => canvasClient?.resize(),
      });
    };
  
    const start = async () => {
      if (!canvasClient) return;
      const response = await canvasClient.ready();
      setIsReady(canvasClient.isReady);
      const isValidResponse = await validateHostMessage(response);
      if (!isValidResponse) return;
      if (response) {
        // @ts-ignore: Property trustedBytes does not exist on type 'any'
        response.trustedBytes;
        setUser(response.untrusted.user);
        setContent(response.untrusted.content);
      }
      initJupiterWidget();
      canvasClient.resize();
    };
  
    useEffect(() => {
      const resizeObserver = new ResizeObserver(() => canvasClient?.resize());
  
      // Initialize canvas client and register wallet
      const newCanvasClient = new CanvasClient();
      registerCanvasWallet(newCanvasClient);
      setCanvasClient(newCanvasClient);
  
      // Observe the body element for resize events
      resizeObserver.observe(document.body);
  
      // Cleanup
      return () => {
        resizeObserver.disconnect();
        newCanvasClient.destroy();
      };
    }, []);


    return (
        <CenterDivWrapper>
        <button onClick={start} disabled={isReady} style={{color:'black'}}>Initialize Canvas</button>
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
