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
  const [pass, setPass] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "test" && pass === "test") {
      setAuthenticated(true);
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
        />
        <Input
          value={pass}
          label={t("password")}
          type="password"
          onChange={handlePass}
          error={errorPass.length}
          helperText={errorPass}
        />

        <Button text={t("logIn")} onClick={handleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
