import React from "react";

const Movie=(props)=>{
 return(
   
    <div className="d1">
        
        <h> Name: {props.name}</h>
        <p>Age : {props.age}</p>
        <br></br>
        
    </div>
    
 )
}
export default Movie;