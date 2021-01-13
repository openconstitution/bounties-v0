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
import { getConfig } from 'app/modules/stripe-payment/stripe-payment.reducer';

import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import { LoadingBar } from 'react-redux-loading-bar';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './themes/theme';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');
export interface IAppProps extends DispatchProps, StateProps {}

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

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getConfig(null);
  }, []);

  return (
    <Router basename={baseHref}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingBar className="loading-bar" />
        <ErrorBoundary>
          <Elements stripe={loadStripe(props.stripePublishableKey)}>
            <AppRoutes />
          </Elements>
        </ErrorBoundary>
      </ThemeProvider>      
    </Router>
  );
};

const mapStateToProps = ({ stripePayment }: IRootState) => ({
  stripePublishableKey: null
});

const mapDispatchToProps = { getSession, getConfig };
 
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
