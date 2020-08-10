import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import BountyUpdatePage from './bounty-update.page-object';

const expect = chai.expect;
export class BountyDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bountiesApp.bounty.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-bounty'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class BountyComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('bounty-heading'));
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
    await navBarPage.getEntityPage('bounty');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateBounty() {
    await this.createButton.click();
    return new BountyUpdatePage();
  }

  async deleteBounty() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const bountyDeleteDialog = new BountyDeleteDialog();
    await waitUntilDisplayed(bountyDeleteDialog.deleteModal);
    expect(await bountyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bountiesApp.bounty.delete.question/);
    await bountyDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(bountyDeleteDialog.deleteModal);

    expect(await isVisible(bountyDeleteDialog.deleteModal)).to.be.false;
  }
}
