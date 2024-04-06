
import { ApprovalStatus, Internship, Staff, Student } from "@/schema";
import { create } from "zustand";

export type ModalType = "rejectInternship" | "sendbackInternship";

interface ModalData {
  internship? :Internship
  student? :Student
  faculty? :Staff
  approval? :ApprovalStatus
  role? :string
  id? :string
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
