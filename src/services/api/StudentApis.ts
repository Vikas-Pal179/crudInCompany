import axios from "axios";
import { useMutation, useQuery } from "react-query";
// import { config } from "../config/config";
import Utils from "./Utils";
import enums from "../../enums";

export function useStudentList() {
  return useQuery("student", async () => {
    const result = await axios.get(enums.path);
    return Utils.transformResult(result);
  });
}

export function useCreateStudent(postExecution?: (data?: any) => void) {
  return useMutation("createStudent", async (data: any) => {
    const { _id } = data;
    let result;
    if (_id) {
      result = await axios.put(enums.path + "updateStudent", data);
    } else {
      result = await axios.post(enums.path + "createStudent", data);
    }
    return result;
  });
}

export function useDelStudent(postExecution?: (data?: any) => void) {
  return useMutation("delStudent", async (data: any) => {
    const { _id } = data;
    const result = await axios.put(enums.path + "softDelStudent", data);
    return result;
  });
}
