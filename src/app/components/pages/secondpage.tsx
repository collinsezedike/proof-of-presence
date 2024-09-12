import Button from '../ui/button'
import '@/app/styles/secondpage.modules.css'
import CenterDivWrapper from '../ui/centerDivWrapper'
import { useState } from 'react'

const SecondPage=()=>{
    const [isFundPoolClicked,setIsFundPoolClicked] = useState(false)

    const handleFundPool = ()=>{
        setIsFundPoolClicked(!isFundPoolClicked)
    }
    return (
        <CenterDivWrapper>
            <div id='second-page'>
                <Button innerText={'Fund Pool'} handleClick={handleFundPool} />
                <Button innerText={'Create Event'}/>
            </div>
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