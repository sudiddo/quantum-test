export const ADD_USER_TOKEN = "ADD_USER_TOKEN";

export interface UserStateType {
  token: string | null;
  email: string;
}

interface AddTokenAction {
  type: typeof ADD_USER_TOKEN;
  payload: {
    token: string | null;
    email: string;
  };
}

export type UserActionTypes = AddTokenAction;
