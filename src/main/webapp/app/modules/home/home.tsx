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
  const loading = true;
  const { account } = props;
  const classes = useStyles();
  const numrows = 6;

  const items = [];

  for (let i = 0; i < numrows; i++) {
    items.push(
      <Grid item xs={3}>
        <Card className={classes.root}>
          <CardActionArea>
            {loading ? (
              <Skeleton variant="rect" width="100%">
                <div style={{ paddingTop: '57%' }} />
              </Skeleton>
            ) : (
              <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            )}
            <CardContent>
              {loading ? (
                <div>
                  <Skeleton />
                  <Skeleton animation={false} />
                  <Skeleton animation="wave" />
                </div>
              ) : (
                <div>
                  <Typography gutterBottom variant="h5" component="h2">
                    Bounty ####
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit quam eligendi beatae. Nam beatae deleniti, est, iusto aperiam temporibus sequi eligendi error maxime quam, neque labore architecto officiis a dolorem!
                  </Typography>
                </div>
              )}

            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More...
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  return (
    <Segment basic>
      <Container>
          {account && account.login ? (
            <div>
              <Alert color="success">
                <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                  You are logged in as user {account.login}.
                </Translate>
              </Alert>
            </div>
          ) : (
            <div>
              <Alert color="warning">
                <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
                <a href={getLoginUrl()} className="alert-link">
                  <Translate contentKey="global.messages.info.authenticated.link">sign in</Translate>
                </a>
                <Translate contentKey="global.messages.info.authenticated.suffix">
                  , you can try the default accounts:
                  <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                  <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
                </Translate>
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

          <Grid container spacing={3}>

            { items }

          </Grid>
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
