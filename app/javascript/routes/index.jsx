import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EMI from "../components/EMI";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<EMI />} />
    </Routes>
  </Router>
);
