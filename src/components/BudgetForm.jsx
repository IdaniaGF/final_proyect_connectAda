import { Formik, Form} from "formik";
import { TextInput } from "./ExpensesForm";
import * as Yup from "yup";
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

function BudgetForm({setOpenModal}) {
  const { setBudget, setRemaining } = useContext(BudgetContext);

  return (
    <div className="inset-center bg-stone-900 rounded-lg p-3 w-72" >
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
          setOpenModal(false);
          resetForm();
        }}
      >
        <Form className="flex flex-col items-center">
          <p>Introduce your weakly budget</p>
          <TextInput label="Budget" name="budget" type="number" />
          <button type="submit">Save</button>
        </Form>
      </Formik>
    </div>
  );
}

export default BudgetForm;
