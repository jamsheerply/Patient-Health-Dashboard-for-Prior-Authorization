export interface IUser {
  _id?: string;
  username?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface IUserInitial {
  loading: boolean;
  user: IUser | null;
  //   users: IUser[] | null;
  error: string | boolean;
}
