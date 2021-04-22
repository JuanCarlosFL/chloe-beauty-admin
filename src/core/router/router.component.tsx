import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import {
  AppointmentScene,
  CustomerScene,
  CustomerListScene,
  LoginScene,
  LoyaltyScene,
  MenuScene,
  TreatmentScene,
  NonAuthScene,
  TreatmentListScene,
  LoyaltyListScene,
} from 'scenes';
import { AuthRoutes, NonAuthRoutes, UserRoles, AuthRoute } from 'core/auth';

export const RouterComponent: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact={true}
          path={[NonAuthRoutes.root, NonAuthRoutes.login]}
          component={LoginScene}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.menu}
          Component={MenuScene}
          requiredRoles={[
            String(UserRoles.administrator),
            String(UserRoles.client),
          ]}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.appointment}
          Component={AppointmentScene}
          requiredRoles={[String(UserRoles.administrator)]}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.customerList}
          Component={CustomerListScene}
          requiredRoles={[String(UserRoles.administrator)]}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.loyaltyList}
          Component={LoyaltyListScene}
          requiredRoles={[String(UserRoles.administrator)]}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.loyalty}
          Component={LoyaltyScene}
          requiredRoles={[String(UserRoles.administrator)]}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.treatment}
          Component={TreatmentScene}
          requiredRoles={[String(UserRoles.administrator)]}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.treatmentList}
          Component={TreatmentListScene}
          requiredRoles={[String(UserRoles.administrator)]}
        />
        <AuthRoute
          exact={true}
          path={AuthRoutes.customer}
          Component={CustomerScene}
          requiredRoles={[String(UserRoles.administrator)]}
        />
        <Route
          exact={true}
          path={NonAuthRoutes.nonAuth}
          component={NonAuthScene}
        />
      </Switch>
    </Router>
  );
};
