import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@/pages/login";
import { Providers } from "@/providers/Provider";
import Dashboard from "@/pages/dashboard";
import AddInternshipPage from "@/pages/student/addInternship";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <Router>
      <Providers>
        <div className="grid place-items-center w-screen h-screen">
          <Navbar/>
          <div className="md:min-h-[80%] md:min-w-[85%] md:max-h-[80%] md:max-w-[85%] w-screen h-screen grid place-items-center">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/student/addInternship" element={<AddInternshipPage/>}>
              </Route>
            </Routes>
          </div>
        </div>
      </Providers>
    </Router>
  );
}

export default App;
