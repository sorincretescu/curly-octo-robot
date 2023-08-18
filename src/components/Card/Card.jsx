import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMUI from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    boxShadow: "-1px 1px 25px 0px rgba(0,0,0,.5)",
    margin: "16px",
    borderRadius: "8px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
    alignSelf: "flex-end",
  },
  pos: {
    marginBottom: 12,
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
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: "8px",
    cursor: "pointer",
  },
});

const Card = (props) => {
  const {
    priority,
    createdAt,
    description,
    id,
    handleDelete,
    handleEdit,
    subtasks,
    expanded,
  } = props.item;

  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const { t } = useTranslation();

  const handleExpand = () => {
    setIsExpanded((prevExpended) => !prevExpended);
  };

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  return (
    <>
      <CardMUI className={classes.root}>
        <CardContent className={classes.cardContent}>
          <div className={classes.contentLeft}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {t("priority")} <i>{priority ?? t("noPriority")}</i>
            </Typography>
            <Typography variant="h5" component="h2">
              {t("todo")}
              <i>{id ?? t("noId")}</i>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {description ?? t("noDescription")}
            </Typography>
            <Accordion expanded={isExpanded} onChange={handleExpand}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {t("subtasks")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {subtasks?.length ? (
                  <ul>
                    {subtasks?.map((subtask, index) => (
                      <li key={index}>{subtask}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{t("noSubtasks")}</p>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
          <div className={classes.contentRight}>
            <Typography
              className={classes.date}
              color="textSecondary"
              gutterBottom
            >
              {t("creation_date")}:{" "}
              <i>{createdAt.split("T")[0] ?? t("noDate")}</i>
            </Typography>
            <div className={classes.actions}>
              <EditIcon
                aria-label={t("edit")}
                className={classes.icon}
                onClick={() => handleEdit(id)}
              />
              <DeleteForeverIcon
                aria-label={t("delete")}
                className={classes.icon}
                onClick={() => handleDelete(id)}
              />
            </div>
          </div>
        </CardContent>
      </CardMUI>
    </>
  );
};

export default Card;
