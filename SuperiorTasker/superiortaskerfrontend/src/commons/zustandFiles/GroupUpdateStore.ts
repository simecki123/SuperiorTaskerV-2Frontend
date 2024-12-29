// commons/zustandFiles/groupStore.ts
import { create } from 'zustand';
import { Group } from '@/app/interfaces/types';

interface GroupStore {
  updatedGroup: boolean;
  updateGroup: (group: boolean) => void;
}

export const useGroupStore = create<GroupStore>((set) => ({
  updatedGroup: false,
  updateGroup: (group) => set({ updatedGroup: group })
}));