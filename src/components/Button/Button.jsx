import ButtonBase from "@material-ui/core/Button";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "56px",
    margin: "8px",
    backgroundColor: "white",
  },
});

const Button = (props) => {
  const { text } = props;
  const classes = useStyles();
  return (
    <ButtonBase {...props} className={classes.root} variant="contained">
      {text}
    </ButtonBase>
  );
};

export default Button;
