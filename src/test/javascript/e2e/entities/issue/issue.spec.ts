import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IssueComponentsPage from './issue.page-object';
import IssueUpdatePage from './issue-update.page-object';
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

describe('Issue e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let issueComponentsPage: IssueComponentsPage;
  let issueUpdatePage: IssueUpdatePage;

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
    issueComponentsPage = new IssueComponentsPage();
    issueComponentsPage = await issueComponentsPage.goToPage(navBarPage);
  });

  it('should load Issues', async () => {
    expect(await issueComponentsPage.title.getText()).to.match(/Issues/);
    expect(await issueComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Issues', async () => {
    const beforeRecordsCount = (await isVisible(issueComponentsPage.noRecords)) ? 0 : await getRecordsCount(issueComponentsPage.table);
    issueUpdatePage = await issueComponentsPage.goToCreateIssue();
    await issueUpdatePage.enterData();

    expect(await issueComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(issueComponentsPage.table);
    await waitUntilCount(issueComponentsPage.records, beforeRecordsCount + 1);
    expect(await issueComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await issueComponentsPage.deleteIssue();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(issueComponentsPage.records, beforeRecordsCount);
      expect(await issueComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(issueComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
