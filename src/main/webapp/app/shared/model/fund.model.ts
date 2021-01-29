import { IBounty } from 'app/shared/model/bounty.model';

export interface IFund {
  id?: number;
  amount?: number;
  mode?: string;
  paymentAuth?: boolean;
  bounty?: IBounty;
  createdBy?: string;
  createdDate?: Date;
}

export const defaultValue: Readonly<IFund> = {
  paymentAuth: false,
};
