import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FundComponentsPage from './fund.page-object';
import FundUpdatePage from './fund-update.page-object';
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

describe('Fund e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fundComponentsPage: FundComponentsPage;
  let fundUpdatePage: FundUpdatePage;

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
    fundComponentsPage = new FundComponentsPage();
    fundComponentsPage = await fundComponentsPage.goToPage(navBarPage);
  });

  it('should load Funds', async () => {
    expect(await fundComponentsPage.title.getText()).to.match(/Funds/);
    expect(await fundComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Funds', async () => {
    const beforeRecordsCount = (await isVisible(fundComponentsPage.noRecords)) ? 0 : await getRecordsCount(fundComponentsPage.table);
    fundUpdatePage = await fundComponentsPage.goToCreateFund();
    await fundUpdatePage.enterData();

    expect(await fundComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(fundComponentsPage.table);
    await waitUntilCount(fundComponentsPage.records, beforeRecordsCount + 1);
    expect(await fundComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await fundComponentsPage.deleteFund();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(fundComponentsPage.records, beforeRecordsCount);
      expect(await fundComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(fundComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
