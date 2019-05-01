import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/signup" component={SignupForm} exact />
      <Route path="/login" component={LoginForm} exact />
      <Route component={NotFound} exact />
    </Switch>
  );
};

export default Routes;
