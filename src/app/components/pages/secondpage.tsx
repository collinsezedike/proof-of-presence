import Button from '../ui/button'
import '@/app/styles/secondpage.modules.css'
import CenterDivWrapper from '../ui/centerDivWrapper'
import { useState } from 'react'

const SecondPage=()=>{
    const [isFundPoolClicked,setIsFundPoolClicked] = useState(false)
    const [isCreateCommunityEventClicked,setIsCreateCommunityEventClicked] = useState(false)

    const handleFundPool = ()=>{
        setIsFundPoolClicked(!isFundPoolClicked)
    }

    const handleCreateCommunityEvent = ()=>{
        setIsCreateCommunityEventClicked(!isCreateCommunityEventClicked)
    }

    return (
        <CenterDivWrapper>
            {
                (!isCreateCommunityEventClicked)?
                (
                    <div id='second-page'>
                    <Button innerText={'Fund Pool'} handleClick={handleFundPool} />
                    <Button innerText={'Create community Event'} handleClick={handleCreateCommunityEvent}/>
                    </div>
                ):
                (
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <label htmlFor=''>Event Name</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="" style={{marginTop:15}}>Date</label>
                        <input type="datetime-local" name="" id="" />
                        <label htmlFor="" style={{marginTop:15}}>Community Name</label>
                        <h3 style={{marginBottom:15}}>This will be gotten from the api</h3>
                        <Button innerText='create Event'/>
                    </div>
                )
            }
            {
                (isFundPoolClicked) &&
                <select className='fund-pool'>
                    <option hidden>Select the Number of sol to fund</option>
                    <option>1 sol</option>
                    <option>2 sol</option>
                    <option>3 sol</option>
                    <option>4 sol</option>
                    <option>5 sol</option>
                </select>
            }

        </CenterDivWrapper>
    )
}

export default SecondPage
