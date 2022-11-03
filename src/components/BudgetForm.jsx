import { Formik, Form} from "formik";
import { TextInput } from "./ExpensesForm";
import * as Yup from "yup";
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

function BudgetForm() {
  const { setBudget, setRemaining } = useContext(BudgetContext);

  return (
    <>
      <Formik
        initialValues={{
          budget: "",
        }}
        validationSchema={Yup.object({
          budget: Yup.string().required(
            "We can't start planning without a budget 🙁"
          ),
        })}
        onSubmit={(values, {resetForm}) => {
          setBudget(values.budget);
          setRemaining(values.budget);
          resetForm();
        }}
      >
        <Form>
          <TextInput label="Budget" name="budget" type="number" />
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </>
  );
}

export default BudgetForm;
