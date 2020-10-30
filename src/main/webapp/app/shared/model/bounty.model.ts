import { Moment } from 'moment';
import { IFunding } from 'app/shared/model/funding.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Experience } from 'app/shared/model/enumerations/experience.model';
import { Type } from 'app/shared/model/enumerations/type.model';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface IBounty {
  id?: number;
  summary?: string;
  description?: string;
  status?: Status;
  issueUrl?: string;
  amount?: number;
  experience?: Experience;
  commitment?: number;
  type?: Type;
  category?: Category;
  keywords?: string;
  permission?: boolean;
  expiryDate?: Date;
  fundings?: IFunding[];
  createdBy?: string;
  createdDate?: Date;
}

export const categoryOptions = [
  { key: 'F', text: 'Frontend', value: Category.FRONT_END },
  { key: 'B', text: 'Backend', value: Category.BACKEND },
  { key: 'T', text: 'This', value: Category.THIS }
];
export const typeOptions = [
  { key: 'B', text: 'Bug', value: Type.BUG },
  { key: 'F', text: 'Feature', value: Type.FEATURE },
  { key: 'I', text: 'Improvement', value: Type.IMPROVEMENT },
  { key: 'E', text: 'Ex', value: Type.EX }
];
export const experienceOptions = [
  { key: 'B', text: 'Beginner', value: Experience.BEGINNER },
  { key: 'I', text: 'Intermediate', value: Experience.INTERMEDIATE },
  { key: 'E', text: 'Experience', value: Experience.ADVANCED }
];
export const modeOptions = [
  { key: 'A', text: 'Mode A', value: 'Mode A' },
  { key: 'B', text: 'Mode B', value: 'Mode B' },
  { key: 'C', text: 'Mode C', value: 'Mode C' }
];

export const defaultValue: Readonly<IBounty> = {};
