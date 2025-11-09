import React,{useState} from 'react';
function FormInput(){
    const[name,setName]=useState('');
    const textChange=(e)=>{
        setName(e.target.value);
    }
    return(
        <div>
            <h1>
            <input type="text" placeholder="Enter your Name"
            value={name} onChange={textChange}/>
            </h1>
            <h2><italic> INput  </italic>{name}</h2>
         </div>
    )
}
export default FormInput;