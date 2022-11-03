import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import { useContext, useEffect } from "react";
import { BudgetContext } from "../context/BudgetContext";
import { assign } from "lodash";
import { format } from "date-fns";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { expense } = useContext(BudgetContext);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    console.log("se dispara el effect")
    if (expense.id) {
      setFieldValue(props.name, expense[props.name]);
    }
  }, [expense]);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { expense } = useContext(BudgetContext);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (expense.id) {
      setFieldValue(props.name, expense[props.name]);
    }
  }, [expense]);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props}>
        <option value="-">-Selecciona-</option>
        <option value="saving">Saving</option>
        <option value="food">Food</option>
        <option value="home">Home</option>
        <option value="ant">Ant</option>
        <option value="leisure">Leisure</option>
        <option value="health">Health</option>
        <option value="suscription">Suscriptions</option>
      </select>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export function ExpensesForm() {
  const {
    budget,
    remaining,
    setRemaining,
    expenses,
    addExpense,
    updateExpense,
    expense,
    setExpense,
    calcRemaining,
  } = useContext(BudgetContext);

  return (
    <Formik
      initialValues={{
        expenseName: "",
        amount: "",
        category: "-",
      }}
      validationSchema={Yup.object({
        expenseName: Yup.string()
          .max(40, "Must be 40 characters or less")
          .required("Ups, you forgot the name of the expense 😋"),
        amount: Yup.number()
          .lessThan(budget, "You do not have enough budget for this expense 🥴")
          .required("Ups, you forgot the amount 🤭"),
        category: Yup.string().min(3, "The category is important"),
      })}
      onSubmit={({ expenseName, amount, category }, { resetForm }) => {
        if (expense.id) {
          setExpense(assign(expense, { expenseName, amount, category }));
          updateExpense(expense.id);
        } else {
          const date = Date.now();
          const formatDate = format(date, "d MMMM yyyy");
          const id = date.toString(36) + Math.random().toString(36);
          const filtered = true;
          const newExpense = {
            expenseName,
            amount,
            category,
            formatDate,
            id,
            filtered,
          };
          addExpense(newExpense);
        }
        resetForm();
        setExpense({});
      }}
    >
      <Form>
        <TextInput label="Expense name" name="expenseName" type="text" />
        <TextInput label="Amount" name="amount" type="number" />
        <SelectInput label="Category" name="category" />
        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}
