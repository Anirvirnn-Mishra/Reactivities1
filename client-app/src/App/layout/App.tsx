import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container, Header, List, ListItem } from 'semantic-ui-react';
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
    // can also use <> instead of fragment
    <Fragment > 
  <NavBar/>
  <Container style={{marginTop: "10em"}}>
  <List >{activities.map(
          (data)=>(<List.Item  key={data.id}>{data.title} </List.Item>)
          )}</List>       
  </Container>
      
  
    </Fragment>
    
  );
}

export default App;
