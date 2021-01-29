import { IFund } from 'app/shared/model/fund.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { IUser } from './user.model';

export interface IBounty {
  id?: number;
  summary?: string;
  description?: string;
  status?: IOption;
  issueUrl?: string;
  amount?: number;
  experience?: IOption;
  commitment?: number;
  type?: IOption;
  category?: IOption;
  keywords?: string[];
  permission?: boolean;
  expiryDate?: Date;
  funds?: IFund[];
  hunter?: IUser;
  createdBy?: string;
  createdDate?: Date;
}

export interface IOption {
  id?: number;
  name?: string;
  key?: string;
  value?: string;
}

export const categoryOptions = [
  { key: 'F', text: 'Frontend', value: Category.FRONT_END },
  { key: 'B', text: 'Backend', value: Category.BACKEND },
  { key: 'T', text: 'This', value: Category.THIS },
];
export const typeOptions = [
  { key: 'B', text: 'Bug', value: Type.BUG },
  { key: 'F', text: 'Feature', value: Type.FEATURE },
  { key: 'I', text: 'Improvement', value: Type.IMPROVEMENT },
  { key: 'E', text: 'Ex', value: Type.EX },
];
export const experienceOptions = [
  { key: 'B', text: 'Beginner', value: Experience.BEGINNER },
  { key: 'I', text: 'Intermediate', value: Experience.INTERMEDIATE },
  { key: 'E', text: 'Experience', value: Experience.ADVANCED },
];
export const modeOptions = [
  { key: 'A', text: 'Mode A', value: 'Mode A' },
  { key: 'B', text: 'Mode B', value: 'Mode B' },
  { key: 'C', text: 'Mode C', value: 'Mode C' },
];

export const defaultValue: Readonly<IBounty> = {};
