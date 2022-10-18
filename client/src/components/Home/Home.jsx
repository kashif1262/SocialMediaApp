import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./homeStyles";
import Pagination from "../Pagination";
const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item xs={6} sm={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12}>
                <Paper
                  className={classes.pagination}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 5px",
                  }}
                  elevation={6}
                >
                  <Pagination />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
