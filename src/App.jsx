import { useState } from "react";
import "./App.css";
import BudgetController from "./components/BudgetController";
import ExpensesList from "./components/ExpensesList";
import Header from "./components/Header";
import Test from "./components/Test";

function App() {
  return (
    <>
      <Header/>
      <div className="flex flex-row w-full">
        <div className="w-2/5">
          <BudgetController />
        </div>
        <div className="w-3/5">
          <ExpensesList />
        </div>
      </div>
    </>
  );
}

export default App;
