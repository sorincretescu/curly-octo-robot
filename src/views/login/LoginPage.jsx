import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    padding: "8px",
  },
  loginCredentials: {
    maxHeight: "70vh",
    overflow: "auto",
  },
});

function LoginPage() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "test" && pass === "test") {
      navigate("/todo");
    } else {
      if (!pass.length) setErrorPass("Enter password.");
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
    if (e.target.value.length > 4) {
      setErrorPass("Password does not match");
    } else {
      setErrorPass("");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Enter your credentials</h1>
      </div>

      <div className={classes.loginCredentials}>
        <Input value={username} label="Username" onChange={handleUsername} />
        <Input
          value={pass}
          label="Password"
          type="password"
          onChange={handlePass}
          error={errorPass.length}
          helperText={errorPass}
        />

        <Button text="Log in" onClick={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
