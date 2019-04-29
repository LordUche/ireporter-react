import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route component={NotFound} exact />
    </Switch>
  );
};

export default Routes;
