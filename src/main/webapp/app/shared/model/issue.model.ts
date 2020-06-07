export interface IIssue {
  id?: number;
  issueId?: string;
  url?: string;
  description?: string;
}

export class Issue implements IIssue {
  constructor(public id?: number, public issueId?: string, public url?: string, public description?: string) {}
}
