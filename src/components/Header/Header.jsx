import { useTranslation } from "react-i18next";
import Button from "../../components/Button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isTodoPage = location.pathname === "/todo";

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      {isLoginPage && <Button text={t("Register")} onClick={handleRegister} />}
      {isRegisterPage && (
        <Button text={t("Home page")} onClick={handleLogout} />
      )}
      {isTodoPage && <Button text={t("Log out")} onClick={handleLogout} />}
    </div>
  );
};

export default Header;
