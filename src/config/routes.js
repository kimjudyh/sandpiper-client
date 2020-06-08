import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Import Components
import Register from '../pages/Register';
import Login from '../pages/Login';

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
  </Switch>
)

export default Routes;