import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import IssueUpdatePage from './issue-update.page-object';

const expect = chai.expect;
export class IssueDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bountiesApp.issue.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-issue'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class IssueComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('issue-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('issue');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateIssue() {
    await this.createButton.click();
    return new IssueUpdatePage();
  }

  async deleteIssue() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const issueDeleteDialog = new IssueDeleteDialog();
    await waitUntilDisplayed(issueDeleteDialog.deleteModal);
    expect(await issueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bountiesApp.issue.delete.question/);
    await issueDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(issueDeleteDialog.deleteModal);

    expect(await isVisible(issueDeleteDialog.deleteModal)).to.be.false;
  }
}
