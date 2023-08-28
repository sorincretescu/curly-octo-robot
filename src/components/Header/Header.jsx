import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";

const Header = ({ checked, onChangeTheme }) => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isTodoPage = location.pathname === "/todo";

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    setOpen(false);
    navigate("/login");
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={checked}
              onChange={onChangeTheme}
              aria-label="login switch"
            />
          }
          label={checked ? t("Dark mode") : t("Light mode")}
        />
      </FormGroup>

      {isLoginPage && <Button text={t("Register")} onClick={handleRegister} />}
      {isRegisterPage && (
        <Button text={t("Home page")} onClick={handleLogout} />
      )}
      {isTodoPage && <Button text={t("Log out")} onClick={handleOpen} />}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t("Are you sure you want to log out?")}
        </DialogTitle>

        <DialogActions>
          <Button text={t("Yes")} onClick={handleLogout}></Button>
          <Button text={t("No")} onClick={handleClose}></Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Header;
