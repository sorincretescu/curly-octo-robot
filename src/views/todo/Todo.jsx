import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";


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
    minWidth: 150,
    height: '80px',
    alignContent:'center',

  },
  selectEmpty: {
    marginTop: 4,
    backgroundColor:'white',
    height:'90px',
  },
});

const Todo = () => {
  const classes = useStyles();

  const [DummyToDos, setDummyToDos] = useState([]);
  const [todos, setTodos] = useState([]);
  const [clonedTodos, setClonedTodos] = useState(todos);
  const [todoText, setTodoText] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then((response) => {setDummyToDos(response.data)
      setTodos(response.data)})
      .catch((error) => {console.log('Error fetching data:', error);

    });
  }, []);

  const handleAddTodo = () => {
    if (!todoText?.length) return;
    const newTodo = {
      priority: 1,
      creation_date: new Date().toISOString().split("T")[0],
      description: todoText,
    };
    setTodoText("");
    setTodos([...todos, newTodo]);
    setClonedTodos([...todos, newTodo]);
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
    const filteredPrioTodos = todos.filter(
      (todo) => todo.priority === selectedPriority
    );
    setTodos(filteredPrioTodos);
    setSelectedPriority(selectedPriority);
  };

  const uniquePriorities = [...new Set(todos.map((todo) => todo.priority))];

  const handleSortReset = () => {
    setTodos(clonedTodos);
    setSelectedPriority("");
    setSearchTerm("");
  };

  const handleSave = (description, priority) => {
    const newTodos = [...todos];
    newTodos[currentTodo].description = description;
    newTodos[currentTodo].priority = priority;
    setTodos(newTodos);
    setOpenEditModal(false);
    setCurrentTodo(null);
  };

  const handleAddNewSubtask = (subtask) => {
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
      <div className={classes.selectDropdown}>
        <FormControl className={classes.formControl}>
          <Select
            className={classes.selectEmpty}
            label='Priority'
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
      
      <Button 
        onClick={handleSortReset} 
        text="Reset" />
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
