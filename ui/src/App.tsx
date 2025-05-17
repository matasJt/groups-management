import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import Groups from "./Components/Groups";
import { BrowserRouter, Route} from "react-router";
import { Routes } from "react-router-dom";
import Group from "./Components/Group";
import Transaction from "./Components/Transaction";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/groups' element={<Groups/>}/>
          <Route path='/group' element={<Group/>}/>
          <Route path='/group/transaction' element={<Transaction/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
