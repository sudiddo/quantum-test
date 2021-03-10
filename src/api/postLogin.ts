import axios from "axios";

const PostLogin = async (email: string, password: string) => {
  return axios
    .post("https://reqres.in/api/login?delay=5", { email, password })
    .then((result) => {
      const token: string = result.data.token;
      return { token, error: null };
    })
    .catch((err) => {
      console.log("err", err);
      return { token: null, error: "Account not found, please register" };
    });
};

export default PostLogin;
