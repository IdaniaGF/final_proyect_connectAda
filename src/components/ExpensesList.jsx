import React, { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Expense from "./Expense";
import Filter from "./Filter";
import { Modal } from "@mui/material";
import { ExpensesForm } from "./ExpensesForm";

function ExpensesList() {
  const { expenses, deleteExpense, setExpenses, setExpense } = useContext(BudgetContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="">
      <div className="expenseList__header">
        <h2>Expense List</h2>
        <button
          type="button"
          onClick={() => {
            setOpenModal(true);
            setExpense({})
          }}
        >
          Add expense
        </button>
        <button
          type="button"
          onClick={() => {
            const confirmation = confirm(
              "Are you sure you want to reset the list?"
            );
            if (confirmation) {
              setExpenses([])
            }
          }}
          className="ml-2"
        >
          Reset list
        </button>
        <Filter />
      </div>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <ExpensesForm setOpenModal={setOpenModal} />
      </Modal>
      <div className="mt-52 flex flex-row flex-wrap justify-center">
        {expenses.map((expense) =>
          expense.filtered ? (
            <Expense
              key={expense.id}
              expense={expense}
              delete={deleteExpense}
              setOpenModal={setOpenModal}
            />
          ) : null
        )}
        {expenses.length === 0 ? <p>You have not saved any expenses</p> : null}
      </div>
    </div>
  );
}

export default ExpensesList;
