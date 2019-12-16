import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { IMyUser, IUser } from "../interfaces/interfaces";
import { myUserReducer } from "./myUserReducer";
import { usersReducer } from "./usersReducer";

export interface IGlobalState {
  token: string;
  myUser: IMyUser;
  users: IUser[];
}

export const reducers = combineReducers<IGlobalState>({
  token: tokenReducer,
  myUser: myUserReducer,
  users: usersReducer
});
