// commons/zustandFiles/groupStore.ts
import { create } from 'zustand';

interface GroupStore {
  updatedGroup: boolean;
  updateGroup: (group: boolean) => void;
}

export const useGroupStore = create<GroupStore>((set) => ({
  updatedGroup: false,
  updateGroup: (group) => set({ updatedGroup: group })
}));