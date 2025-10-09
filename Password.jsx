import React from 'react'   
import { useState } from 'react';

export default function Password() {
    const [password, setPassword] = useState('');
    const [strength, setstrength] = useState({level: '', color: '',score : 0   });
    const checkPasswordStrength = (pwd) => {
        let score = 0;
        if (pwd.length >= 8) score += 1;
        if (/[A-Z]/.test(pwd)) score += 1;
        if (/[0-9]/.test(pwd)) score += 1;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
        let level = '';
        let color = '';
        switch (score) {
            case 0:
            case 1:
                level = 'Weak';
                color = 'red';
                break;
            case 2:
                level = 'Moderate';
                color = 'orange';
                break;  
            case 3:
                level = 'Strong';
                color = 'blue';
                break;
            case 4:
                level = 'Very Strong';
                color = 'green';
                break;
            default:
                level = '';
                color = '';
        } 
        setstrength({ level, color, score });
    };

    const handleChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        checkPasswordStrength(pwd);
    }


  return (
    <>
     <div style={{ margin: '20px' , color: 'black', alignItems : 'center' ,  }  }>
        <div>
            <h2>Password Strength Checker</h2>
            <div>Type a password to check its strength</div>
            <div>Criteria:</div>
            <div>1. At least 8 characters</div>
            <div>2. Contains uppercase letters</div>
            <div>3. Contains numbers</div>
            <div>4. Contains special characters </div>
            <div>Strength Levels: Weak, Moderate, Strong, Very Strong</div>
            <div>Color Indicators: Red, Orange, Blue, Green</div>
            <div>Score: 0 to 4 based on criteria met</div>
            <div style={{ marginTop: '10px' }}>
                Password: 
            </div>
            <div style={{ marginTop: '10px' }}>
                <div>Score: {strength.score} / 4</div>

                <div style={{ backgroundColor: '#e0e0e0', height: '10px', width: '100%', borderRadius: '5px', marginTop: '5px' }}>
                    <div style={{ width: `${(strength.score / 4) * 100}%`, height: '100%', backgroundColor: strength.color, borderRadius: '5px', transition: 'width 0.3s' }}></div>
                </div>
            </div>
            <div style={{ marginTop: '10px' }}>
                Enter Password:
            </div>
            <div>
                <input type="password" value={password} onChange={handleChange} placeholder="Enter your password" />
            </div>
            <div>
                {password && (
                    <div style={{ color: strength.color }}>
                        Strength: {strength.level}
                    </div>
                )}  
            </div>
        </div>
        <div style={{ marginTop: '20px' }}>
            <h3>Feedback</h3>
            <div>
                {strength.score < 4 && (
                    <div>
                        <div>Password must meet the following criteria:</div>
                        <ul>
                            {password.length < 8 && <li>At least 8 characters</li>}
                            {!/[A-Z]/.test(password) && <li>Contains uppercase letters</li>}
                            {!/[0-9]/.test(password) && <li>Contains numbers</li>}
                            {!/[^A-Za-z0-9]/.test(password) && <li>Contains special characters</li>}
                        </ul>
                    </div>
                )}
                {strength.score === 4 && <div>Your password is very strong!</div>}
            </div>
            </div>

    </div>
    </>
   
    
  )
}
