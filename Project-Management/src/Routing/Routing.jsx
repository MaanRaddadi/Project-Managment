import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";

import StudentIdeas from "../Pages/StudentIdeas";
import { AuthContext } from "../Context/AuthContext";
import CreateIdea from "../Pages/CreateIdea";
import PersonalIdeas from "../Pages/PersonalIdeas";
import UserProfile from "../Pages/UserProfile";
import AdminMain from "../Pages/AdminMain";
import StudentsList from "../Pages/StudentsList";

function Routing() {
  const { currentUser } = useContext(AuthContext);
  const admins = ["DAsTZCF45fbfQmjhKoUu7rLtX053"]

  return (
    <>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/studentMain/ideas"
          element={
            currentUser ? <StudentIdeas></StudentIdeas> : <Login></Login>
          }
        ></Route>
        <Route
          path="/studentsMain/createIdea"
          element={<CreateIdea></CreateIdea>}
        ></Route>
        <Route
          path="/studentsMain/personalRequestes"
          element={<PersonalIdeas />}
        ></Route>
        <Route path="/user" element={<UserProfile></UserProfile>}></Route>
        <Route path="/Admin/Main" element={currentUser!== null && admins.includes(currentUser.uid) ? <AdminMain/>: <StudentIdeas></StudentIdeas>}></Route>
        <Route path="/Admin/studentList" element={currentUser!== null && admins.includes(currentUser.uid) ? <StudentsList></StudentsList>:""}></Route>
      </Routes>
    </>
  );
}

export default Routing;
