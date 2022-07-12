import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
const [activities,setActivities ]=useState([]);
useEffect(
  ()=>
  {
    axios.get("https:localhost:5001/api/activities").then
    (
      response=>
      {
        console.log(response.data);
        setActivities(response.data);

      }
    );

  } ,
  []
);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>{activities.map(
          (data:any)=>(<li key={data.id}>{data.title}</li>)
          )}</ul>        
      </header>
    </div>
  );
}

export default App;
