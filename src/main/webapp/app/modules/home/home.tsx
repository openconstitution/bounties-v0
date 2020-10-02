import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Skeleton, Alert } from '@material-ui/lab';
import { Translate } from 'react-jhipster';
import { getLoginUrl } from 'app/shared/util/url-utils';
import { Segment, Container } from 'semantic-ui-react';

export type IHomeProp = StateProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    media: {
      height: 140,
    },
    image: {
      width: '100%',
    },
  }),
);

export const Home = (props: IHomeProp) => {

  const { account } = props;

  return (
    <Segment basic>
      <Container>
          {account && account.login ? (
            <div>
              <Alert color="success">
                <p>
                  You are logged in as user {account.login}.
                </p>
              </Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                <p>If you want to </p>
                <a href={getLoginUrl()} className="alert-link">
                  <p>sign in</p>
                </a>
                <p>
                  , you can try the default accounts:
                  <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                  <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
                </p>
              </Alert>
            </div>
          )}

          <h2>
            Grow OpenSource - Bounties Platform!
          </h2>
          <p className="lead">Social Network for developers</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit quam eligendi beatae. Nam beatae deleniti, est, iusto aperiam temporibus sequi eligendi error maxime quam, neque labore architecto officiis a dolorem!</p>
          <br/>
          <h3>Top bounties this week</h3>

      </Container>
    </Segment>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
