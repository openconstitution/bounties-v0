import 'react-toastify/dist/ReactToastify.css';
// import './app.scss';
import 'semantic-ui-css/semantic.min.css'

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

Sentry.init({
  dsn: "",
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

export const App = (props: DispatchProps) => {
  useEffect(() => {
    props.getSession();
  }, []);

  return (
    <Router basename={baseHref}>
      <div>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </div>      
    </Router>
  );
};

const mapDispatchToProps = { getSession };
 
type DispatchProps = typeof mapDispatchToProps

export default connect(null, mapDispatchToProps)(hot(module)(App));
null