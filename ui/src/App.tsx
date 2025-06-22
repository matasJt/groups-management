
import "./App.css";
import Groups from "./Components/Groups";
import { BrowserRouter, Route, Navigate } from "react-router";
import { Routes } from "react-router-dom";
import Group from "./Components/Group";
import Transaction from "./Components/Transaction";
import Transactions from "./Components/Transactions";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
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
