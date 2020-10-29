import { IBounty } from 'app/shared/model/bounty.model';

export interface IFunding {
  id?: number;
  amount?: number;
  mode?: string;
  paymentAuth?: boolean;
  bounty?: IBounty;
}

export const defaultValue: Readonly<IFunding> = {
  paymentAuth: false,
};
