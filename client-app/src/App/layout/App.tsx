import React, { useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Header, List, ListItem } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';

function App() {
const [activities,setActivities ]=useState<IActivity[]>([]);
useEffect(
  ()=>
  {
    axios.get<IActivity[]>("https:localhost:5001/api/activities").then
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
    <div >
  <NavBar/>
      <List >{activities.map(
          (data)=>(<List.Item  key={data.id}>{data.title} </List.Item>)
          )}</List>        
  
    </div>
    
  );
}

export default App;
