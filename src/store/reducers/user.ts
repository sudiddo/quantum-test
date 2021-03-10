import { UserActionTypes, UserStateType } from "store/types";

const initialState: UserStateType = {
  token: null,
  email: "",
};

export function userReducer(state = initialState, action: UserActionTypes) {
  switch (action.type) {
    case "ADD_USER_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
}
