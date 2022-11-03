import React, { useContext, useEffect } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Expense from "./Expense";

function ExpensesList() {
  const { expenses, deleteExpense } = useContext(BudgetContext);

  return (
    <div>
      <h2>Expense List</h2>
      <div>
        {expenses.map((expense) =>
          expense.filtered ? (
            <Expense
              key={expense.id}
              expense={expense}
              delete={deleteExpense}
            />
          ) : null
        )}
        {expenses.length === 0 ? "You have not saved any expenses" : null}
      </div>
    </div>
  );
}

export default ExpensesList;
