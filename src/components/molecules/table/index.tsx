import { useForm } from "react-hook-form";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const Table = ({
  columns,
  data,
  page,
  goToPage,
  nextPage,
  previousPage,
  totalPage,
  isShowEditSection,
  firstName,
  lastName,
  onSave,
  onEdit,
  onChangeFirstName,
  onChangeLastName,
  onClose,
  onDelete,
  email,
  onLogout,
}: any) => {
  const { register, handleSubmit, errors } = useForm();

  const props = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = props;

  return (
    <div className="flex flex-col">
      <div className="my-5 flex flex-row justify-between">
        <div>
          Search
          <input
            className="border border-black ml-2 rounded-md p-1"
            type="text"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <div className="flex flex-row">
          <div className="font-bold">{email}</div>
          <div className="text-red-700 ml-3 cursor-pointer" onClick={onLogout}>
            logout
          </div>
        </div>
      </div>
      <table {...getTableProps()} className="border-black border">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup.id + "header"}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  key={column.id}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="h-30 w-40 p-1 border border-black"
                      key={cell.column.id + "row"}
                    >
                      <div className="flex justify-center items-center">
                        {cell.column.Header === "Profile Image" ? (
                          <img
                            alt={cell.value}
                            className="object-contain"
                            src={cell.value}
                          />
                        ) : cell.column.Header === "Options" ? (
                          <div>
                            <div
                              onClick={() => {
                                onEdit(row.original, row.index);
                              }}
                              className="my-1 text-white bg-green-400 cursor-pointer hover:opacity-75 w-20 h-8 rounded-md flex justify-center items-center"
                            >
                              Edit
                            </div>
                            <div
                              onClick={() => onDelete(row.original)}
                              className="text-white bg-red-600 cursor-pointer hover:opacity-75 w-20 h-8 rounded-md flex justify-center items-center"
                            >
                              Delete
                            </div>
                          </div>
                        ) : (
                          cell.render("Cell")
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isShowEditSection ? (
        <form onSubmit={handleSubmit(onSave)}>
          <div className="flex w-full flex-col  border border-black">
            <div className="flex justify-between flex-row items-center px-5 ">
              <div className="flex flex-row">
                <div className="mr-3 mt-3 flex flex-col justify-start items-start">
                  <div className="flex flex-row items-center">
                    <div>First name</div>
                    <input
                      className="border w-36 border-black ml-2 rounded-md p-1"
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={firstName}
                      onChange={(e) => onChangeFirstName(e.target.value)}
                      ref={register({
                        required: {
                          value: true,
                          message: "First name is required",
                        },
                        pattern: {
                          //eslint-disable-next-line
                          value: /^[A-Z]\S*[^0-9!@#\$%\^\&*\)\(+=._-]$/g,
                          message:
                            "Must start with capital, no numeric, no special character, no multi-word",
                        },
                      })}
                    />
                  </div>
                  <div className="mt-2">
                    {errors.first_name && (
                      <div className="text-red-700 font-bold text-left mb-5 w-64">
                        {errors.first_name.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mr-3 mt-3 flex flex-col justify-start items-start">
                  <div className="flex flex-row items-center">
                    <div>Last name</div>
                    <input
                      className="border w-36 border-black ml-2 rounded-md p-1"
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={lastName}
                      onChange={(e) => onChangeLastName(e.target.value)}
                      ref={register({
                        required: {
                          value: true,
                          message: "Last name is required",
                        },
                        pattern: {
                          //eslint-disable-next-line
                          value: /^[A-Z]\S*[^0-9!@#\$%\^\&*\)\(+=._-]$/g,
                          message:
                            "Must start with capital, no numeric, no special character, no multi-word",
                        },
                      })}
                    />
                  </div>
                  <div className="mt-2">
                    {errors.last_name && (
                      <div className="text-red-700 font-bold text-left mb-5 w-64">
                        {errors.last_name.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-col">
                <input
                  type="submit"
                  className="bg-green-600 px-4 py-1 rounded-md mt-3 cursor-pointer text-white"
                  value="Save"
                />

                <div
                  onClick={onClose}
                  className="text-red-600 cursor-pointer px-4 my-3"
                >
                  Close
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : null}
      <div className="mt-5 flex border border-black p-1">
        <button
          className={`w-7 mx-1 bg-gray-300 font-black border border-black ${
            page === 1 ? "opacity-30" : "hover:opacity-60"
          }`}
          onClick={() => goToPage(1)}
          disabled={page === 1}
        >
          {"<<"}
        </button>
        <button
          className={`w-7 mx-1 bg-gray-300 font-black border border-black ${
            page === 1 ? "opacity-30" : "hover:opacity-60"
          }`}
          onClick={() => previousPage()}
          disabled={page === 1}
        >
          {"<"}
        </button>
        <button
          className={`w-7 mx-1 bg-gray-300 font-black border border-black ${
            page === totalPage ? "opacity-30" : "hover:opacity-60"
          }`}
          onClick={() => nextPage()}
          disabled={page === totalPage}
        >
          {">"}
        </button>
        <button
          className={`w-7 mx-1 bg-gray-300 font-black border border-black ${
            page === totalPage ? "opacity-30" : "hover:opacity-60"
          }`}
          onClick={() => goToPage(totalPage)}
          disabled={page === totalPage}
        >
          {">>"}
        </button>
        <span>
          Page
          <strong>
            {page} of {totalPage}
          </strong>
        </span>
        <span>
          | Go to page:{" "}
          <input
            className="border border-black"
            type="number"
            defaultValue={page}
            onChange={(e) => {
              const page = Number(e.target.value);
              goToPage(page);
            }}
            max={totalPage}
            min={1}
          />
        </span>
      </div>
    </div>
  );
};
export default Table;
