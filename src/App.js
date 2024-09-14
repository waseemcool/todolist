import logo from "./logo.svg";
import "./App.css";
import SignInForm from "./components/Auth/SignInForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Home from "./components/Home/Home";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signin"
              element={
                isLoggedIn === "true" ? <Navigate to="/" /> : <SignInForm />
              }
            />
            <Route
              path="/register"
              element={
                isLoggedIn === "true" ? <Navigate to="/" /> : <RegisterForm />
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
