import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  gridPaper: {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(2),
    boxShadow: "-1px 1px 25px 0px rgba(0,0,0,.5)",
    margin: "16px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    minWidth: "40vw",
  },
  contentLeft: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    maxWidth: 255,
  },
  contentRight: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
  },
}));

const GridView = (props) => {
  const { handleDelete, handleEdit, todos } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <div className={classes.gridContainer}>
          {todos.map((todo, index) => (
            <Card
              key={index}
              priority={todo.priority}
              createdAt={todo.createdAt}
              description={todo.description}
              id={index}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              subtasks={todo.subtasks}
            />
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default GridView;
