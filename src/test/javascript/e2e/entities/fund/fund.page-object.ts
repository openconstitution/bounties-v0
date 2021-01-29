import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FundUpdatePage from './fund-update.page-object';

const expect = chai.expect;
export class FundDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bountiesApp.fund.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-fund'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FundComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('fund-heading'));
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
    await navBarPage.getEntityPage('fund');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFund() {
    await this.createButton.click();
    return new FundUpdatePage();
  }

  async deleteFund() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fundDeleteDialog = new FundDeleteDialog();
    await waitUntilDisplayed(fundDeleteDialog.deleteModal);
    expect(await fundDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bountiesApp.fund.delete.question/);
    await fundDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fundDeleteDialog.deleteModal);

    expect(await isVisible(fundDeleteDialog.deleteModal)).to.be.false;
  }
}
