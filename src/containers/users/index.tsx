import DeleteUser from "api/deleteUser";
import GetUsers, { UserType } from "api/getUsers";
import PutUser from "api/putUser";
import Table from "components/molecules/table";
import { useEffect, useMemo, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isShowEditSection, setIsShowEditSection] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(0);
  const [editIndex, setEditIndex] = useState(0);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    GetUsers(1).then((list) => {
      console.log("list", list);
      setUsers(list.data);
      setTotalPage(list.total_pages);
      setPage(list.page);
      setIsloading(false);
    });
  }, []);

  const data = useMemo(() => {
    const colData: any[] = [];
    users.map((user) => {
      const data = {
        id: user.id,
        image: user.avatar,
        firstName: user.first_name,
        lastName: user.last_name,
      };
      colData.push(data);
    });
    return colData;
  }, [users]);

  const columns: any[] = useMemo(
    () => [
      {
        Header: "Profile Image",
        accessor: "image" as const, // accessor is the "key" in the data
      },
      {
        Header: "First Name",
        accessor: "firstName" as const,
      },
      {
        Header: "Last Name",
        accessor: "lastName" as const,
      },
      {
        Header: "Options",
        accessor: "options" as const,
      },
    ],
    []
  );

  const goToPage = (page: number) => {
    setIsloading(true);
    GetUsers(page).then((list) => {
      console.log("list", list);
      setUsers(list.data);
      setTotalPage(list.total_pages);
      setPage(list.page);
      setIsloading(false);
    });
  };

  const previousPage = () => {
    setIsloading(true);

    GetUsers(page - 1).then((list) => {
      console.log("list", list);
      setUsers(list.data);
      setTotalPage(list.total_pages);
      setPage(list.page);
      setIsloading(false);
    });
  };

  const nextPage = () => {
    setIsloading(true);
    GetUsers(page + 1).then((list) => {
      console.log("list", list);
      setUsers(list.data);
      setTotalPage(list.total_pages);
      setPage(list.page);
      setIsloading(false);
    });
  };

  const onEdit = (
    user: {
      firstName: string;
      id: number;
      lastName: string;
    },
    index: number
  ) => {
    console.log("index", user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUserId(user.id);
    setIsShowEditSection(true);
    setEditIndex(index);
  };

  const onSave = () => {
    PutUser(userId, firstName, lastName).then((result) => {
      const updateUsers = users.map((user) => {
        return { ...user };
      });
      updateUsers.find((user) => user.id == userId)!.first_name =
        result.first_name;
      updateUsers.find((user) => user.id == userId)!.last_name =
        result.last_name;
      setUsers(updateUsers);
      setIsShowEditSection(false);
    });
  };

  const onDelete = (user: {
    firstName: string;
    id: number;
    lastName: string;
  }) => {
    DeleteUser(user.id).then(() => {
      const updateUsers = users.map((user) => {
        return { ...user };
      });
      const index = updateUsers.findIndex(
        (updateUser) => user.id === updateUser.id
      );
      updateUsers.splice(index, 1);
      setUsers(updateUsers);
    });
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen ">
      {isLoading ? (
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-28 w-28"></div>
      ) : (
        <Table
          columns={columns}
          data={data}
          goToPage={goToPage}
          nextPage={nextPage}
          previousPage={previousPage}
          totalPage={totalPage}
          page={page}
          isShowEditSection={isShowEditSection}
          onEdit={onEdit}
          firstName={firstName}
          lastName={lastName}
          onChangeFirstName={(value: string) => setFirstName(value)}
          onChangeLastName={(value: string) => setLastName(value)}
          onClose={() => setIsShowEditSection(false)}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default Users;
