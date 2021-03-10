import axios from "axios";

const DeleteUser = async (
  id: number
): Promise<{ first_name: string; last_name: string }> => {
  return axios
    .delete(`https://reqres.in/api/users/${id}`)
    .then((result) => {
      console.log("result", result);
      return result.data;
    })
    .catch((err) => {
      console.log("err", err);
    });
};

export default DeleteUser;
