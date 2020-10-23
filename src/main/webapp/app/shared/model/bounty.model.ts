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
  { label: 'Frontend', value: Category.FRONT_END },
  { label: 'Backend', value: Category.BACKEND },
  { label: 'This', value: Category.THIS }
];
export const typeOptions = [
  { label: 'Bug', value: Type.BUG },
  { label: 'Feature', value: Type.FEATURE },
  { label: 'Improvement', value: Type.IMPROVEMENT },
  { label: 'Ex', value: Type.EX }
];
export const experienceOptions = [
  { label: 'Beginner', value: Experience.BEGINNER },
  { label: 'Intermediate', value: Experience.INTERMEDIATE },
  { label: 'Experience', value: Experience.ADVANCED }
];
export const modeOptions = [
  { label: 'Mode A', value: 'Mode A' },
  { label: 'Mode B', value: 'Mode B' },
  { label: 'Mode C', value: 'Mode C' }
];

export const defaultValue: Readonly<IBounty> = {
  permission: false,
};
