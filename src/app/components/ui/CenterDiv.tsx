import React from "react";

const CenterDiv = ({children}:React.ReactNode)=>{
    return <div
        style={{
            width: 350,
            height: 350,
            border:'1px solid transparent',
            borderRadius:'10px',
            display: 'flex',
          flexDirection: 'column'
        }}
    >
      { children }
    </div>
}

export default CenterDiv
