import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetail />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
