import "./App.css";
import Todo from "./views/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login/LoginPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      if (!authenticated) return navigate("/");
    };
    checkAuthentication();
  }, [authenticated, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<LoginPage setAuthenticated={setAuthenticated} />}
        />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
