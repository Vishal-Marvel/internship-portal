import { create } from "zustand";

export type SocketType =
  | "studentProfile"
  | "facultyProfile"
  | "internship"
  | "approval"
  | "skills"
  | "mentee"
  | "staff"
  | "rows"
  | "fromMentor"
  | "toMentor"
  | "rowSelection";

interface SocketData {
  rows?: {};
  fromMentor?: string;
  toMentor?: string;
}

interface SocketStore {
  type: SocketType | null;
  onChange: (type: SocketType, data?: SocketData) => void;
  onClose: () => void;
  data: SocketData | null;
}

export const useSocket = create<SocketStore>((set) => ({
  type: null,
  data: {},
  onChange: (type, data = {}) => set({ type, data }),
  onClose: () => set({ type: null, data: {} }),
}));
