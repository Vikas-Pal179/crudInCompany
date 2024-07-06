import React from "react";
import { setModalOpen, store } from "./components/common/pullstate/Store";
import MyList from "./components/list/MyList";
import MyModal from "./components/modal/MyModal";
import { useStudentList } from "./services/api/StudentApis";
import { IData } from "./type/commonTypes";

export default function App() {
  const openModal = store.useState((s) => s.isModalOpen);
  const studentList = useStudentList();
  const [isObjEdit, setObjEdit] = React.useState<IData | undefined>(undefined);
  if (studentList.isLoading) return <p>Loading</p>;
  function refetchList() {
    return studentList.refetch();
  }
  return (
    <div>
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        onClick={() => setModalOpen(true)}
      >
        ADD STUDENTS
      </button>
      <MyList
        data={studentList.data.data}
        setObjEdit={setObjEdit}
        refetchList={refetchList}
      />
      <MyModal
        isOpen={openModal}
        setOpen={() => {
          setObjEdit(undefined);
          setModalOpen(false);
        }}
        isObjEdit={isObjEdit}
      />
    </div>
  );
}
