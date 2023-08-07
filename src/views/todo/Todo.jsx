import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import SearchBar from "../../components/SearchBar";

import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

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
  formControl: {
    minWidth: 150,
    height: "80px",
  },
  selectEmpty: {
    marginTop: 10,
    backgroundColor: "white",
    height: "54px",
    borderRadius: 4,
    paddingLeft: "10px",
  },
  selectLanguage: {
    marginTop: 10,
    backgroundColor: "white",
    height: "40px",
    borderRadius: 4,
    marginLeft: "14px",
    width: "150px",
    paddingLeft: "10px",
  },
  searchAndFilter: {
    display: "flex",
    marginLeft: "10px",
  },
});

const Todo = ({ loggedInUsername }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [todos, setTodos] = useState([]);
  const [clonedTodos, setClonedTodos] = useState(todos);
  const [todoText, setTodoText] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [expandedSubtasks, setExpandedSubtasks] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos", {
        params: { username: loggedInUsername }, // Pass the username as a query parameter
      })
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [loggedInUsername]);

  const handleAddTodo = () => {
    if (!todoText?.length) return;

    const newtodo = {
      priority: 1,
      description: todoText,
      subtasks: [],
    };

    axios
      .post("http://localhost:5000/api/todos", newtodo)
      .then(() => {
        axios
          .get("http://localhost:5000/api/todos")
          .then((response) => {
            setTodoText("");
            setTodos(response.data);
          })
          .catch((error) => {
            console.log("Error fetching data:", error);
          });
      })
      .catch((error) => {
        console.log("Error adding todo:", error);
      });
  };

  const handleEditTodo = (id) => {
    setCurrentTodo(id);
    setOpenEditModal(true);
  };

  const deleteTodoById = (_id) => {
    return axios.delete(`http://localhost:5000/api/todos/${_id}`);
  };

  const handleDeleteTodo = (id) => {
    const deletedTodo = todos[id]._id;
    deleteTodoById(deletedTodo)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== deletedTodo));
      })
      .catch((error) => {
        console.error("Error deleting todo: ", error);
      });
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handlePrioritySort = (event) => {
    const selectedPriority = event.target.value;
    const filteredPrioTodos = todos.filter(
      (todo) => todo.priority === selectedPriority
    );
    setTodos(filteredPrioTodos);
    setSelectedPriority(selectedPriority);
  };

  const uniquePriorities = [...new Set(todos.map((todo) => todo.priority))];

  const handleSortReset = () => {
    axios
      .get("http://localhost:5000/api/todos", {
        params: { username: loggedInUsername },
      })
      .then((response) => {
        setTodos(response.data);
        setSelectedPriority("");
        setSearchTerm("");
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const searchedTodoList = clonedTodos.filter((todo) => {
      const searchInTasks = todo.description
        .toLowerCase()
        .includes(term.toLowerCase());
      const searchInSubtasks = todo.subtasks?.some((subtask) =>
        subtask.toLowerCase().includes(term.toLowerCase())
      );
      return searchInTasks || searchInSubtasks;
    });
    setTodos(searchedTodoList);
  };

  const updateTodoById = (_id, updatedTodo) => {
    return axios.put(`http://localhost:5000/api/todos/${_id}`, updatedTodo);
  };

  const handleSave = (description, priority, subtasks) => {
    const updatedTodo = {
      ...todos[currentTodo],
      priority,
      description,
      subtasks,
    };

    const updatedTodoId = todos[currentTodo]?._id;

    const newTodos = [...todos];
    newTodos[currentTodo] = { ...updatedTodo };
    setTodos(newTodos);

    updateTodoById(updatedTodoId, updatedTodo)
      .then((response) => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === updatedTodoId) {
            return response.data;
          }
          return todo;
        });
        setTodos(updatedTodos);
        setOpenEditModal(false);
        setCurrentTodo(null);
        setExpandedSubtasks((prevExpandedSubtasks) => {
          if (!prevExpandedSubtasks.includes(currentTodo)) {
            return [...prevExpandedSubtasks, currentTodo];
          }
          return prevExpandedSubtasks;
        });
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleAddNewSubtask = (subtask) => {
    console.log("Subtask: ", subtask);
    const newTodos = [...todos];
    if (!newTodos[currentTodo]?.subtasks?.length) {
      newTodos[currentTodo].subtasks = [];
      newTodos[currentTodo].subtasks.push(subtask);
    } else {
      newTodos[currentTodo].subtasks.push(subtask);
    }
    setTodos(newTodos);
  };

  const handleChangeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.selectDropdown}>
        <FormControl className={classes.formControl}>
          <Select
            className={classes.selectLanguage}
            onChange={handleChangeLanguage}
          >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"de"}>Deutsch</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.header}>
        <Input
          value={todoText}
          label={t("todo_description")}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <Button onClick={() => handleAddTodo()} text={t("btn_addTodo")} />
      </div>

      <div className={classes.searchAndFilter}>
        <div>
          <SearchBar
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            label={t("searchInput")}
          />
        </div>
        <div className={classes.selectDropdown}>
          <FormControl className={classes.formControl} label="Priority">
            <Select
              className={classes.selectEmpty}
              label="Priority"
              value={selectedPriority}
              onChange={handlePrioritySort}
            >
              {todos.length > 0 &&
                uniquePriorities.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button onClick={handleSortReset} text={t("btn_reset")} />
        </div>
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
            }}
          />
        ))}
      </div>
      <Modal
        _id={todos[currentTodo]?._id ?? null}
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
