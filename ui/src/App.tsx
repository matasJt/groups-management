import "./App.css";
import '@mantine/core/styles.css';
import Groups from "./Components/Groups";
import { BrowserRouter, Route, Navigate } from "react-router";
import { Routes } from "react-router-dom";
import Group from "./Components/Group";
import Transaction from "./Components/Transaction";
import Transactions from "./Components/Transactions";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/group" replace />} />
            <Route path="/group/" element={<Groups />} />
            <Route path="group/:groupId" element={<Group />} />
            <Route
              path="/group/:groupId/transaction"
              element={<Transaction />}
            />
            <Route
              path="/group/:groupId/transactions"
              element={<Transactions />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </MantineProvider>
  );
}

export default App;
