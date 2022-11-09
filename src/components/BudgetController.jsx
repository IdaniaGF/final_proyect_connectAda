import { useFormikContext } from "formik";
import { useContext, useState } from "react";
import { BudgetContext } from "../context/BudgetContext";
import Chart from "./Chart";
import { Modal } from "@mui/material";
import BudgetForm from "./BudgetForm";

function BudgetController() {
  const { budget, remaining } = useContext(BudgetContext);
  const [openModal, setOpenModal] = useState(false);
  const percentaje = (budget - remaining) / budget*100;
  return (
    <div className="fixed top-20 w-2/5">
      <h2>
        Budget: <span className="amount">$ {budget}</span>
      </h2>
      <button
        type="button"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        Update Budget
      </button>
      <h3>
        Remaining: <span className="amount">$ {remaining}</span>
      </h3>

      <div className="w-full absolute mt-24">
        <h3>{percentaje? (percentaje.toFixed(2)):(0)} %</h3>
      </div>
      <Chart />
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <BudgetForm setOpenModal={setOpenModal} />
      </Modal>
    </div>
  );
}

export default BudgetController;
