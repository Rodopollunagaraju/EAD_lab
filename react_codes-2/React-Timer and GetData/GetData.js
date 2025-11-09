import React, {useState,useEffect} from "react";
const GetData=()=>{
    const [print,setPrint]=useState([]);
    const url="https://jsonplaceholder.typicode.com/users";
    var k=0;
    const APiCalls= async (apiUrl)=>{
          const response= await fetch(apiUrl);
          console.log(response);
          const data= await response.json();
          console.log(data)
          setPrint(data);
    }
    useEffect(()=>{APiCalls(url)},[]);
    return (
    <div>
        <center>
        
      {print.map((eachitem) => (
        <div key={eachitem.id}>
          <h2>{++k}) Name:{eachitem.name}</h2>
          <p>UserName:{eachitem.username}</p>
          <p>email: {eachitem.email}</p>
        </div>
      ))}
      </center>
    </div>
  );
};

export default GetData;