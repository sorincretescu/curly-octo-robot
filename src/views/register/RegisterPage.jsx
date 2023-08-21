import axios from "axios";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Select from "@material-ui/core/Select";


const useStyles = makeStyles({
    register: {
        display: "flex",
        flexDirection: "column",
    },

    selectEmpty: {
        marginTop: 10,
        backgroundColor: "white",
        height: "40px",
        borderRadius: 4,
        paddingLeft: "10px",
        width: "150px",
    }
});

function RegisterPage() {

    const classes = useStyles();
    const { t, i18n } = useTranslation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
        }
        catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const handleChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className={classes.register}>
            <div className={classes.credentials}>
                <FormControl className={classes.formControl}>
                    <Select
                        className={classes.selectEmpty}
                        onChange={handleChangeLanguage}
                    >
                        <MenuItem value={"en"}>English</MenuItem>
                        <MenuItem value={"de"}>Deutsch</MenuItem>
                    </Select>
                </FormControl>
                <Input
                    value={username}
                    label={t("username")}
                    onChange={handleUsername}
                />
                <Input
                    value={password}
                    label={t("password")}
                    type="password"
                    onChange={handlePassword}
                />
                <Button text={t("register")} onClick={handleRegister} />

            </div>
        </div>
    )
};

export default RegisterPage;