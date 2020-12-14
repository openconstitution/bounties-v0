export interface IStripeConfig {
  stripePublishableKey?: string;
  stripeCountry?: string;
  country?: string;
  currency?: string;
  paymentMethods?: string[];
}

export interface IPaymentIntent {
  amount?: number;
  amountCapturable?: number;
  amountReceived?: number;
  application?: any;
  applicationFeeAmount?: number;
  canceledAt?: number;
  cancellationReason?: string;
  captureMethod?: string;
  charges?: any;
  clientSecret?: string;
  confirmationMethod?: string;
  created?: number;
  currency?: string;
  customer?: any;
  description?: string;
  id?: string;
  invoice?: any;
  lastPaymentError?: any;
  livemode?: boolean;
  metadata?: any;
  nextAction?: any;
  object?: string;
  onBehalfOf?: any;
  paymentMethod?: any;
  paymentMethodOptions?: any;
  paymentMethodTypes?: string[];
  receiptEmail?: string;
  review?: any;
  setupFutureUsage?: string;
  shipping?: any;
  source?: any;
  statementDescriptor?: string;
  statementDescriptorSuffix?: string;
  status?: string;
  transferData?: any;
  transferGroup?: string;
}

export const defaultConfig: Readonly<IStripeConfig> = {};
export const defaultPaymentIntent: Readonly<IPaymentIntent> = {};
