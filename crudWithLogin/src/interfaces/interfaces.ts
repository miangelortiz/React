export interface IUser {
  _id: string;
  username: string;
  isAdmin: boolean;
  email: string;
}

export interface IMyUser {
  exp?: number;
  iat?: number;
  id?: string;
  isAdmin?: boolean;
  username?: string;
}
