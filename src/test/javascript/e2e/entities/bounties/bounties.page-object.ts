import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BountiesUpdatePage from './bounties-update.page-object';

const expect = chai.expect;
export class BountiesDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bountiesApp.bounties.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bounties'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BountiesComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bounties-heading'));
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
    await navBarPage.getEntityPage('bounties');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBounties() {
    await this.createButton.click();
    return new BountiesUpdatePage();
  }

  async deleteBounties() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bountiesDeleteDialog = new BountiesDeleteDialog();
    await waitUntilDisplayed(bountiesDeleteDialog.deleteModal);
    expect(await bountiesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bountiesApp.bounties.delete.question/);
    await bountiesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bountiesDeleteDialog.deleteModal);

    expect(await isVisible(bountiesDeleteDialog.deleteModal)).to.be.false;
  }
}
