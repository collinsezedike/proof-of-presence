import React from "react";

type ButtonProp = {
    innerText : string;
};

const Button=({innerText}: ButtonProp )=>{
    return <button 
        style={{
            backgroundColor:'#173AD6',
            padding:'10px 40px',
            border:'1px solid transparent',
            borderRadius:'10px',
            fontSize:20,
            fontWeight:'700',
            textTransform:'capitalize',
            cursor:'pointer'
        }}
    >
        {innerText}
    </button>
}

export default Button