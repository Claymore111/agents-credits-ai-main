import LandingPage from "./pages/landing-page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ApplyPage from "./pages/apply-page";
import Login from "./pages/login";
import Register from "./pages/register";
import IsAuthenticated from "./components/is-authenticated";
import CurrentUser from "./components/current-user";

function App() {
  return (
    <div className="App">
      <CurrentUser>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/apply"
              element={
                <IsAuthenticated>
                  <ApplyPage />
                </IsAuthenticated>
              }
            />
          </Routes>
        </Router>
      </CurrentUser>
    </div>
  );
}

export default App;
