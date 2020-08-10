import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import BountyComponentsPage from './bounty.page-object';
import BountyUpdatePage from './bounty-update.page-object';
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

describe('Bounty e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let bountyComponentsPage: BountyComponentsPage;
  let bountyUpdatePage: BountyUpdatePage;

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
    bountyComponentsPage = new BountyComponentsPage();
    bountyComponentsPage = await bountyComponentsPage.goToPage(navBarPage);
  });

  it('should load Bounties', async () => {
    expect(await bountyComponentsPage.title.getText()).to.match(/Bounties/);
    expect(await bountyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Bounties', async () => {
    const beforeRecordsCount = (await isVisible(bountyComponentsPage.noRecords)) ? 0 : await getRecordsCount(bountyComponentsPage.table);
    bountyUpdatePage = await bountyComponentsPage.goToCreateBounty();
    await bountyUpdatePage.enterData();

    expect(await bountyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(bountyComponentsPage.table);
    await waitUntilCount(bountyComponentsPage.records, beforeRecordsCount + 1);
    expect(await bountyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await bountyComponentsPage.deleteBounty();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(bountyComponentsPage.records, beforeRecordsCount);
      expect(await bountyComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(bountyComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
