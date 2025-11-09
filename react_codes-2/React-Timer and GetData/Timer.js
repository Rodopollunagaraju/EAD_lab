import React,{useState,useEffect} from "react";
const Timer=()=>{
    const[time,setTime]=useState(0);
    const[running,setRunning]=useState(false);
    
    useEffect(function(){
        if(!running) return;
        let timer=setInterval(function(){
            return setTime(function(t){
                return t+1;
            });
        },1);
        return function(){
            clearInterval(timer);
        };
    },[running]);
    const start=()=>{setRunning(true);}
    const pause=()=>{setRunning(false);}
    const reset=()=>{setRunning(false);setTime(0);}

return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>{time} Seconds</h2>
      <div>
        <button onClick={start} style={{ marginRight: 10 }}>
          Start
        </button>
        <button onClick={pause} style={{ marginRight: 10 }}>
          Pause
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};


export default Timer;