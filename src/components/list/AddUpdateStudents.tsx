import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { IData, IOptions } from "../../type/commonTypes";
import {
  useCreateStudent,
  useStudentList,
} from "../../services/api/StudentApis";
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    categoryId: yup
      .number()
      .positive()
      .integer()
      .required("categoryId is required"),
    email: yup
      .string()
      .email("Email is type string")
      .required("Email is required"),
    mobile: yup
      .string()
      .min(10, "Minimum 10 digit required")
      .max(10, "Maximum 10 digit required")
      .required("categoryId is required"),
  })
  .required();
type IProps = {
  setModalOpen: Function;
  objData?: any;
};
export default function AddUpdateStudents(props: IProps) {
  const addUpdateStudent = useCreateStudent();
  const studentList = useStudentList();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.objData,
  });
  const onSubmit = async (data: Partial<IData>) => {
    const newData = {
      ...data,
      mobile: Number(data?.mobile),
    };
    console.log(newData, "mewdata");
    const addStudent = await addUpdateStudent.mutateAsync(newData);

    props.setModalOpen(false);
    studentList.refetch();
  };
  function getError(fieldName: string) {
    const msg = errors?.[fieldName]?.message;
    return <p className="text-red-400">{msg as string}</p>;
  }
  const data = {
    name: "anil",
    categoryId: 1,
    email: "vanilgmail.com",
    mobile: 8780961986,
  };
  const inputName = [{ name: "name" }, { name: "email" }, { name: "mobile" }];
  const options: IOptions[] = [
    { value: 1, opt: "Bannana" },
    { value: 2, opt: "Apple" },
    { value: 3, opt: "Orange" },
    { value: 4, opt: "Mango" },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputName.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {item.name.toUpperCase()}
          </label>
          <input
            {...register(item.name)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p>{getError(item.name)}</p>
        </React.Fragment>
      ))}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {"CATEGORY"}
        </label>
        <select
          {...register("categoryId")}
          id=""
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {options.map((item, index: number) => (
            <React.Fragment key={index}>
              <option value={item.value}>{item.opt}</option>
            </React.Fragment>
          ))}
        </select>
        <p>{getError("categoryId")}</p>
      </div>

      <button
        type="submit"
        className="mt-10 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        ADD STUDENTS
      </button>
    </form>
  );
}
