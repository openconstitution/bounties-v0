import 'react-toastify/dist/ReactToastify.css';
// import './app.scss';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline, Container } from '@material-ui/core';
import 'semantic-ui-css/semantic.min.css'

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    props.getSession();
    props.getProfile();
  }, []);

  // const paddingTop = '60px';
  const classes = useStyles();

  return (
    <Router basename={baseHref}>
      <ErrorBoundary>
        <Header
          isAuthenticated={props.isAuthenticated}
          isAdmin={props.isAdmin}
          ribbonEnv={props.ribbonEnv}
          isInProduction={props.isInProduction}
          isSwaggerEnabled={props.isSwaggerEnabled}
        />
      </ErrorBoundary>
      <Container className={classes.paper}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </Container>
      <br/>
      <Footer />
    </Router>
  );
};

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
