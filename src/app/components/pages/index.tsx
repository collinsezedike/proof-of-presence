import { useState } from 'react'
import Button from '../ui/button'
import CenterDivWrapper from '@/app/components/ui/centerDivWrapper'
import '@/app/styles/index.modules.css'

const Index=()=>{
    const [iscreateCommunityClicked, setIsCreateCommunityClicked] = useState(false)

    const HandleCreateCommunity = ()=>{
        setIsCreateCommunityClicked(!iscreateCommunityClicked)
    }
    return (
        <CenterDivWrapper>
            { 
                (!iscreateCommunityClicked) ? 
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
