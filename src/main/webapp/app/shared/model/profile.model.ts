export interface IProfile {
  id?: number;
  votes?: number;
  profilelink?: string;
  about?: string;
  walletaddress?: string;
  githubEmail?: string;
  githubOrgName?: string;
}

export const defaultValue: Readonly<IProfile> = {};
