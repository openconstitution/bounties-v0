import { IBounty } from 'app/shared/model/bounty.model';

export interface IFunding {
  id?: number;
  amount?: number;
  mode?: string;
  paymentAuth?: boolean;
  bounty?: IBounty;
  createdBy?: string;
  createdDate?: Date;
}

export const defaultValue: Readonly<IFunding> = {
  paymentAuth: false,
};
