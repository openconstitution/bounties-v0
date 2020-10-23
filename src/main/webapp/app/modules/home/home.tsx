import './home.scss';

import React from 'react';
import { connect } from 'react-redux';
import { getLoginUrl } from 'app/shared/util/url-utils';
import { Segment, Container, Message } from 'semantic-ui-react';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {

  const { account } = props;

  return (
    <Segment basic>
      <Container>
          {account && account.login ? (
            <div>
              <Message success>
                <p>
                  You are logged in as user {account.login}.
                </p>
              </Message>
            </div>
          ) : (
            <div>
              <Message warning>
                <p>If you want to <a href={getLoginUrl()} className="alert-link">sign in</a></p>
                <p>
                  , you can try the default accounts:
                  <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                  <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
                </p>
              </Message>
            </div>
          )}

          <h2>
            Grow OpenSource - Bounties Platform!
          </h2>
          <p>{getLoginUrl()}</p>
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
