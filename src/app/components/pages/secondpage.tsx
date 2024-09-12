import Button from '../ui/button'
import '@/app/styles/secondpage.modules.css'
import CenterDivWrapper from '../ui/centerDivWrapper'

const SecondPage=()=>{
    return (
        <CenterDivWrapper>
            <div id='second-page'>
                <Button innerText={'Fund Pool'}/>
                <Button innerText={'Create Event'}/>
            </div>
        </CenterDivWrapper>
    )
}

export default SecondPage