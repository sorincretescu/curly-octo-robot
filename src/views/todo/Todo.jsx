import React, { useState } from "react";
import Card from "../../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Input from "../../components/Input";
import Button from "../../components/Button";

const DummyToDos = [
  {
    priority: 1,
    creation_date: "2021-01-01",
    description: "This is a description",
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

  const handleAddTodo = () => {
    console.log("test", todoText);
    if (!todoText?.length) return;
    const newTodo = {
      priority: 1,
      creation_date: new Date().toISOString().split("T")[0],
      description: todoText,
    };
    setTodos([...todos, newTodo]);
  };

  const handleEditTodo = (id) => {
    console.log("Edit todo", id);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo, index) => index !== id));
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Input onChange={(e) => setTodoText(e.target.value)} />
        <Button onClick={() => handleAddTodo()} />
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
            // handleEdit={(id) => handleEditTodo(id)}
            // handleDelete={(id) => handleDeleteTodo(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
