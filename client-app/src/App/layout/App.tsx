import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';

import { Button, Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
import {  useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
// without mobx

function App() {
   const {activityStore}=useStore();
const [activities,setActivities ]=useState<IActivity[]>([]);
const [selectedActivity,setSelectedActivity]=useState<IActivity| undefined>(undefined);
const [editMode,setEditMode]=useState(false);
const[loading,setLoading]=useState(true);
const [submitting,setSubmitting]=useState(false);

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
  setSubmitting(true);
  if(activity.id)
  {
    agent.Activities.update(activity).then
    (()=>
      {
        setActivities([...activities.filter(c=>c.id!==activity.id),activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      }
    );
  }
  else
  {
    activity.id=uuid();
    agent.Activities.create(activity).then(
      ()=>
      {
        setActivities([...activities,activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
    }
    );
  }
// activity.id?setActivities([...activities.filter(c=>c.id!==activity.id),activity]):
// setActivities([...activities,{...activity,id:uuid()}]);
// setEditMode(false);
// setSelectedActivity(activity);
}
function handleDeleteActivity(id:string)
{
  setSubmitting(true);
  agent.Activities.delete(id).then(()=>{setActivities([...activities.filter(x=>x.id!==id)]); setSubmitting(false)});
  

}

useEffect(
  ()=>
  {
   agent.Activities.list().then
    (
      response=>
      {
        let activities:IActivity[]=[];
        response.forEach(activity=>
          {
            activity.date=activity.date.split('T')[0];
            activities.push(activity);
          }
          );
        
        setActivities(activities); 
        setLoading(false);

      }
    );

  } ,
  []
);
if(loading) return <LoadingComponent content='Loading App' />

  return (
    // can also use <> instead of fragment
    <Fragment > 

  <NavBar openForm={handleFormOpen} />
  <Container style={{marginTop: "10em"}}>
    <h2>{activityStore.title}</h2>
    {/* // to make the below observable we will wrapp the export of app into a observer */}
    <Button content="Add Exclaimation"  onClick={activityStore.setTitle} positive/>
  <ActivityDashboard
    activities={activities}
    selectedActivity={selectedActivity}
    selectActivity={handleSelectActivity}
    cancelSelectActivity={handleCancelSelectActivity}
    editMode={editMode}
    openForm={handleFormOpen}
    closeForm={handleFormClose}
    CreateOrEdit={handleCreateOrEditActivity}
    DeleteActivity={handleDeleteActivity}
    submitting={submitting}
    />
  </Container>
      
  
    </Fragment>
    
  );
}

export default observer(App);
