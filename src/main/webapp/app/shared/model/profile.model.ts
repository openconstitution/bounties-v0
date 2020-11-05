export interface IProfile {
  id?: number;
  votes?: number;
  walletaddress?: string;
  about?: string;
  profilelink?: string;
  githubEmail?: string;
  githubOrgName?: string;
}

export const defaultValue: Readonly<IProfile> = {};
