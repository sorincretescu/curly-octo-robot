import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

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
  selectEmpty: {
    marginTop: 10,
    backgroundColor: "white",
    height: "40px",
    borderRadius: 4,
    paddingLeft: "10px",
    width: "150px",
  },
  formControl: {
    minWidth: 150,
    height: "80px",
    marginLeft: "10px",
  },
});

function LoginPage({ setAuthenticated }) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorCredentials, setErrorCredentials] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorCredentials("Enter username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setAuthenticated(true);
        navigate("/todo");
      } else {
        setErrorCredentials("Invalid credentials");
      }
    } catch (error) {
      setErrorCredentials("Error occured during login");
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.selectDropdown}>
        <FormControl className={classes.formControl}>
          <Select
            className={classes.selectEmpty}
            onChange={handleChangeLanguage}
          >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"de"}>Deutsch</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.header}>
        <h1>{t("credentials")}</h1>
      </div>

      <div className={classes.loginCredentials}>
        <Input
          value={username}
          label={t("username")}
          onChange={handleUsername}
          error={errorCredentials.length}
          helperText={errorCredentials}
        />
        <Input
          value={password}
          label={t("password")}
          type="password"
          onChange={handlePassword}
          error={errorCredentials.length}
          helperText={errorCredentials}
        />

        <Button text={t("logIn")} onClick={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
