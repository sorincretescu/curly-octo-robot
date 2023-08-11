import "./App.css";
import Todo from "./views/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login/LoginPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      // if (!authenticated) return navigate("/");
    };
    checkAuthentication();
  }, [authenticated]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginPage
                setAuthenticated={setAuthenticated}
                setLoggedInUsername={setLoggedInUsername}
              />
            }
          />
          <Route
            path="/todo"
            element={<Todo loggedInUsername={loggedInUsername} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
