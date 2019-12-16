import { ActionCreator } from "redux";
import { TAction } from "./actionTypes";
import { IMyUser, IUser } from "../interfaces/interfaces";

export const setToken: ActionCreator<TAction> = (newToken: string) => ({
  type: "SET_TOKEN",
  newToken
});

export const setMyUser: ActionCreator<TAction> = (myUser: IMyUser) => ({
  type: "SET_MY_USER",
  myUser
});

export const setUsers : ActionCreator<TAction> = (users: IUser[]) =>({
  type:"SET_USERS",
  users
})

export const removeUser: ActionCreator<TAction> = (user_id: string) => ({
  type:"REMOVE_USER",
  user_id
})

export const editUser: ActionCreator<TAction> = (user_id: string, user:IUser) => ({
  type:"EDIT_USER",
  user_id,
  user
})

export const addNewUser : ActionCreator<TAction> = (user: IUser) =>({
  type:"ADD_USER",
  user
})

