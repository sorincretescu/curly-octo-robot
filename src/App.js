import "./App.css";
import Todo from "./views/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./views/login/LoginPage";
import Header from "./components/Header/Header";
import { useMemo, useState } from "react";
import RegisterPage from "./views/register/RegisterPage";
import { CssBaseline, ThemeProvider, createTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState("");

  const [mode, setMode] = useState("light");

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: grey[900],
            },

            divider: "#afafaf",
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            primary: {
              main: "#ffffff",
            },

            background: {
              default: grey[900],
              paper: "#898989",
            },

            text: {
              primary: "#fff",
              secondary: "#fff",
            },
          }),
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const toggleTheme = () => {
    setMode((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline> </CssBaseline>
      <div className="App" id={mode}>
        <Header onChangeTheme={toggleTheme} checked={mode === "dark"} />
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
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/todo"
            element={<Todo loggedInUsername={loggedInUsername} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
