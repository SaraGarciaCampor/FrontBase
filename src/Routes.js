/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import LoadingScreen from './components/LoadingScreen';

const routesConfig = [
  {
    path: '/app',
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('./views/reports/DashboardAlternativeView'))
      },
      {
        exact: true,
        path: '/app/leaderboard',
        component: lazy(() => import('./views/leaderboard'))
      },
      {
        exact: true,
        path: '/app/quiz',
        component: lazy(() => import('./views/quiz'))
      },
      {
        exact: true,
        path: '/app/user',
        component: lazy(() => import('./views/user'))
      },
      {
        exact: true,
        path: '/app/menu',
        component: lazy(() => import('./views/menu'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },


];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
