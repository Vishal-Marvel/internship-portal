export interface Student {
  id: string;
  name: string;
  sec_sit: string;
  student_id: string;
  year_of_studying: string;
  batch:string;
  section:string;
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

export interface Internship {
company_name: string;
    company_address: string;
    company_ph_no: string;
    cin_gst_udyog: string;
    cin_gst_udyog_no:string;
    industry_supervisor_name: string;
    industry_supervisor_ph_no: string;
    industry_supervisor_email:string;
    current_cgpa: string;
    academic_year: string;
    mode_of_intern: string;
    starting_date: string;
    no_of_days: string;
    location: string;
    domain: string[];
    file:
}
