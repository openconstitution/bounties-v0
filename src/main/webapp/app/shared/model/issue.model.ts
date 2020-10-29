export interface IIssue {
  id?: number;
  issueId?: string;
  url?: string;
  description?: string;
}

export const defaultValue: Readonly<IIssue> = {};
