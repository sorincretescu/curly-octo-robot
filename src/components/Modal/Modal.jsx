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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      <DialogTitle id="alert-dialog-slide-title">{t("edit_modal")}</DialogTitle>
      <DialogContent>
        <Input
          value={todoText}
          label={t("todo_description")}
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
            label={t("subtasks")}
            onChange={(e) => handleSubtasksChange(index, e.target.value)}
          />
        ))}

        <Input
          value={newSubtaskText}
          label={t("addSubtask")}
          onChange={(e) => setNewSubtaskText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} text={t("btn_cancel")} />
        <Button
          onClick={() => {
            handleAddNewSubtask(newSubtaskText);
            setNewSubtaskText("");
          }}
          text={t("addSubtask")}
        />
        <Button onClick={handleSaveClick} text={t("btn_edit")} />
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
