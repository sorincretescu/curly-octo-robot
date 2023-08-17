import Button from "../../components/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
  },
});

const Header = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Button text={props.text} onClick={props.onClick} />
    </div>
  );
};

export default Header;
