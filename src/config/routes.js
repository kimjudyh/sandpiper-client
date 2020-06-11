import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Import Pages
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
// Import Components
import BirdingSession from '../components/BirdingSession';
import PhotoList from '../components/PhotoList';

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
        routeComponentProps={routeComponentProps}
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />
    }} />
    <Route path='/birdingSession/:id' component={ BirdingSession}  />
    <Route path='/photos' render={(routeComponentProps) => {
      return <PhotoList 
        routeComponentProps={routeComponentProps}
        currentUser={props.currentUser}
        storeUser={props.storeUser}
      />
    }} />

  </Switch>
)

export default Routes;