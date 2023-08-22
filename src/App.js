import "./App.css";
import Todo from "./views/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login/LoginPage";
import Header from "./components/Header/Header";
import { useState } from "react";
import RegisterPage from "./views/register/RegisterPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
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
