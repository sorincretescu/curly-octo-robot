import "./App.css";
import Todo from "./views/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login/LoginPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RegisterPage from "./views/register/RegisterPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuthentication = () => {
  //     if (!authenticated) return navigate("/login");
  //   };
  //   checkAuthentication();
  // }, [authenticated]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              setAuthenticated={setAuthenticated}
              setLoggedInUsername={setLoggedInUsername}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage />
          } />
        <Route
          path="/todo"
          element={<Todo loggedInUsername={loggedInUsername} />}
        />
      </Routes>
    </div>
  );
}

export default App;
