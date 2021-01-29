import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class FundUpdatePage {
  pageTitle: ElementFinder = element(by.id('bountiesApp.fund.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  amountInput: ElementFinder = element(by.css('input#fund-amount'));
  modeInput: ElementFinder = element(by.css('input#fund-mode'));
  paymentAuthInput: ElementFinder = element(by.css('input#fund-paymentAuth'));
  bountySelect: ElementFinder = element(by.css('select#fund-bounty'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
  }

  async setModeInput(mode) {
    await this.modeInput.sendKeys(mode);
  }

  async getModeInput() {
    return this.modeInput.getAttribute('value');
  }

  getPaymentAuthInput() {
    return this.paymentAuthInput;
  }
  async bountySelectLastOption() {
    await this.bountySelect.all(by.tagName('option')).last().click();
  }

  async bountySelectOption(option) {
    await this.bountySelect.sendKeys(option);
  }

  getBountySelect() {
    return this.bountySelect;
  }

  async getBountySelectedOption() {
    return this.bountySelect.element(by.css('option:checked')).getText();
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
    await this.setAmountInput('5');
    expect(await this.getAmountInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setModeInput('mode');
    expect(await this.getModeInput()).to.match(/mode/);
    await waitUntilDisplayed(this.saveButton);
    const selectedPaymentAuth = await this.getPaymentAuthInput().isSelected();
    if (selectedPaymentAuth) {
      await this.getPaymentAuthInput().click();
      expect(await this.getPaymentAuthInput().isSelected()).to.be.false;
    } else {
      await this.getPaymentAuthInput().click();
      expect(await this.getPaymentAuthInput().isSelected()).to.be.true;
    }
    await this.bountySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
