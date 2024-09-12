import { useState } from 'react'
import Button from '../ui/button'
import CenterDiv from '../ui/centerDiv

const Index=()=>{
    const [iscreateCommunityClicked, setIsCreateCommunityClicked] = useState(false)

    const HandleCreateCommunity = ()=>{
        setIsCreateCommunityClicked(!iscreateCommunityClicked)
    }
    return (
        <CenterDiv>
            { 
                (!iscreateCommunityClicked) ? 
                <Button innerText={'create community'} handleClick={HandleCreateCommunity}/> :
                <div>
                    <label htmlFor="">Enter Community Name</label>
                    <input type="text" />
                    <Button innerText='create' />
                </div>
            }
        </CenterDiv>
    )
}

export default Index
