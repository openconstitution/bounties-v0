import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FundingComponentsPage from './funding.page-object';
import FundingUpdatePage from './funding-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Funding e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fundingComponentsPage: FundingComponentsPage;
  let fundingUpdatePage: FundingUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.loginWithOAuth('admin', 'admin');
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    fundingComponentsPage = new FundingComponentsPage();
    fundingComponentsPage = await fundingComponentsPage.goToPage(navBarPage);
  });

  it('should load Fundings', async () => {
    expect(await fundingComponentsPage.title.getText()).to.match(/Fundings/);
    expect(await fundingComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Fundings', async () => {
    const beforeRecordsCount = (await isVisible(fundingComponentsPage.noRecords)) ? 0 : await getRecordsCount(fundingComponentsPage.table);
    fundingUpdatePage = await fundingComponentsPage.goToCreateFunding();
    await fundingUpdatePage.enterData();

    expect(await fundingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fundingComponentsPage.table);
    await waitUntilCount(fundingComponentsPage.records, beforeRecordsCount + 1);
    expect(await fundingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fundingComponentsPage.deleteFunding();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fundingComponentsPage.records, beforeRecordsCount);
      expect(await fundingComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fundingComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
