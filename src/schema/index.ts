import {
  CircleCheckBig,
  Info,
  CircleHelp,
  SquareCheck,
  CircleX,
  CircleMinus,
} from "lucide-react";

export interface Student {
  id: string;
  name: string;
  sec_sit: string;
  student_id: string;
  year_of_studying: string;
  batch: string;
  section: string;
  register_num: string;
  department: string;
  email: string;
  phone_no: string;
  total_days_internship: number;
  placement_status: string;
  placed_company: string;
  profile_photo: string;
  mentor_name: string;
  skills: string[];
}

export interface Skill {
  id: string;
  skill: string;
  count: number;
}

export interface Staff {
  id: string;
  name: string;
  sec_sit: string;
  faculty_id: string;
  department: string;
  email: string;
  phone_no: string;
  profile_photo: string;
  roles: string[];
}

export interface Internship {
  id: string;
  registered_date: Date;
  company_name: string;
  company_address: string;
  company_ph_no: string;
  current_cgpa: string;
  cin_gst_udyog: string;
  cin_gst_udyog_no: string;
  sem: string;
  industry_supervisor_name: string;
  industry_supervisor_ph_no: string;
  industry_supervisor_email: string;
  mode_of_intern: string;
  starting_date: Date;
  ending_date: Date;
  no_of_days: number;
  location: string;
  domain: string;
  certificate: string;
  offer_letter: string;
  approval_status: string;
  internship_status: string;
  student_id: string;
  student: Student;
}

export const approvalStatuses = [
  {
    value: "Approved",
    label: "Approved",
    icon: CircleCheckBig,
  },
  {
    value: "Not Approved",
    label: "Not Approved",
    icon: Info,
  },
  {
    value: "Sent Back",
    label: "Sent Back",
    icon: CircleHelp,
  },
  {
    value: "Rejected",
    label: "Rejected",
    icon: CircleMinus,
  },
];
export const internshipStatuses = [
  {
    value: "Completed",
    label: "Completed",
    icon: SquareCheck,
  },
  {
    value: "Not Completed",
    label: "Not Completed",
    icon: CircleX,
  },
  {
    value: "Rejected",
    label: "Rejected",
    icon: CircleMinus,
  },
];
export const placement_statuses = [
  {
    value: "Placed",
    label: "Placed",
    icon: CircleCheckBig,
  },
  {
    value: "Not Placed",
    label: "Not Placed",
    icon: CircleX,
  },
];
export const noOfDays = [
  { value: 15, label: "15" },
  { value: 30, label: "30" },
  { value: 45, label: "45" },
];

export const sections = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "E", label: "E" },
];

export interface FileType {
  file: string;
  fileName: string;
}

export interface ApprovalStatus {
  id: string;
  mentor: boolean;
  internshipcoordinator: boolean;
  hod: boolean;
  tap_cell: boolean;
  principal: boolean;
  comments: string;
  internship_id: string;
  rejectedBy: string;
}

export const departmensts = [
  { label: "CSE", value: "cse" },
  { label: "IT", value: "it" },
];


export interface NotificationDetails {
  id: string
  message : string
  staff_id : string
  staff : string
  staff_name : string
  type : string
  toRoles : string[]
  date : Date
  year : string
  depts : string[]
}
