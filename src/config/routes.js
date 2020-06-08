import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Register from '../pages/Register';

const Routes = (props) => (
  <Switch>
    <Route exact path='/register' component={ Register } />
  </Switch>
)

export default Routes;