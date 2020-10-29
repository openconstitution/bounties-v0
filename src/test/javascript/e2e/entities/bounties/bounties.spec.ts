import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BountiesComponentsPage from './bounties.page-object';
import BountiesUpdatePage from './bounties-update.page-object';
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

describe('Bounties e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bountiesComponentsPage: BountiesComponentsPage;
  let bountiesUpdatePage: BountiesUpdatePage;

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
    bountiesComponentsPage = new BountiesComponentsPage();
    bountiesComponentsPage = await bountiesComponentsPage.goToPage(navBarPage);
  });

  it('should load Bounties', async () => {
    expect(await bountiesComponentsPage.title.getText()).to.match(/Bounties/);
    expect(await bountiesComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Bounties', async () => {
    const beforeRecordsCount = (await isVisible(bountiesComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(bountiesComponentsPage.table);
    bountiesUpdatePage = await bountiesComponentsPage.goToCreateBounties();
    await bountiesUpdatePage.enterData();

    expect(await bountiesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bountiesComponentsPage.table);
    await waitUntilCount(bountiesComponentsPage.records, beforeRecordsCount + 1);
    expect(await bountiesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bountiesComponentsPage.deleteBounties();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bountiesComponentsPage.records, beforeRecordsCount);
      expect(await bountiesComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bountiesComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
