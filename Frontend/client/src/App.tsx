import React from "react";
import { Routes, Route , Navigate} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard"


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
  );
};

export default App;