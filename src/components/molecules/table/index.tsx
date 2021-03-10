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
}: any) => {
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
    <div className="flex flex-col justify-center items-center">
      <div className="my-5">
        Search
        <input
          className="border border-black ml-2 rounded-md p-1"
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
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
                          <img className="object-contain" src={cell.value} />
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
        <div className="flex w-full justify-between items-center px-5 border border-black">
          <div className="flex flex-row">
            <div className="mr-3">
              First Name
              <input
                className="border w-36 border-black ml-2 rounded-md p-1"
                type="text"
                value={firstName}
                onChange={(e) => onChangeFirstName(e.target.value)}
              />
            </div>
            <div>
              Last Name
              <input
                className="border w-36 border-black ml-2 rounded-md p-1"
                type="text"
                value={lastName}
                onChange={(e) => onChangeLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div
              onClick={onSave}
              className="bg-green-600 px-4 py-1 rounded-md mt-3 cursor-pointer text-white"
            >
              Save
            </div>
            <div
              onClick={onClose}
              className="text-red-600 cursor-pointer px-4 my-3"
            >
              Close
            </div>
          </div>
        </div>
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
            defaultValue={page + 1}
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
