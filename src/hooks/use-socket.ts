
import { create } from "zustand";

export type SocketType = "studentProfile" | "facultyProfile" | "internship" | "approval";


interface SocketStore {
  type: SocketType | null;
  onChange: (type: SocketType) => void;
  onClose: ()=>void;
}

export const useSocket = create<SocketStore>((set) => ({
  type: null,
  onChange: (type) => set({type}),
  onClose: () => set({type:null})
}));
