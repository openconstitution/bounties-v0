import 'react-toastify/dist/ReactToastify.css';
import './app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import { LoadingBar } from 'react-redux-loading-bar';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './themes/theme';

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

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG');

export const App = (props: DispatchProps) => {
  useEffect(() => {
    props.getSession();
  }, []);

  return (
    <Router basename={baseHref}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingBar className="loading-bar" />
        <ErrorBoundary>
          <Elements stripe={stripePromise}>
            <AppRoutes />
          </Elements>
        </ErrorBoundary>
      </ThemeProvider>      
    </Router>
  );
};

const mapDispatchToProps = { getSession };
 
type DispatchProps = typeof mapDispatchToProps

export default connect(null, mapDispatchToProps)(hot(module)(App));
