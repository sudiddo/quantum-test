import { ADD_USER_TOKEN } from "store/types";

export function addUserToken(token: string | null) {
  return {
    type: ADD_USER_TOKEN,
    payload: {
      token,
    },
  };
}
