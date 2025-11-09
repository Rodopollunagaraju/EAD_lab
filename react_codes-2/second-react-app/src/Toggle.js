import { useState } from "react";
const Toggle=()=>{
    const[showText,setShowText]=useState(true);
    const setShowText1=()=>{
        setShowText(!showText);
    }
   return (
    <div>
        <button on onClick={()=>
            setShowText(!showText)
        }></button>
        {showText && <p> hello,Iam visible!</p>}

    </div>
   )
}
export default Toggle;