import { Moment } from 'moment';
import { IIssue } from 'app/shared/model/issue.model';
import { IFunding } from 'app/shared/model/funding.model';
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
  expires?: string;
  issue?: IIssue;
  fundings?: IFunding[];
}

export const defaultValue: Readonly<IBounty> = {
  permission: false,
};
