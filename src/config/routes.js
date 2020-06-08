import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Import Pages
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
// Import Components
import BirdingSession from '../components/BirdingSession';
// Import Forms
import NewBirdingSessionForm from '../forms/NewBirdingSessionForm';
import NewBirdForm from '../forms/NewBirdForm';

const Routes = (props) => (
  <Switch>
    <Route exact path='/register' component={ Register } />
    <Route exact path='/login' render={(routeComponentProps) => {
      // pass props to Login component using render, callback fcn
      return <Login 
        // pass it router props such as history, match, etc.
        {...routeComponentProps}
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />
    }}/>
    <Route path='/profile' render={(routeComponentProps) => {
      return <Profile 
        {...routeComponentProps}
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />
    }} />
    <Route exact path='/birdingSession/new' component={ NewBirdingSessionForm } />
    <Route path='/birdingSession/:id' component={ BirdingSession}  />
    <Route exact path='/bird/new' component={ NewBirdForm } />
  </Switch>
)

export default Routes;