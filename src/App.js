import "./App.css";
import Todo from "./views/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login/LoginPage";
import { useState } from "react";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LoginPage setAuthenticated={setAuthenticated} />}
          />
          <Route
            path="/todo"
            element={<Todo authenticated={authenticated} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
