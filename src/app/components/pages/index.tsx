import Link from 'next/link'
import Button from '../ui/button'

const Index=()=>{
    return (
        <div id='first-page'>
            <Link href="/about"><Button innerText={'create community'}/></Link>
        </div>
    )
}

export default Index