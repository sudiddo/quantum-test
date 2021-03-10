import axios from "axios";

export interface GetUserType {
  data: UserType[];
  page: number;
  total: number;
  total_pages: number;
}

export interface UserType {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

const GetUsers = async (page: number): Promise<GetUserType> => {
  return axios
    .get(`https://reqres.in/api/users?page=${page}&per_page=4&delay=5`)
    .then((result) => {
      console.log("res get users", result);
      const users = result.data;
      return users;
    })
    .catch((err) => {
      console.log("err get users", err);
    });
};

export default GetUsers;
