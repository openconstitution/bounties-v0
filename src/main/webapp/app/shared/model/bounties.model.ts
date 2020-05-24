export interface IBounties {
  id?: number;
  status?: boolean;
  url?: string;
  amount?: number;
  type?: string;
  category?: string;
}

export class Bounties implements IBounties {
  constructor(
    public id?: number,
    public status?: boolean,
    public url?: string,
    public amount?: number,
    public type?: string,
    public category?: string
  ) {
    this.status = this.status || false;
  }
}
