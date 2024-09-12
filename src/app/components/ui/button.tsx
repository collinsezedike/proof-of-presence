import React from "react";

type ButtonProp = {
    innerText : string,
    handleClick? : ()=> void
};

const Button=({innerText,handleClick}: ButtonProp )=>{
    return <button 
        style={{
            backgroundColor:'#173AD6',
            padding:'10px 40px',
            border:'1px solid transparent',
            borderRadius:'10px',
            fontSize:20,
            width:'100%',
            fontWeight:'700',
            textTransform:'capitalize',
            cursor:'pointer'
        }}
        onClick={handleClick}
    >
        {innerText}
    </button>
}

export default Button