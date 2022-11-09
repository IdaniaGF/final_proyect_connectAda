import { MdFastfood, MdSavings } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiMentalHealthFill } from "react-icons/ri";
import { GiAnt } from "react-icons/gi";
import { SiNetflix } from "react-icons/si";
import { IoIosBeer } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

function Expense({ expense, setOpenModal }) {
  const { expenseName, amount, category, formatDate, id } = expense;
  const { setExpense, deleteExpense } = useContext(BudgetContext);

  const edit = () => {
    setOpenModal(true)
    setExpense(expense);
  };

  const icons = {
    food: <MdFastfood />,
    home: <FaHome />,
    health: <RiMentalHealthFill />,
    ant: <GiAnt />,
    saving: <MdSavings />,
    suscription: <SiNetflix />,
    leisure: <IoIosBeer />,
  };

  return (
    <div className="bg-slate-400 rounded-lg text-slate-800 card">
      <div className="card__icon">{icons[category]}</div>
      <div className="card__info">
        <h3 className="m-0">$ {amount}</h3>
        <h4 className="m-0">{expenseName}</h4>
        <p className="m-0 text-sm">{formatDate}</p>
      </div>
      <div className="card__buttons">
        <button onClick={edit} className="card__buttons__button"><MdEdit/></button>
        <button className="card__buttons__button"
          onClick={() => {
            const confirmation = confirm(
              "Are you sure you want to delete this expense?"
            );
            if (confirmation) {
              deleteExpense(id);
            }
          }}
        >
          <AiFillDelete/>
        </button>
      </div>
    </div>
  );
}

export default Expense;
