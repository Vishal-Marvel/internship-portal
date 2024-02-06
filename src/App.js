import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Faculty_Broadcast from "./pages/Faculty-Broadcast";
import Faculty_Changementee from "./pages/Faculty-Changementee";
import Faculty_Facultydetailsupload from "./pages/Faculty-Facultydetailsupload";
import Faculty_facultylist_menteedetails from "./pages/Faculty-facultylist-menteedetails";
import Faculty_facultylist from "./pages/Faculty-facultylist";
import Faculty_Menteelist from "./pages/Faculty-Menteelist";
import Faculty_Registerinternmentee from "./pages/Faculty-Registerinternmentee";
import Faculty_Studentlist from "./pages/Faculty-Studentlist";
import Faculty_Viewmentee from "./pages/Faculty-Viewmentee";
import Faculty_Viewstudentinternship from "./pages/Faculty-Viewstudentinternship";
import Faculty_Viewstudentregister from "./pages/Faculty-Viewstudentregister";
import Main_Login from "./pages/Main-Login";
import Overlay_ForgotPassword from "./pages/Overlay-ForgotPassword";
import Overlay_ForgotPasswordForm from "./pages/Overlay-ForgotPasswordForm";
import Overlay_OTPVerification from "./pages/Overlay-OTPVerification";
import Overlay_ResetPassword from "./pages/Overlay-ResetPassword";
import Student_Internshipreg from "./pages/Student-Internshipreg";
import Student_Internshipstatus from "./pages/Student-Internshipstatus";
import Student_Landingpage from "./pages/Student-Landingpage";
import Student_Registration from "./pages/Student-Registration";
import Student_Updateinternship from "./pages/Student-Updateinternship";
import Student_Viewinternshipregister from "./pages/Student-Viewinternshipregister";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main_Login/>}>
        <Route index element={<Main_Login/>} />
        <Route path="Faculty_Broadcast" element={<Faculty_Broadcast />} />
        <Route path="Faculty_Changementee" element={<Faculty_Changementee />} />
        <Route path="Faculty_Facultydetailsupload" element={<Faculty_Facultydetailsupload />} />
        <Route path="Faculty_Menteelist" element={<Faculty_Menteelist />} />
        <Route path="Faculty_Registerinternmentee" element={<Faculty_Registerinternmentee />} />
        <Route path="Faculty_Studentlist" element={<Faculty_Studentlist />} />
        <Route path="Faculty_Viewmentee" element={<Faculty_Viewmentee />} />
        <Route path="Faculty_Viewstudentinternship" element={<Faculty_Viewstudentinternship />} />
        <Route path="Faculty_Viewstudentregister" element={<Faculty_Viewstudentregister />} />
        <Route path="Faculty_facultylist" element={<Faculty_facultylist />} />
        <Route path="Faculty_facultylist_menteedetails" element={<Faculty_facultylist_menteedetails />} />
        <Route path="Student_Internshipreg" element={<Student_Internshipreg />} />
        <Route path="Student_Internshipstatus" element={<Student_Internshipstatus />} />
        <Route path="Student_Landingpage" element={<Student_Landingpage />} />
        <Route path="Student_Registration" element={<Student_Registration />} />
        <Route path="Student_Updateinternship" element={<Student_Updateinternship />} />
        <Route path="Student_Viewinternshipregister" element={<Student_Viewinternshipregister />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

