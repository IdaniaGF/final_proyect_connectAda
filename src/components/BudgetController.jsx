import { useFormikContext } from "formik";
import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Chart from "./Chart";

function BudgetController() {
  const { budget, remaining} = useContext(BudgetContext);

  return (
    <div>
      <h2>
        <span>Budget: </span> {budget}
      </h2>
      <h3>
        <span>Remaining: </span>
        {remaining}
      </h3>
      <h3>
        <span>Spent: </span>
        {budget - remaining}
      </h3>
      <Chart />
    </div>
  );
}

export default BudgetController;
