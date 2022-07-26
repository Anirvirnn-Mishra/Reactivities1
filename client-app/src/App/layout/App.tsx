import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';

import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponents';
import {  useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
// without mobx

function App() {
   const {activityStore}=useStore();
const [activities,setActivities ]=useState<IActivity[]>([]);
const [submitting,setSubmitting]=useState(false);

// function handleCreateOrEditActivity(activity:IActivity)
// {
//   setSubmitting(true);
//   if(activity.id)
//   {
//     agent.Activities.update(activity).then
//     (()=>
//       {
//         setActivities([...activities.filter(c=>c.id!==activity.id),activity]);
//         setSelectedActivity(activity);
//         setEditMode(false);
//         setSubmitting(false);
//       }
//     );
//   }
//   else
//   {
//     activity.id=uuid();
//     agent.Activities.create(activity).then(
//       ()=>
//       {
//         setActivities([...activities,activity]);
//         setSelectedActivity(activity);
//         setEditMode(false);
//         setSubmitting(false);
//     }
//     );
//   }
// // activity.id?setActivities([...activities.filter(c=>c.id!==activity.id),activity]):
// // setActivities([...activities,{...activity,id:uuid()}]);
// // setEditMode(false);
// // setSelectedActivity(activity);
// }
function handleDeleteActivity(id:string)
{
  setSubmitting(true);
  agent.Activities.delete(id).then(()=>{setActivities([...activities.filter(x=>x.id!==id)]); setSubmitting(false)});
  

}

useEffect(
  ()=>
  {activityStore.loadActivities();},[activityStore]
  );
if(activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    // can also use <> instead of fragment
    <Fragment > 

  <NavBar />
  <Container style={{marginTop: "10em"}}>
    
  <ActivityDashboard
    activities={activityStore.activities}
    DeleteActivity={handleDeleteActivity}
    submitting={submitting}
    />
  </Container>
      
  
    </Fragment>
    
  );
}

export default observer(App);
