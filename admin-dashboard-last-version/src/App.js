import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Applicants from "./pages/applicants";
import AuthWrapper from "./components/wrappers/current-admin";
import Layout from "./components/layout";
import IsAuthenticated from "./components/wrappers/is-authenticated";

function App() {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <IsAuthenticated>
                <Layout />
              </IsAuthenticated>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/applicants" element={<Applicants />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
