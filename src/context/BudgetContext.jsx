import { createContext, useContext, useEffect, useState } from "react";
import { sumBy } from "lodash";

export const BudgetContext = createContext();

export function BudgetContextProvider(props) {
  const [budget, setBudget] = useState("");
  const [remaining, setRemaining] = useState();
  const [expense, setExpense] = useState({});
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const expensesData = JSON.parse(localStorage.getItem("expenses")) || [];
    const budgetData = JSON.parse(localStorage.getItem("budget")) || "";
    setExpenses(expensesData);
    setBudget(budgetData);
  }, []);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
    setBudget(budget);
    calcRemaining();
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    calcRemaining();
  }, [expenses]);

  const calcRemaining = () => {
    const spent = sumBy(expenses, (expense) => {
      return parseFloat(expense.amount) || 0;
    });
    setRemaining(budget - spent);
  };

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (id) => {
    const updatedExpenses = expenses.map((expenseElement) =>
      expenseElement.id === id ? expense : expenseElement
    );
    setExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        setBudget,
        remaining,
        setRemaining,
        expense,
        setExpense,
        expenses,
        setExpenses,
        deleteExpense,
        calcRemaining,
        addExpense,
        updateExpense,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
}
