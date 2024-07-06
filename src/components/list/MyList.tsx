import React from "react";
import { IData } from "../../type/commonTypes";
import { setModalOpen } from "../common/pullstate/Store";
import { useDelStudent } from "../../services/api/StudentApis";
type IProps = {
  data: IData[];
  setObjEdit: Function;
  refetchList: Function;
};
export default function MyList(props: IProps) {
  const softDelete = useDelStudent();
  const onHover =
    "block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white focus:bg-blue-700 focus:border-b focus:border-gray-200 focus:rounded-t-lg focus:cursor-pointer focus:dark:bg-gray-800 focus:dark:border-gray-600 focus:text-white";
  const heading = ["id", "name", "category", "Email", "Mobile", "actions"];
  async function handleDelete(item: IData) {
    console.log(item, "delete item");
    const del = await softDelete.mutateAsync(item);
    props.refetchList();
  }
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {heading.map((item: string, index: number) => (
              <th scope="col" className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.length > 0 &&
            props.data.map((item, index: number) => (
              <React.Fragment key={index}>
                {!item.isDeleted && (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <React.Fragment key={index}>
                      <td className="px-6 py-4">{item._id}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.categoryId}</td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4">{item.mobile}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            props.setObjEdit(item);
                            setModalOpen(true);
                          }}
                        >
                          Edit
                        </button>
                        <button onClick={async () => await handleDelete(item)}>
                          Delete
                        </button>
                      </td>
                    </React.Fragment>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}
