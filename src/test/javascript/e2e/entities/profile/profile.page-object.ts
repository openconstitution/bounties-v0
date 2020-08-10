import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProfileUpdatePage from './profile-update.page-object';

const expect = chai.expect;
export class ProfileDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('bountiesApp.profile.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-profile'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProfileComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('profile-heading'));
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
    await navBarPage.getEntityPage('profile');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProfile() {
    await this.createButton.click();
    return new ProfileUpdatePage();
  }

  async deleteProfile() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const profileDeleteDialog = new ProfileDeleteDialog();
    await waitUntilDisplayed(profileDeleteDialog.deleteModal);
    expect(await profileDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/bountiesApp.profile.delete.question/);
    await profileDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(profileDeleteDialog.deleteModal);

    expect(await isVisible(profileDeleteDialog.deleteModal)).to.be.false;
  }
}
