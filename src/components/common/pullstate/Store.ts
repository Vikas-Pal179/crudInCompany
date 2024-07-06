import { Store } from "pullstate";
interface IStore {
  isModalOpen: boolean;
}
const initialStore: IStore = {
  isModalOpen: false,
};
export const store = new Store<IStore>(initialStore);

export function setModalOpen(value: boolean) {
  store.update((s) => {
    s.isModalOpen = value;
  });
}
