export interface IProfile {
  id?: number;
  votes?: number;
  profilelink?: string;
  about?: string;
  walletaddress?: string;
  userId?: number;
  githubEmail?: string;
  githubOrgName?: string;
}

export class Profile implements IProfile {
  constructor(
    public id?: number,
    public votes?: number,
    public profilelink?: string,
    public about?: string,
    public walletaddress?: string,
    public userId?: number,
    public githubEmail?: string,
    public githubOrgName?: string
  ) {}
}
