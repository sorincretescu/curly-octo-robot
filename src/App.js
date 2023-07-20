import "./App.css";
import Todo from "./views/todo/Todo";
import { useEffect } from "react";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuthentication = () => {
  //     if (!authenticated) return navigate("/");
  //   };
  //   checkAuthentication();
  // }, [authenticated, navigate]);

  return (
    <div className="App">
      <Todo/>
    </div>
  );
}

export default App;
