import { IMyUser, IUser } from "../interfaces/interfaces";

type TSetToken = {
  type: "SET_TOKEN";
  newToken: string;
};

type TSetMyUser = {
  type: "SET_MY_USER";
  myUser: IMyUser;
};

type TSetUser = {
  type: "SET_USERS";
  users: IUser[];
};

type TRemoveUser = {
  type: "REMOVE_USER";
  user_id: string;
};

type TEditUser = {
  type: "EDIT_USER";
  user_id: string;
  user: IUser;
};

type TAddUser = {
  type: "ADD_USER";
  user: IUser;
};

export type TAction =
  | TSetToken
  | TSetMyUser
  | TSetUser
  | TRemoveUser
  | TEditUser
  | TAddUser;
