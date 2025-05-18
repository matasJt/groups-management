import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Groups from "./Components/Groups";
import { BrowserRouter, Route, useNavigate, Navigate } from "react-router";
import { Routes } from "react-router-dom";
import Group from "./Components/Group";
import Transaction from "./Components/Transaction";
import Transactions from "./Components/Transactions";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/group" replace />} />
          <Route path="/group/" element={<Groups />} />
          <Route path="group/:groupId" element={<Group />} />
          <Route path="/group/:groupId/transaction" element={<Transaction />} />
          <Route
            path="/group/:groupId/transactions"
            element={<Transactions />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
