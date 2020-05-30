import { Moment } from 'moment';
import { IFunding } from 'app/shared/model/funding.model';
import { IIssue } from 'app/shared/model/issue.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface IBounty {
  id?: number;
  status?: Status;
  url?: string;
  amount?: number;
  experience?: Experience;
  commitment?: number;
  type?: Type;
  category?: Category;
  keywords?: string;
  permission?: boolean;
  expires?: Moment;
  fundings?: IFunding[];
  issue?: IIssue;
}

export class Bounty implements IBounty {
  constructor(
    public id?: number,
    public status?: Status,
    public url?: string,
    public amount?: number,
    public experience?: Experience,
    public commitment?: number,
    public type?: Type,
    public category?: Category,
    public keywords?: string,
    public permission?: boolean,
    public expires?: Moment,
    public fundings?: IFunding[],
    public issue?: IIssue
  ) {
    this.permission = this.permission || false;
  }
}
