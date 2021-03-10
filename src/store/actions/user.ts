import { ADD_USER_TOKEN } from "store/types";

export function addUserToken(token: string | null, email: string) {
  return {
    type: ADD_USER_TOKEN,
    payload: {
      token,
      email,
    },
  };
}
