import React, { useState } from "react";
import Card from "../../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  selectDropdown: {
    margin: 16,
    display: 'flex',

  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 4,
  },
});

const Todo = () => {
  const classes = useStyles();

  const [todos, setTodos] = useState(DummyToDos);
  const [todoText, setTodoText] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortedTodos, setSortedTodos] = useState([]);

  const handleAddTodo = () => {
    if (!todoText?.length) return;
    const newTodo = {
      priority: 1,
      creation_date: new Date().toISOString().split("T")[0],
      description: todoText,
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

  const handlePrioritySort = (event) => {
    const selectedPriority = event.target.value;
    const filteredTodos = todos.filter((todo) =>
      todo.priority === selectedPriority);
    setSortedTodos(filteredTodos);
    setSelectedPriority(selectedPriority);
  }

  const uniquePriorities = [...new Set(todos.map((todo) => todo.priority))];

  const handleSortReset = () => {
    setTodos(DummyToDos);
    setSortedTodos([]);
    setSelectedPriority("");
  }

  const handleSave = (description, priority) => {
    const newTodos = [...todos];
    newTodos[currentTodo].description = description;
    newTodos[currentTodo].priority = priority;
    setTodos(newTodos);
    setOpenEditModal(false);
    setCurrentTodo(null);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Input value={todoText} onChange={(e) => setTodoText(e.target.value)} />
        <Button onClick={() => handleAddTodo()} text="Add Todo" />
      </div>
      <div className={classes.selectDropdown}>
        <FormControl className={classes.formControl}>
          <InputLabel >Priority</InputLabel>
          <Select
            className={classes.selectEmpty}
            value={selectedPriority}
            onChange={handlePrioritySort}
          > {
              todos.length > 0 &&
              uniquePriorities.map((priority) => (
                <MenuItem key={priority} value={priority} >
                  {priority}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button onClick={handleSortReset} text="Reset" />

      </div>
      <div className={classes.cardsContainer}>
        {selectedPriority === "" ? (
          todos.length > 0 ? (
            todos.map((todo, index) => (
              <Card
                key={index}
                item={{
                  ...todo,
                  id: index,
                  handleEdit: handleEditTodo,
                  handleDelete: handleDeleteTodo,
                }}
              />
            ))
          ) : ("")

        ) : sortedTodos.length > 0 ? (
          sortedTodos.map((todo, index) => (
            <Card
              key={index}
              item={{
                ...todo,
                id: index,
                handleEdit: handleEditTodo,
                handleDelete: handleDeleteTodo,
              }}
            />
          ))
        ) : ("")}

      </div>
      <Modal
        todoDescription={todos[currentTodo]?.description ?? ""}
        defaultPriority={todos[currentTodo]?.priority ?? 1}
        open={openEditModal}
        handleClose={handleCloseEditModal}
        handleSave={handleSave}
      />
    </div>
  );
};

export default Todo;
