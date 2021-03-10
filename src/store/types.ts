export const ADD_USER_TOKEN = "ADD_USER_TOKEN";

export interface UserStateType {
  token: string | null;
}

interface AddTokenAction {
  type: typeof ADD_USER_TOKEN;
  payload: {
    token: string | null;
  };
}

export type UserActionTypes = AddTokenAction;
