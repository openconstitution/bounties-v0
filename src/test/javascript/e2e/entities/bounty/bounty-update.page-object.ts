import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class BountyUpdatePage {
  pageTitle: ElementFinder = element(by.id('bountiesApp.bounty.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  statusSelect: ElementFinder = element(by.css('select#bounty-status'));
  urlInput: ElementFinder = element(by.css('input#bounty-url'));
  amountInput: ElementFinder = element(by.css('input#bounty-amount'));
  experienceSelect: ElementFinder = element(by.css('select#bounty-experience'));
  commitmentInput: ElementFinder = element(by.css('input#bounty-commitment'));
  typeSelect: ElementFinder = element(by.css('select#bounty-type'));
  categorySelect: ElementFinder = element(by.css('select#bounty-category'));
  keywordsInput: ElementFinder = element(by.css('input#bounty-keywords'));
  permissionInput: ElementFinder = element(by.css('input#bounty-permission'));
  expiresInput: ElementFinder = element(by.css('input#bounty-expires'));
  issueSelect: ElementFinder = element(by.css('select#bounty-issue'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }
  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
  }

  async setExperienceSelect(experience) {
    await this.experienceSelect.sendKeys(experience);
  }

  async getExperienceSelect() {
    return this.experienceSelect.element(by.css('option:checked')).getText();
  }

  async experienceSelectLastOption() {
    await this.experienceSelect.all(by.tagName('option')).last().click();
  }
  async setCommitmentInput(commitment) {
    await this.commitmentInput.sendKeys(commitment);
  }

  async getCommitmentInput() {
    return this.commitmentInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }
  async setCategorySelect(category) {
    await this.categorySelect.sendKeys(category);
  }

  async getCategorySelect() {
    return this.categorySelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect.all(by.tagName('option')).last().click();
  }
  async setKeywordsInput(keywords) {
    await this.keywordsInput.sendKeys(keywords);
  }

  async getKeywordsInput() {
    return this.keywordsInput.getAttribute('value');
  }

  getPermissionInput() {
    return this.permissionInput;
  }
  async setExpiresInput(expires) {
    await this.expiresInput.sendKeys(expires);
  }

  async getExpiresInput() {
    return this.expiresInput.getAttribute('value');
  }

  async issueSelectLastOption() {
    await this.issueSelect.all(by.tagName('option')).last().click();
  }

  async issueSelectOption(option) {
    await this.issueSelect.sendKeys(option);
  }

  getIssueSelect() {
    return this.issueSelect;
  }

  async getIssueSelectedOption() {
    return this.issueSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.statusSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setUrlInput('url');
    expect(await this.getUrlInput()).to.match(/url/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAmountInput('5');
    expect(await this.getAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.experienceSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setCommitmentInput('5');
    expect(await this.getCommitmentInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.typeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.categorySelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setKeywordsInput('keywords');
    expect(await this.getKeywordsInput()).to.match(/keywords/);
    await waitUntilDisplayed(this.saveButton);
    const selectedPermission = await this.getPermissionInput().isSelected();
    if (selectedPermission) {
      await this.getPermissionInput().click();
      expect(await this.getPermissionInput().isSelected()).to.be.false;
    } else {
      await this.getPermissionInput().click();
      expect(await this.getPermissionInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setExpiresInput('01-01-2001');
    expect(await this.getExpiresInput()).to.eq('2001-01-01');
    await this.issueSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
