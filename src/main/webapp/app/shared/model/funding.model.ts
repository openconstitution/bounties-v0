import { IBounties } from 'app/shared/model/bounties.model';

export interface IFunding {
  id?: number;
  amount?: number;
  mode?: string;
  paymentAuth?: boolean;
  bounties?: IBounties;
}

export class Funding implements IFunding {
  constructor(public id?: number, public amount?: number, public mode?: string, public paymentAuth?: boolean, public bounties?: IBounties) {
    this.paymentAuth = this.paymentAuth || false;
  }
}
