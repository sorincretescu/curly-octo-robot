import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  textField: {
    margin: "8px",
    borderRadius: "8px",
    flex: 1,
    minWidth: "355px",
  },
}));

const Input = (props) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textField}
      id="outlined-basic"
      variant="outlined"
      {...props}
    />
  );
};

export default Input;
