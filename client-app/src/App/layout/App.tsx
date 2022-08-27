import React, { Fragment, useEffect } from 'react';
import './styles.css';

import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponents';
import {  useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ActivityForm from '../features/activities/form/ActivityForm';
// without mobx

function App() {
   const {activityStore}=useStore();

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
  <Route exact path={'/'} component={HomePage} />
  <Route path='/activities' component={ActivityDashboard} />
  <Route path='/createActivity' component={ActivityForm} />
  
  </Container>
      
  
    </Fragment>
    
  );
}

export default observer(App);
