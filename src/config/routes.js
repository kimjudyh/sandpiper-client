import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Import Components
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import BirdingSession from '../components/BirdingSession';

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
    <Route path='/profile' render={() => {
      return <Profile 
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />
    }} />
    <Route path='/birdingSession/:id' component={ BirdingSession}  />
  </Switch>
)

export default Routes;