import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@/pages/login";
import { Providers } from "./providers/Provider";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Router>
      <Providers>
        <div className="grid place-items-center w-screen h-screen">
          <div className="md:min-h-[80%] md:min-w-[85%] w-full h-full grid place-items-center">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </Providers>
    </Router>
  );
}

export default App;
