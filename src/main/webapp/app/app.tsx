import 'react-toastify/dist/ReactToastify.css';
import '../content/scss/app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { getSession } from 'app/shared/reducers/authentication';

import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import { LoadingBar } from 'react-redux-loading-bar';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

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
      <CssBaseline />
      <LoadingBar className="loading-bar" />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
};

const mapDispatchToProps = { getSession };

type DispatchProps = typeof mapDispatchToProps

export default connect(null, mapDispatchToProps)(hot(module)(App));
