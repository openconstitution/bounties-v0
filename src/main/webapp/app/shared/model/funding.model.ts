import { IBounty } from 'app/shared/model/bounty.model';

export interface IFunding {
  id?: number;
  amount?: number;
  mode?: string;
  paymentAuth?: boolean;
  bounty?: IBounty;
}

export class Funding implements IFunding {
  constructor(public id?: number, public amount?: number, public mode?: string, public paymentAuth?: boolean, public bounty?: IBounty) {
    this.paymentAuth = this.paymentAuth || false;
  }
}
