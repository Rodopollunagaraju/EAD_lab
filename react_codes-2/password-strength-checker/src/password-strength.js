import React,{useState} from 'react';
export default function PasswordStrengthChecker(){
    const[password,setPassword]=useState('');
    const[strength,setStrength]=useState({level:'',score:0,color:''});
    const checkStrength=(pwd)=>{
        let score=0;
        if(pwd.length>=8) score+=20;
        if(/[A-Z]/.test(pwd)) score+=20;
         if(/[0-9]/.test(pwd)) score+=20;
         if(/[^A-Za-z0-9]/.test(pwd)) score+=20;
         if(/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) score+=20;
         let level='';
         let color='';
         if(score<=20){
            level='Weak';
            color='red';
         }
         else if(score<=40){
            level='Fair';
            color='orange';
         } else if(score<=60){
             level='Good';
            color='blue';
         }
         else if (score<=80){
            level='Strong';
            color='lightgreen';
         }
         else{
            level='Perfect';
            color='green';
         }
         setStrength({level,score,color});
    };
    const handleChange=(e)=>{
        const pwd=e.target.value;
        setPassword(pwd);
        checkStrength(pwd);
    };
    return (
        <div style={{fontFamily:'Arial',maxWidth:'400px',margin:'auto',padding:'20px'}}>
            <h2>Password Strength Checker</h2>
            <input type="text" value={password} onChange={handleChange} placeholder="Enter your password" style={{width:'100%',padding:'10px',fontSize:'16px',marginBottom:'10px'}}/>
            <p>Password must contains atleast 8 characters.<br></br> include atleast one  uppercase.<br></br> include atleast one lowercase.<br></br> include atleast one number. <br></br> include atleast one special characters.</p>
            {password && (
                <div>
                    <div style={{height:'10px',width:`${strength.score}%`,backgroundColor:strength.color,transition:'width 0.3s'}}></div>
                    <p style={{color:strength.color,fontWeight:'bold'}}>Strength: {strength.level}</p>
                </div>
            )}
        </div>
    );
}