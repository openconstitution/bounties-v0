import 'react-toastify/dist/ReactToastify.css';
// import './app.scss';
import 'semantic-ui-css/semantic.min.css'

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { getSession } from 'app/shared/reducers/authentication';
import { getConfig } from 'app/modules/stripe-payment/stripe-payment.reducer';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';
import { IRootState } from './shared/reducers';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');
export interface IAppProps extends DispatchProps, StateProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getConfig(null);
  }, []);

  return (
    <Router basename={baseHref}>
      <Elements stripe={loadStripe(props.stripePublishableKey)}>
        <div>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </Elements>
    </Router>
  );
};

const mapStateToProps = ({ stripePayment }: IRootState) => ({
  stripePublishableKey: stripePayment.config.stripePublishableKey,
});

const mapDispatchToProps = { getSession, getConfig };
 
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
