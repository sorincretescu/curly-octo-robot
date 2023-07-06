import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "../Button";
import Input from "../Input";
import { Slide } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  priorityContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButton: {},
});

const Modal = (props) => {
  const { open, handleClose, todoDescription, handleSave, defaultPriority } =
    props;

  const [todoText, setTodoText] = useState(todoDescription);
  const [priority, setPriority] = useState(defaultPriority);

  const classes = useStyles();

  useEffect(() => {
    setTodoText(todoDescription);
    setPriority(defaultPriority);
  }, [todoDescription, defaultPriority]);

  const handleIncreasePriority = () => {
    if (priority === 10) return;
    setPriority(priority + 1);
  };

  const handleDecreasePriority = () => {
    if (priority === 1) return;
    setPriority(priority - 1);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"Edit your task/todo"}
      </DialogTitle>
      <DialogContent>
        <Input
          value={todoText}
          label="Todo description"
          onChange={(e) => setTodoText(e.target.value)}
          focused
        />
        <div className={classes.priorityContainer}>
          <RemoveCircleIcon onClick={handleDecreasePriority} />
          <span>{priority}</span>
          <AddCircleIcon onClick={handleIncreasePriority} />
        </div>
        <Input label="Add subtask" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} text="Cancel" />
        <Button onClick={handleClose} text="Add subtask" />
        <Button onClick={() => handleSave(todoText, priority)} text="Seidit" />
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
