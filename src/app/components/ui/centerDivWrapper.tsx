import React from "react"

type WrapperProp = {
  children : React.ReactNode
}

const CenterDivWrapper = ({ children }:WrapperProp)=>{
    return <div
        style={{
            minWidth: 300,
            minHeight: 300,
            padding: 25,
            backgroundColor : '#0F0F0F',
            border:'1px solid transparent',
            borderRadius:'15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            alignItems:'center'
        }}
    >
      { children }
    </div>
}

export default CenterDivWrapper
