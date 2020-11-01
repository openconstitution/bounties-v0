import React from 'react';
import { connect } from 'react-redux';

import { Segment, Grid } from 'semantic-ui-react';
import { IRootState } from 'app/shared/reducers';
import { logout } from 'app/shared/reducers/authentication';

export interface ILoginProps extends StateProps, DispatchProps {}

export const Login = (props: ILoginProps) => {
  return (
    <Segment basic style={{ padding: '5em 5em' }} vertical>
			<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
					<Grid.Column width={16}>
						<h4>Login Page!</h4>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Segment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
//   logoutUrl: storeState.authentication.logoutUrl,
//   idToken: storeState.authentication.idToken,
});

const mapDispatchToProps = { logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
