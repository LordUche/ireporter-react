import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import SignUpForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ReportIncidentForm from './components/ReportIncidentForm';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import Incident from './components/Incident';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/signup" component={SignUpForm} exact />
      <Route path="/login" component={LoginForm} exact />
      <ProtectedRoute path="/profile" component={Profile} exact />
      <ProtectedRoute path="/report" component={ReportIncidentForm} exact />
      <ProtectedRoute
        path="/:type(red-flags|interventions)/:id"
        component={Incident}
        exact
      />
      <Route component={NotFound} exact />
    </Switch>
  );
};

export default Routes;
