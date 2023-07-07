import "./App.css";
import Todo from "./views/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
