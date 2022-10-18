import React from "react";
import { Container } from "@material-ui/core";
import useStyles from "./styles";

import Navbar from "./components/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/Posts/PostDetails/PostDetail";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/" exect element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/posts/search?searchQuery" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/posts" replace />}
        />
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    </Router>
  );
};

export default App;
