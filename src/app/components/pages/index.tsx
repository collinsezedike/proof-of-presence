import { useState } from 'react'
import Button from '../ui/button'
import '@/app/styles/index.modules.css'

const Index=()=>{
    const [iscreateCommunityClicked, setIsCreateCommunityClicked] = useState(true)

    const HandleCreateCommunity = ()=>{
        setIsCreateCommunityClicked(!iscreateCommunityClicked)
    }
    return (
        <div id='first-page'>
            { 
                (!iscreateCommunityClicked) ? 
                <Button innerText={'create community'} handleClick={HandleCreateCommunity}/> :
                <div id = 'create-community-form'>
                    <label htmlFor="">Enter Community Name</label>
                    <input type="text" />
                    <Button innerText='create' />
                </div>
            }
        </div>
    )
}

export default Index