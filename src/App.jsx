import { useState } from "react";
import "./App.css";
import BudgetController from "./components/BudgetController";
import BudgetForm from "./components/BudgetForm";
import { ExpensesForm } from "./components/ExpensesForm";
import ExpensesList from "./components/ExpensesList";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Test from "./components/Test";


function App() {
  return (
    <>
      <Header />
      <BudgetForm />
      <BudgetController />
      <ExpensesForm />
      <Filter />
      <ExpensesList />
    </>
  );
}

export default App;
