import { create } from 'zustand'


const useBearStore = create()((set) => ({
  project: "",
  setProject: (by: any) => set((state: any) => ({ bears: state.bears + by })),
}))

export default useBearStore;