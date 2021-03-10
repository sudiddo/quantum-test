import axios from "axios";

const PostRegister = async (email: string, password: string) => {
  return axios
    .post("https://reqres.in/api/register", { email, password })
    .then((result) => {
      const token: string = result.data.token;
      return { token, error: null };
    })
    .catch((err) => {
      console.log("err", err, email, password);
      return { token: null, error: "Failed to create account" };
    });
};

export default PostRegister;
