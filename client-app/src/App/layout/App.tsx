import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';

function App() {
const [activities,setActivities ]=useState<IActivity[]>([]);
const [selectedActivity,setSelectedActivity]=useState<IActivity| undefined>(undefined);
const [editMode,setEditMode]=useState(false);
function handleSelectActivity(id :string)
{
  setSelectedActivity(activities.find(c=>c.id===id));

}
function handleCancelSelectActivity()
{ 
  setSelectedActivity(undefined);

}

// form
function  handleFormOpen(id?:string)
{
id?handleSelectActivity(id):handleCancelSelectActivity(); 
setEditMode(true);

}
function handleFormClose()
{
  setEditMode(false);
}
function handleCreateOrEditActivity(activity:IActivity)
{
activity.id?setActivities([...activities.filter(c=>c.id!==activity.id),activity]):
setActivities([...activities,activity]);
setEditMode(false);
setSelectedActivity(activity);
}
useEffect(
  ()=>
  {
    axios.get<IActivity[]>("https:localhost:5001/api/activities").then
    (
      response=>
      {
        
        setActivities(response.data);

      }
    );

  } ,
  []
);

  return (
    // can also use <> instead of fragment
    <Fragment > 
  <NavBar openForm={handleFormOpen} />
  <Container style={{marginTop: "10em"}}>
  <ActivityDashboard
    activities={activities}
    selectedActivity={selectedActivity}
    selectActivity={handleSelectActivity}
    cancelSelectActivity={handleCancelSelectActivity}
    editMode={editMode}
    openForm={handleFormOpen}
    closeForm={handleFormClose}
    CreateOrEdit={handleCreateOrEditActivity}
    />
  </Container>
      
  
    </Fragment>
    
  );
}

export default App;
