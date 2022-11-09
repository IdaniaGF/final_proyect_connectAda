import { Formik, useField } from "formik";
import React, { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

const SelectInput = ({ label, ...props }) => {
  return (
    <div className="m-2">
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...props}>
        <option value="-">-Selecciona-</option>
        <option value="saving">Saving</option>
        <option value="food">Food</option>
        <option value="home">Home</option>
        <option value="ant">Ant</option>
        <option value="leisure">Leisure</option>
        <option value="health">Health</option>
        <option value="suscription">Suscriptions</option>
      </select>
    </div>
  );
};

function Filter() {
  const { expenses, setExpenses } = useContext(BudgetContext);


  const filter = (categoryFilter) =>{
    const results = expenses.map((expense) => {
      expense.category === categoryFilter ||
      categoryFilter == "-"
        ? (expense.filtered = true)
        : (expense.filtered = false);
      return expense;
    });
    setExpenses(results);
  }

  return (
    <Formik
      initialValues={{
        categoryFilter: "-",
      }}
      onSubmit={({categoryFilter})=>{
        filter(categoryFilter)
      }}
    >
      {({handleChange, handleSubmit, values}) => (
        <SelectInput
          label="Filter: "
          name="categoryFilter"
          onChange={(e) => {
            handleChange(e)
            handleSubmit(values.categoryFilter)
          }}
        />
      )}
    </Formik>
  );
}

export default Filter;
