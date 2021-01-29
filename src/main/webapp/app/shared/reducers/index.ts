import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import bounty, {
  BountyState
} from 'app/entities/bounty/bounty.reducer';
// prettier-ignore
import fund, {
  FundState
} from 'app/entities/fund/fund.reducer';
// prettier-ignore
import profile, {
  ProfileState
} from 'app/modules/account/profile/profile.reducer';
// prettier-ignore
import stripePayment, {
  StripePaymentState
} from 'app/modules/stripe-payment/stripe-payment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly bounty: BountyState;
  readonly fund: FundState;
  readonly profile: ProfileState;
  readonly stripePayment: StripePaymentState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  bounty,
  fund,
  profile,
  stripePayment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
