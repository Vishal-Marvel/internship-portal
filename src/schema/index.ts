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
  total_days_internship: string;
  placement_status: string;
  placed_company: string;
  profile_photo: string;
  mentor_name: string;
  skills: string[];
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
  academic_year: string;
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
  student:string;
}

