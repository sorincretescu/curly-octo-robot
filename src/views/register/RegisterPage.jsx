import axios from "axios";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Select from "@material-ui/core/Select";
import Modal from "@material-ui/core/Modal";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  register: {
    display: "flex",
    flexDirection: "column",
  },
  registerCredentials: {
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
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: "30%",
    left: "33% !important",
    top: "40% !important",
  },
  modalDiv: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
    width: "250px",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
});

function RegisterPage() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(true);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async () => {
    if (!username?.length || !password?.length) return;

    const user = {
      username: username,
      password: password,
    };

    try {
      await axios.post("http://localhost:5000/api/register", user);
      setOpenModal(true);
    }
    catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleStay = () => {
    setUsername("");
    setPassword("");
    setOpenModal(false);
  };


  return (
    <div className={classes.register}>
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

      <div className={classes.registerCredentials}>
        <Input
          value={username}
          label={t("Username")}
          onChange={handleUsername}
        />
        <Input
          value={password}
          label={t("Password")}
          type="password"
          onChange={handlePassword}
        />

        <Button text={t("Register")} onClick={handleRegister} />
      </div>
      <div classname>
        <Modal className={classes.modal}
          open={openModal}
          onClose={handleStay}
        >
          <div className={classes.modalDiv}>
            <Typography>{t("Do you want to login?")}</Typography>
            <br></br>
            <div>
              <Button text={t("Yes")} onClick={handleLogin} />
              <Button text={t("No")} onClick={handleStay} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default RegisterPage;
