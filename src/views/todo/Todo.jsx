import React, { useState } from "react";
import Card from "../../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const DummyToDos = [
  {
    priority: 1,
    creation_date: "2021-01-01",
    description: "This is a description",
    subtasks: ["Subtask 1", "Subtask 2", "Subtask 3", "Subtask 4", "Subtask 5"],
  },
  {
    priority: 2,
    creation_date: "2021-01-02",
    description: "This is a description",
  },
  {
    priority: 3,
    creation_date: "2021-01-03",
    description: "This is a description",
    subtasks: [
      "Subtask 2.1",
      "Subtask 2",
      "Subtask 3",
      "Subtask 4",
      "Subtask 5",
    ],
  },
  {
    priority: 4,
    creation_date: "2021-01-04",
    description: "This is a description",
  },
];

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    padding: "8px",
  },
  cardsContainer: {
    maxHeight: "70vh",
    overflow: "auto",
  },
});

const Todo = () => {
  const classes = useStyles();

  const [todos, setTodos] = useState(DummyToDos);
  const [todoText, setTodoText] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [expandedSubtasks, setExpandedSubtasks] = useState([]);

  const handleAddTodo = () => {
    if (!todoText?.length) return;
    const newTodo = {
      priority: 1,
      creation_date: new Date().toISOString().split("T")[0],
      description: todoText,
      subtasks: [],
    };
    setTodoText("");
    setTodos([...todos, newTodo]);
  };

  const handleEditTodo = (id) => {
    setCurrentTodo(id);
    setOpenEditModal(true);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo, index) => index !== id));
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleSave = (description, priority, editedSubtasks) => {
    const newTodos = [...todos];
    newTodos[currentTodo] = {priority, description, subtasks: editedSubtasks}
    setTodos(newTodos);
    setOpenEditModal(false);
    setCurrentTodo(null);
    setExpandedSubtasks((prevExpandedSubtasks) => {
      if(!prevExpandedSubtasks.includes(currentTodo)) {
        return [...prevExpandedSubtasks, currentTodo];
      }
      return prevExpandedSubtasks;
    })
  };

  const handleAddNewSubtask = (subtask) => {
    console.log("Subtask: ", subtask)
    const newTodos = [...todos];
    if (!newTodos[currentTodo]?.subtasks?.length) {
      newTodos[currentTodo].subtasks = [];
      newTodos[currentTodo].subtasks.push(subtask);
    } else {
      newTodos[currentTodo].subtasks.push(subtask);
    }
    setTodos(newTodos);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Input
          value={todoText}
          label="Todo description"
          onChange={(e) => setTodoText(e.target.value)}
        />
        <Button onClick={() => handleAddTodo()} text="Add Todo" />
      </div>
      <div className={classes.cardsContainer}>
        {todos.map((todo, index) => (
          <Card
            key={index}
            item={{
              ...todo,
              id: index,
              handleEdit: handleEditTodo,
              handleDelete: handleDeleteTodo,
              expanded: expandedSubtasks.includes(index),
            }}
          />
        ))}
      </div>
      <Modal
        todoDescription={todos[currentTodo]?.description ?? ""}
        defaultPriority={todos[currentTodo]?.priority ?? 1}
        subtasks={todos[currentTodo]?.subtasks ?? []}
        open={openEditModal}
        handleClose={handleCloseEditModal}
        handleSave={handleSave}
        handleAddNewSubtask={handleAddNewSubtask}
      />
    </div>
  );
};

export default Todo;
