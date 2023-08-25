import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Box } from "@material-ui/core";

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
      color="text.primary"
      {...props}
    />
  );
};

export default Input;
