import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route component={NotFound} exact />
      </Switch>
    </Router>
  );
};

export default Routes;
