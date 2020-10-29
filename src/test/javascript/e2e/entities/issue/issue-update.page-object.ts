import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class IssueUpdatePage {
  pageTitle: ElementFinder = element(by.id('bountiesApp.issue.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  issueIdInput: ElementFinder = element(by.css('input#issue-issueId'));
  urlInput: ElementFinder = element(by.css('input#issue-url'));
  descriptionInput: ElementFinder = element(by.css('input#issue-description'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setIssueIdInput(issueId) {
    await this.issueIdInput.sendKeys(issueId);
  }

  async getIssueIdInput() {
    return this.issueIdInput.getAttribute('value');
  }

  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
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
    await this.setIssueIdInput('issueId');
    expect(await this.getIssueIdInput()).to.match(/issueId/);
    await waitUntilDisplayed(this.saveButton);
    await this.setUrlInput('url');
    expect(await this.getUrlInput()).to.match(/url/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
