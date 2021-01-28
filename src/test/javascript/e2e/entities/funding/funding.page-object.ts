import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FundingUpdatePage from './fund-update.page-object';

const expect = chai.expect;
export class FundingDeleteDialog {
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

export default class FundingComponentsPage {
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

  async goToCreateFunding() {
    await this.createButton.click();
    return new FundingUpdatePage();
  }

  async deleteFunding() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const fundingDeleteDialog = new FundingDeleteDialog();
    await waitUntilDisplayed(fundingDeleteDialog.deleteModal);
    expect(await fundingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bountiesApp.fund.delete.question/);
    await fundingDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(fundingDeleteDialog.deleteModal);

    expect(await isVisible(fundingDeleteDialog.deleteModal)).to.be.false;
  }
}
