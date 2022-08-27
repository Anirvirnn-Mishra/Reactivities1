import React, { Fragment} from 'react';
import './styles.css';

import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import {   Route, Switch } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import ActivityForm from '../features/activities/form/ActivityForm';
// without mobx

function App() {


  return (
    // can also use <> instead of fragment

    <Fragment>

  <NavBar />

  <Container style={{marginTop: "10em"}}>
  <Switch>
    
  <Route exact path='/' component={HomePage} />
  <Route path='/activities'  component={ActivityDashboard} />
  <Route path='/createActivity' component={ActivityForm} />
  </Switch>
    </Container>
      
  
  
  </Fragment>    

  );
}

export default observer(App);
