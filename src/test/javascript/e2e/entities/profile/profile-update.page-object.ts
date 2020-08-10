import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProfileUpdatePage {
  pageTitle: ElementFinder = element(by.id('bountiesApp.profile.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  votesInput: ElementFinder = element(by.css('input#profile-votes'));
  profilelinkInput: ElementFinder = element(by.css('input#profile-profilelink'));
  aboutInput: ElementFinder = element(by.css('input#profile-about'));
  walletaddressInput: ElementFinder = element(by.css('input#profile-walletaddress'));
  githubEmailInput: ElementFinder = element(by.css('input#profile-githubEmail'));
  githubOrgNameInput: ElementFinder = element(by.css('input#profile-githubOrgName'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setVotesInput(votes) {
    await this.votesInput.sendKeys(votes);
  }

  async getVotesInput() {
    return this.votesInput.getAttribute('value');
  }

  async setProfilelinkInput(profilelink) {
    await this.profilelinkInput.sendKeys(profilelink);
  }

  async getProfilelinkInput() {
    return this.profilelinkInput.getAttribute('value');
  }

  async setAboutInput(about) {
    await this.aboutInput.sendKeys(about);
  }

  async getAboutInput() {
    return this.aboutInput.getAttribute('value');
  }

  async setWalletaddressInput(walletaddress) {
    await this.walletaddressInput.sendKeys(walletaddress);
  }

  async getWalletaddressInput() {
    return this.walletaddressInput.getAttribute('value');
  }

  async setGithubEmailInput(githubEmail) {
    await this.githubEmailInput.sendKeys(githubEmail);
  }

  async getGithubEmailInput() {
    return this.githubEmailInput.getAttribute('value');
  }

  async setGithubOrgNameInput(githubOrgName) {
    await this.githubOrgNameInput.sendKeys(githubOrgName);
  }

  async getGithubOrgNameInput() {
    return this.githubOrgNameInput.getAttribute('value');
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
    await this.setVotesInput('5');
    expect(await this.getVotesInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setProfilelinkInput('profilelink');
    expect(await this.getProfilelinkInput()).to.match(/profilelink/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAboutInput('about');
    expect(await this.getAboutInput()).to.match(/about/);
    await waitUntilDisplayed(this.saveButton);
    await this.setWalletaddressInput('walletaddress');
    expect(await this.getWalletaddressInput()).to.match(/walletaddress/);
    await waitUntilDisplayed(this.saveButton);
    await this.setGithubEmailInput('githubEmail');
    expect(await this.getGithubEmailInput()).to.match(/githubEmail/);
    await waitUntilDisplayed(this.saveButton);
    await this.setGithubOrgNameInput('githubOrgName');
    expect(await this.getGithubOrgNameInput()).to.match(/githubOrgName/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
