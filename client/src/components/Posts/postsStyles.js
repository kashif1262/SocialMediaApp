import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    width: "100% !important",
  },
  smMargin: {
    margin: theme.spacing(0),
  },
  actionDiv: {
    textAlign: "center",
  },
}));
