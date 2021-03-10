import axios from "axios";

const PutUser = async (
  id: number,
  firstName: string,
  lastName: string
): Promise<{ first_name: string; last_name: string }> => {
  return axios
    .put(`https://reqres.in/api/users/${id}`, {
      first_name: firstName,
      last_name: lastName,
    })
    .then((result) => {
      console.log("result", result);
      return result.data;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default PutUser;
