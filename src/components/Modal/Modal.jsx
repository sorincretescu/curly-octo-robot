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
});

const Modal = (props) => {
  const {
    open,
    handleClose,
    todoDescription,
    handleSave,
    defaultPriority,
    handleAddNewSubtask,
    subtasks,
  } = props;

  const [todoText, setTodoText] = useState(todoDescription);
  const [priority, setPriority] = useState(defaultPriority);
  const [subtaskText, setSubtaskText] = useState(subtasks);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  const classes = useStyles();

  useEffect(() => {
    setTodoText(todoDescription);
    setPriority(defaultPriority);
    setSubtaskText(subtasks);
  }, [todoDescription, defaultPriority, subtasks]);

  const handleIncreasePriority = () => {
    if (priority === 10) return;
    setPriority(priority + 1);
  };

  const handleDecreasePriority = () => {
    if (priority === 1) return;
    setPriority(priority - 1);
  };

  const handleSubtasksChange = (index, value) => {
    setSubtaskText(
      subtaskText.map((subtask, i) => (i === index ? value : subtask))
    );
  };

  const handleSaveClick = () => {
    const updatedSubtasks = subtaskText.filter((subtask) => subtask !== "");
    handleSave(todoText, priority, updatedSubtasks);
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

        {subtasks?.map((subtask, index) => (
          <Input
            key={index}
            value={subtaskText[index]}
            label="Subtasks"
            onChange={(e) => handleSubtasksChange(index, e.target.value)}
          />
        ))}

        <Input
          value={newSubtaskText}
          label="Add subtask"
          onChange={(e) => setNewSubtaskText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} text="Cancel" />
        <Button
          onClick={() => {
            handleAddNewSubtask(newSubtaskText);
            setNewSubtaskText("");
          }}
          text="Add subtask"
        />
        <Button onClick={handleSaveClick} text="Seidit" />
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
