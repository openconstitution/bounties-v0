import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProfileComponentsPage from './profile.page-object';
import ProfileUpdatePage from './profile-update.page-object';
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

describe('Profile e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let profileComponentsPage: ProfileComponentsPage;
  let profileUpdatePage: ProfileUpdatePage;

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
    profileComponentsPage = new ProfileComponentsPage();
    profileComponentsPage = await profileComponentsPage.goToPage(navBarPage);
  });

  it('should load Profiles', async () => {
    expect(await profileComponentsPage.title.getText()).to.match(/Profiles/);
    expect(await profileComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Profiles', async () => {
    const beforeRecordsCount = (await isVisible(profileComponentsPage.noRecords)) ? 0 : await getRecordsCount(profileComponentsPage.table);
    profileUpdatePage = await profileComponentsPage.goToCreateProfile();
    await profileUpdatePage.enterData();

    expect(await profileComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(profileComponentsPage.table);
    await waitUntilCount(profileComponentsPage.records, beforeRecordsCount + 1);
    expect(await profileComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await profileComponentsPage.deleteProfile();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(profileComponentsPage.records, beforeRecordsCount);
      expect(await profileComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(profileComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
